import mongoose, { Schema } from "mongoose";

const accountSchema = new Schema (
  {
    email: {
      type: String,
      unique: true,
      index: true,
    },
    firstName: String,
    lastName: String,
    phoneNumber: {
      type: String,
      unique: true,
      index: true,
    },
    password: String,
    passwordChangedAt: Date,
    verificationToken: String,
    isVerified: { type: Boolean, default: false },
    isVerifiedAt: Date,
    resetToken: String,
    resetAt: Date,
    resetTokenGeneratedAt: Date,
    isResetTokenUsed: Boolean,
    verificationTokenGeneratedAt: Date,
    accountType: {
      type: String,
      enum: ["Student", "Donor"],
      index: true,
    },
    accountTypeId: {
      type: Schema.Types.ObjectId,
      refPath: "accountType",
      index: true,
    },
    provider: {
      type: String,
      enum: ["Local", "Google"],
      default: "Local",
      index: true,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Account", accountSchema);
