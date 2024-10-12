import mongoose, { Schema } from "mongoose";

/**
 * Mongoose schema for the Donor model.
 */
const donorSchema = new Schema(
  {
    account: Schema.Types.ObjectId,
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
