import mongoose, { Schema } from "mongoose";

const scholarshipSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
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

export default mongoose.model(
  "Scholarship",
  scholarshipSchema
);
