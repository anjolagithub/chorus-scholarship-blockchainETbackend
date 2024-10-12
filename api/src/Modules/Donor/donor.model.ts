import mongoose, { Schema, Document } from "mongoose";

/**
 * Interface representing the Donor model.
 */
export interface IDonorModel extends Document {
  account: string;
  totalContributions: number;
  donationHistory: object[];
}

/**
 * Mongoose schema for the Donor model.
 */
const donorSchema = new Schema<IDonorModel>(
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

export default mongoose.model<IDonorModel>("Donor", donorSchema);
