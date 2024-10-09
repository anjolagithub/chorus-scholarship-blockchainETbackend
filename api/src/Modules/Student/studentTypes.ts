import { AccountType } from "../Account/accountTypes";
import { ICart } from "../Cart/cartTypes";
import { IWishList } from "../WishList/wishlistTypes";

export class CreateMinimalBaseAccountInput {
  firstName?: string;
  lastName?: string;
  phoneNumber: string;
  email: string;
}

export class CreateBaseAccountInput extends CreateMinimalBaseAccountInput {
  password: string;
}

export interface VerifyStudentOrVendorInput {
  verificationToken: string;
}

export interface ForgetStudentPasswordInput {
  email: string;
}

export interface LoginStudentInput extends ForgetStudentPasswordInput {
  password: string;
}

export interface ResetStudentPasswordInput {
  password: string;
  resetToken: string;
}

export interface ChangeStudentPasswordInput {
  oldPassword: string;
  newPassword: string;
}

export interface ChangeStudentPasswordDTO extends ChangeStudentPasswordInput {
  accountId: string;
  accountType?: AccountType | string;
  accountTypeId: string;
}

export class IStudent {
  _id: string;
  cart: ICart;
  wishList?: IWishList;
  // shoppingPreferences?: IShoppingPreferences;
}

export class IStudentAccount {
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
  studentId: string;
  provider: string;
}
