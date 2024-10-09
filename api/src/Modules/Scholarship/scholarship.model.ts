import mongoose, { Schema, Document } from "mongoose";

export interface IScholarshipModel extends Document {
  title: string;
  description: string;
  amount: number;
  eligibilityCriteria: string;
  applicationDeadline: Date;
  status: string;
}

const scholarshipSchema = new Schema<IScholarshipModel>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    eligibilityCriteria: {
      type: String,
      required: true,
    },
    applicationDeadline: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Open", "Closed", "Awarded"],
      default: "Open",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<IScholarshipModel>(
  "Scholarship",
  scholarshipSchema
);
