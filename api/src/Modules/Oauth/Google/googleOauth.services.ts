import { googleClient, TokenPayload } from "../../../Infrastructure/Oauth";
import { config } from "../../../Config/app.config";
import AccountServices from "../../Account/account.services";
import StudentServices from "../../Student/student.services";
import { HandleStudentGoogleLoginCallbackInput } from "./googleOauthTypes";
import {
  ProviderType,
  AccountType,
  CreateGoogleAccountInput,
} from "../../Account/accountTypes";
import TokenHelper from "../../../Shared/Helpers/token.helper";

export class GoogleOAuthServices {
  /**
   * Handles the callback for student Google login.
   *
   * @param data - The input data containing the authorization code.
   * @returns An object containing the token
   */
  public static async handleStudentGoogleSignUpOrLoginCallback(
    data: HandleStudentGoogleLoginCallbackInput
  ) {
    try {
      // Step 1: Get tokens from Google API
      const { tokens } = await googleClient.getToken(data.code);

      // Step 2: Set credentials
      googleClient.setCredentials(tokens);

      // Step 3: Get user data from Google
      const {
        email,
        given_name: firstName,
        family_name: lastName,
        email_verified: isVerified,
      } = await GoogleOAuthServices.getGoogleUserPayload(tokens);

      // Step 4: fetch account if exists
      const foundAccount = await AccountServices.checkAccountPresence({
        email,
      });

      const isAccountFound = !!foundAccount;

      // Step 5: Handle account login or creation
      return isAccountFound
        ? await GoogleOAuthServices.assignSessionToExistingAccount(foundAccount)
        : await GoogleOAuthServices.createNewStudentAccount(
            firstName,
            lastName,
            email,
            isVerified
          );
    } catch (error) {
      throw new Error(
        `Error handling Google sign-up or login callback: ${error.message}`
      );
    }
  }

  public static initiateSignUpOrLoginStudentWithGoogle(): string {
    return googleClient.generateAuthUrl({
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
      ],
    });
  }

  // Creates a new student account
  private static async createNewStudentAccount(
    firstName: string,
    lastName: string,
    email: string,
    isVerified: boolean
  ): Promise<{ token: string }> {
    const accountPayload: CreateGoogleAccountInput = {
      firstName,
      lastName,
      email,
      isVerified,
      provider: "Google" as ProviderType,
      isVerifiedAt: new Date(),
      accountType: "Student" as AccountType,
    };

    // Create account and student details
    const [createdAccount, createdStudentAccount] = await Promise.all([
      AccountServices.createGoogleAccount(accountPayload),
      StudentServices.createStudentGoogleAccount(),
    ]);

    // Update account with student details
    await AccountServices.updateAccount(
      { _id: createdAccount._id },
      { accountTypeId: createdStudentAccount._id }
    );

    // Assign session to new account
    return await GoogleOAuthServices.assignSession(createdAccount);
  }

  // Assigns a session to an existing account
  private static async assignSessionToExistingAccount(
    account: any
  ): Promise<{ token: string }> {
    return await GoogleOAuthServices.assignSession(account);
  }

  // Assigns a session to an account
  private static async assignSession(account: any): Promise<{ token: string }> {
    const token = TokenHelper.generateAccessToken({
      accountId: account._id,
      accountType: account.accountType,
      accountTypeId: account.accountTypeId,
    });

    return { token };
  }

  // Retrieves the payload of the Google user
  private static async getGoogleUserPayload(
    tokens: any
  ): Promise<TokenPayload> {
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: tokens.id_token || "",
        audience: config.oauth.google.clientId || "",
      });

      const payload = ticket.getPayload();
      return payload as TokenPayload;
    } catch (error) {
      throw new Error(`Error retrieving Google user payload: ${error.message}`);
    }
  }
}
