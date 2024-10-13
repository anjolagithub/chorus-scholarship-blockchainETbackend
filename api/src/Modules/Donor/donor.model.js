import mongoose, { Schema } from "mongoose";

/**
 * Mongoose schema for the Donor model.
 */
const donorSchema = new Schema(
  {
    account: {
      type: Schema.Types.ObjectId,
      ref: "Account"
    },
    totalContributions: {
      type: Number,
      default: 0
    },
    donationHistory: Array,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Donor", donorSchema);
