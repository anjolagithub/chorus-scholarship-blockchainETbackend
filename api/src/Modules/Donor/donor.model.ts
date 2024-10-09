import mongoose, { Schema, Document } from "mongoose";

/**
 * Interface representing the Donor model.
 */
export interface IDonorModel extends Document {
  totalContributions: number;
  donationHistory: object[];
}

/**
 * Mongoose schema for the Donor model.
 */
const donorSchema = new Schema<IDonorModel>(
  {
    totalContributions: Number,
    donationHistory: Array,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<IDonorModel>("Donor", donorSchema);
