import mongoose, { Schema } from "mongoose";

const donationSchema = new Schema(
  {
    donationId: String,
    donorId: String,
    studentId: String,
    amount: Number,
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
