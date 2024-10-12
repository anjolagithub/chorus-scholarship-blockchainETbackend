import mongoose, { Schema } from "mongoose";

const dashboardSchema = new Schema(
  {
    totalAmountRaised: Number,
    totalScholarshipAwarded: Number,
    currentBalanceAvailableForScholarship: Date,
    status: {
      type: String,
      enum: ["Submitted", "Reviewed", "Awarded"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model(
  "Dashboard",
  dashboardSchema
);
