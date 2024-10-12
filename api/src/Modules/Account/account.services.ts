import { IAccountModel } from "./account.model";
import AccountRepository from "./account.repository";
import {
  CreateAccountInput,
  CreateGoogleAccountInput,
  CreateBaseAccountInput,
  ForgetAccountPasswordInput,
  ResetAccountPasswordInput,
  LoginAccountInput,
  IAccount,
} from "./accountTypes";
import {
  NotFoundException,
  InternalServerException,
} from "../../Shared/Exceptions";
import TokenHelper from "../../Shared/Helpers/token.helper";
import HashHelper from "../../Shared/Helpers/hash.helper";
import EmailServices from "../Mail/mail.services";
import { ForbiddenException } from "../../Shared/Exceptions";
import StudentServices from "../Student/student.services";
import DonorServices from "../Donor/donor.services";

export default class AccountServices {
  public static async signUp(data: CreateBaseAccountInput): Promise<string> {
    const foundAccount = await AccountServices.checkAccountPresence({
      email: data.email,
    });

    const isAccountRegistered = !!foundAccount;

    if (isAccountRegistered) throw new NotFoundException("Account exists!");

    const { _id, firstName, accountType } = await AccountServices.createAccount(
      data
    );

    let accountTypeData =
      data.accountType === "Student"
        ? await StudentServices.createStudent({ account: _id })
        : data.accountType === "Donor" &&
          (await DonorServices.createDonor({ account: _id }));

    const updatedAccount = await this.updateAccount(
      { _id },
      { accountTypeId: accountTypeData._id }
    );

    const verificationToken = TokenHelper.generateVerificationToken({
      accountId: _id,
      accountType,
      accountTypeId: updatedAccount.accountTypeId,
    });

    // const currentClientHost = ClientHelper.getCurrentClient().landingPage;
    //const verificationLink = `${currentClientHost}/auth/customer/verify-account/${verificationToken}`;
    const verificationLink = `http://localhost:3000/auth/verify-account/${verificationToken}`;

    await AccountServices.updateAccount(
      { _id },
      { verificationToken, verificationTokenGeneratedAt: new Date() }
    );

    await EmailServices.sendVerificationEmail(
      firstName,
      data.email,
      verificationLink
    );

    return "CHECK MAIL BOX";
  }

  public static async login(data: LoginAccountInput) {
    const foundAccount = await AccountServices.findAccount({
      email: data.email,
    });

    if (!foundAccount.isVerified)
      throw new ForbiddenException("The account is not verified yet!");

    const isPasswordValid = await HashHelper.verifyHash(
      data.password,
      foundAccount.password
    );

    if (!isPasswordValid)
      throw new ForbiddenException("The email or password is incorrect!");

    const token = TokenHelper.generateAccessToken({
      accountId: foundAccount._id,
      accountType: foundAccount.accountType,
      accountTypeId: foundAccount.accountTypeId,
    });

    return token;
  }

  public static async verifyAccount(verificationToken: string) {
    const { accountId, accountType, accountTypeId } =
      TokenHelper.verifyVerificationToken(verificationToken);

    const foundAccount = await AccountServices.findAccount({
      _id: accountId,
      accountType,
      accountTypeId,
    });

    if (foundAccount.isVerified && !foundAccount.verificationToken)
      throw new ForbiddenException("The account is already verified!");
    if (
      accountType !== foundAccount.accountType &&
      accountTypeId !== foundAccount.accountTypeId
    )
      throw new ForbiddenException("You are not allowed to do this!");

    await AccountServices.updateAccount(
      { _id: accountId },
      { isVerified: true, isVerifiedAt: new Date() },
      { verificationToken: 1, verificationTokenGeneratedAt: 1 }
    );

    await EmailServices.sendWelcomeEmail(
      foundAccount.firstName,
      foundAccount.email
    );

    return "ACCOUNT VERIFIED SUCCESSFULLY";
  }

  public static async getCustomerAccountDetails(
    givenAccountId: string
  ): Promise<Partial<IAccount>> {
    const {
      _id: accountId,
      firstName,
      lastName,
      email,
      passwordChangedAt,
      isVerified,
      isVerifiedAt,
      resetAt,
      accountType,
      provider,
      accountTypeId: { _id: customerId, wishListId, cartId },
    } = await AccountServices.findAccount({ _id: givenAccountId });

    return {
      accountId,
      firstName,
      lastName,
      email,
      passwordChangedAt,
      isVerified,
      isVerifiedAt,
      resetAt,
      provider,
      accountType,
    };
  }

  public static async forgetAccountPassword(data: ForgetAccountPasswordInput) {
    const foundAccount = await AccountServices.findAccount({
      email: data.email,
    });

    let decodedResetToken;

    if (foundAccount && foundAccount.resetToken) {
      try {
        decodedResetToken = TokenHelper.verifyResetToken(
          foundAccount.resetToken
        );
      } catch (error) {
        await AccountServices.updateAccount({ email: data.email }, null, {
          resetToken: 1,
        });

        throw new ForbiddenException(
          "Check your mail or Try again after 30 seconds."
        ); // Expired token
      }

      // Can generate new token after 30 seconds.
      const isAbleToGenerateNewToken = AccountServices.isAbleToGenerateNewToken(
        {
          tokenGeneratedAt: foundAccount.resetTokenGeneratedAt,
          timeInMs: 30000,
        }
      );

      if (decodedResetToken && !isAbleToGenerateNewToken)
        throw new ForbiddenException(
          "Check your mail or Try again after 30 seconds."
        );
    }

    const resetToken = TokenHelper.generateResetToken({
      accountId: foundAccount._id,
      accountType: foundAccount.accountType,
      accountTypeId: foundAccount.accountTypeId,
    });

    // const currentClientHost = ClientHelper.getCurrentClient().landingPage;
    const resetLink = `http:/localhost:3000/reset-password/${resetToken}`;

    await AccountServices.updateAccount(
      { email: data.email },
      { resetToken, resetTokenGeneratedAt: new Date() },
      { isResetTokenUsed: 1 }
    );

    await EmailServices.sendResetPasswordEmail(
      foundAccount.firstName,
      data.email,
      resetLink
    );

    return "CHECK MAIL BOX";
  }

  public static async resetCustomerPassword(data: ResetAccountPasswordInput) {
    const decodedResetToken = TokenHelper.verifyResetToken(data.resetToken);

    const checkTokenPresence = await AccountServices.checkAccountPresence({
      _id: decodedResetToken.accountId,
      isResetTokenUsed: true,
    });

    const tokenUsed = !!checkTokenPresence;

    if (tokenUsed) throw new ForbiddenException("LINK HAS BEEN USED!");

    const foundAccount = await AccountServices.findAccount({
      _id: decodedResetToken.accountId,
      accountType: decodedResetToken.accountType,
      accountTypeId: decodedResetToken.accountTypeId,
    });

    const oldPasswordHash = foundAccount.password;
    const newPassword = data.password;

    const isPasswordSame = await HashHelper.verifyHash(
      newPassword,
      oldPasswordHash
    );

    const hashedPassword = await HashHelper.generateHash(newPassword);

    if (isPasswordSame)
      throw new ForbiddenException(
        "Password cannot be the same as your previous password!"
      );

    await AccountServices.updateAccount(
      {
        _id: decodedResetToken.accountId,
        accountType: decodedResetToken.accountType,
        accountTypeId: decodedResetToken.accountTypeId,
      },
      { password: hashedPassword, resetAt: new Date(), isResetTokenUsed: true },
      { resetToken: 1 }
    );

    return "ACCOUNT RESET SUCCESSFULLY";
  }

  public static async createGoogleAccount(
    data: CreateGoogleAccountInput
  ): Promise<IAccountModel> {
    const createdAccount = await AccountRepository.createOne(data);

    if (!createdAccount)
      throw new InternalServerException("ACCOUNT CREATION FAILED");

    return createdAccount;
  }

  public static async updateAccount(
    filter: any,
    setPayload?: any,
    unSetPayload?: any
  ): Promise<any> {
    const updatedAccount = await AccountRepository.updateOne(
      filter,
      setPayload,
      unSetPayload
    );

    return updatedAccount;
  }

  public static async findAccount(filter: any): Promise<any> {
    const foundAccount = await AccountRepository.findOne(filter);

    if (!foundAccount) throw new NotFoundException("Invalid credentials!");

    return foundAccount;
  }

  public static async checkAccountPresence(filter: any): Promise<any | null> {
    return await AccountRepository.findOne(filter);
  }

  private static async createAccount(data: CreateAccountInput): Promise<any> {
    const hashedPassword = await HashHelper.generateHash(data.password);

    const createdAccount = await AccountRepository.createOne({
      ...data,
      password: hashedPassword,
    });

    if (!createdAccount) return "ACCOUNT CREATION FAILED!";

    return createdAccount;
  }

  private static isAbleToGenerateNewToken(data: {
    tokenGeneratedAt: string;
    timeInMs: number;
  }) {
    const { tokenGeneratedAt, timeInMs } = data;

    const tokenGenTimeStamp = new Date(tokenGeneratedAt);

    const currentTime = new Date();

    const timediff = currentTime.getTime() - tokenGenTimeStamp.getTime();

    const isAbleToGenerateNewToken = timediff > timeInMs;

    return isAbleToGenerateNewToken;
  }
}
