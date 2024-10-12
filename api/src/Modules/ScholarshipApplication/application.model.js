import mongoose, { Schema } from "mongoose";

const applicationSchema = new Schema(
  {
    studentId: String,
    amountRequested: Number,
    applicationDate: Date,
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
  "Application",
  applicationSchema
);
