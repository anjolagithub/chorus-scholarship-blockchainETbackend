import { IStudent, IStudentAccount } from "./studentTypes";
import { IAccountModel } from "../Account/account.model";
import HashHelper from "../../Shared/Helpers/hash.helper";
import TokenHelper from "../../Shared/Helpers/token.helper";
import AccountServices from "../Account/account.services";
import { CreateBaseAccountInput } from "../Account/accountTypes";
import EmailServices from "../Mail/mail.services";
import StudentRepository from "./student.repository";
import {
  ChangeStudentPasswordDTO,
  ForgetStudentPasswordInput,
  LoginStudentInput,
  ResetStudentPasswordInput,
} from "./studentTypes";
// import { ClientHelper } from "../../Shared/Helpers/client.helper";
import {
  ForbiddenException,
  InternalServerException,
  NotFoundException,
  BadRequestException,
} from "../../Shared/Exceptions";

/**
 * Service class for handling student services.
 *
 */
export default class StudentServices {
  public static async signUpStudent(
    data: CreateBaseAccountInput
  ): Promise<string> {
    const foundAccount = await AccountServices.checkAccountPresence({
      $or: [{ email: data.email }, { phoneNumber: data.phoneNumber }],
    });

    const isAccountRegistered = !!foundAccount;

    if (isAccountRegistered)
      throw new NotFoundException("Email or phone number exists!");

    const { _id, firstName, accountType, accountTypeId } =
      await StudentServices.createStudent(data);

    const verificationToken = TokenHelper.generateVerificationToken({
      accountId: _id,
      accountType,
      accountTypeId,
    });

    // const currentClientHost = ClientHelper.getCurrentClient().landingPage;
    //const verificationLink = `${currentClientHost}/auth/student/verify-account/${verificationToken}`;
    const verificationLink = `http://localhost:3000/auth/student/verify-account/${verificationToken}`;

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
  
  public static async resendVerificationLink(email: string): Promise<string> {
    const {
      _id,
      isVerified,
      firstName,
      verificationToken,
      verificationTokenGeneratedAt,
      accountType,
      accountTypeId,
    } = await AccountServices.findAccount({ email });

    if (isVerified) throw new BadRequestException("ACCOUNT IS VERIFIED.");

    let newToken: string;

    if (!verificationToken) {
      newToken = TokenHelper.generateVerificationToken({
        accountId: _id,
        accountType,
        accountTypeId,
      });
    }

    const verificationLink = `https://localhost:3000/auth/student/verify-account/${newToken}`;

    // Can generate new token after 30 seconds.
    const isAbleToGenerateNewToken = StudentServices.isAbleToGenerateNewToken({
      tokenGeneratedAt: verificationTokenGeneratedAt,
      timeInMs: 30000,
    });

    if (!isAbleToGenerateNewToken) {
      throw new BadRequestException(
        "Check your mail or Try again after 30 seconds."
      );
    }

    await EmailServices.sendVerificationEmail(
      firstName,
      email,
      verificationLink
    );

    return "CHECK MAIL BOX";
  }

  public static async verifyStudent(verificationToken: string) {
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

  public static async loginStudent(data: LoginStudentInput) {
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

  public static async forgetStudentPassword(data: ForgetStudentPasswordInput) {
    const foundAccount = await AccountServices.findAccount({
      email: data.email,
      accountType: "Student",
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
      const isAbleToGenerateNewToken = StudentServices.isAbleToGenerateNewToken(
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
    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

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

  public static async resetStudentPassword(data: ResetStudentPasswordInput) {
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

  public static async changeStudentPassword(data: ChangeStudentPasswordDTO) {
    const foundAccount = await AccountServices.findAccount({
      _id: data.accountId,
    });

    const isPasswordValid = await HashHelper.verifyHash(
      data.oldPassword,
      foundAccount.password
    );

    if (!isPasswordValid) throw new ForbiddenException("INCORRECT PASSWORD");

    if (data.oldPassword === data.newPassword)
      throw new ForbiddenException(
        "Password cannot be the same as your previous password"
      );

    const hashedPassword = await HashHelper.generateHash(data.newPassword);

    await AccountServices.updateAccount(
      { _id: data.accountId },
      { password: hashedPassword, passwordChangedAt: new Date() }
    );

    return "PASSWORD CHANGED SUCCESSFULLY";
  }

  public static async createStudentGoogleAccount(): Promise<IAccountModel> {
    const createdAccount = await StudentRepository.createOne({});

    if (!createdAccount)
      throw new InternalServerException("ACCOUNT CREATION FAILED");

    return createdAccount;
  }

  public static async getStudentAccountDetails(
    givenAccountId: string
  ): Promise<IStudentAccount> {
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
      accountTypeId: { _id: studentId, wishListId, cartId },
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
      studentId,
      wishListId,
      cartId,
    };
  }

  public static async getStudentByStudentId(
    studentId: string
  ): Promise<IStudent> {
    const foundStudent = await StudentRepository.findOne({ _id: studentId });

    const populatedStudent = await StudentRepository.populate(
      [foundStudent],
      ["cart", "wishList"],
      ["Cart", "WishList"]
    );

    return populatedStudent[0] as IStudent;
  }

  private static async createStudent(
    data: CreateBaseAccountInput
  ): Promise<any> {
    try {
      const hashedPassword = await HashHelper.generateHash(data.password);

      const createdAccount = await AccountServices.createAccount({
        ...data,
        password: hashedPassword,
      });

      const createdStudent = await StudentRepository.createOne({});

      await StudentRepository.updateOne(
        { _id: createdStudent._id },
        {
          wishList: createdStudentWhishList._id,
          cart: createdCart._id,
        }
      );

      return await AccountServices.updateAccount(
        { _id: createdAccount._id },
        { accountType: "Student", accountTypeId: createdStudent._id }
      );
    } catch (error) {
      if (error.code === 11000) {
        throw new Error("Account Exists");
      } else {
        return error;
      }
    }
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
