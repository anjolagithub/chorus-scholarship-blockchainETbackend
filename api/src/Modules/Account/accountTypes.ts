export enum AccountType {
  Student = "Student",
  Donor = "Donor",
}

// Interface for minimal base account input
export interface CreateMinimalBaseAccountInput {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email: string;
}

// Interface for base account input extending minimal base account input
export interface CreateBaseAccountInput extends CreateMinimalBaseAccountInput {
  password: string;
  accountType?: AccountType;
}

// Interface for full account input extending base account input
export interface CreateAccountInput extends CreateBaseAccountInput {
  accountTypeId?: string;
}

// Enum for provider types
export enum ProviderType {
  Google = "Google",
  Facebook = "Facebook",
}

// Interface for Google or Facebook account input extending minimal base account input
export interface CreateGoogleAccountInput
  extends CreateMinimalBaseAccountInput {
  isVerified: boolean;
  isVerifiedAt: Date;
  accountType?: AccountType;
  accountTypeId?: string;
  provider?: ProviderType;
}

export interface IDecodedToken {
  accountId?: string;
  accountType?: string;
  accountTypeId?: string;
  iat: number;
  exp: number;
}

export interface ForgetAccountPasswordInput {
  email: string;
}

export interface LoginAccountInput extends ForgetAccountPasswordInput {
  password: string;
}

export interface ResetAccountPasswordInput {
  password: string;
  resetToken: string;

}

export class IAccount {
  firstName: string;
  lastName: string;
  email: string;
  passwordChangedAt: Date;
  isVerified: boolean;
  isVerifiedAt: Date;
  resetAt: Date;
  cartId: string;
  wishListId: string;
  accountType: string;
  accountId: string;
  customerId: string;
  provider: string;
}