import mongoose, { Schema, Document } from "mongoose";

export interface IApplicationModel extends Document {
  studentId: string;
  amountRequested: number;
  applicationDate: Date;
  status: string;
}

const applicationSchema = new Schema<IApplicationModel>(
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

export default mongoose.model<IApplicationModel>(
  "Application",
  applicationSchema
);
