import mongoose, { Schema } from "mongoose";

const donationSchema = new Schema(
  {
    donorId: String,
    studentId: String,
    amount: String,
    Date: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model(
  "Donation Record",
  donationSchema
);
