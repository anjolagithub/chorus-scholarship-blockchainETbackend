import mongoose, { Schema, Document } from "mongoose";

/**
 * Interface representing the Student model.
 */
export interface IStudentModel extends Document {
  educationDetails: Schema.Types.ObjectId;
  fundingNeeded: number;
  applicationStatus: string;
  scholarshipId: string;
}

/**
 * Mongoose schema for the Student model.
 */
const studentSchema = new Schema<IStudentModel>(
  {
    educationDetails: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    fundingNeeded: {
      type: Number,
      default: 0,
    },
    applicationStatus: String,
    scholarshipId: {
      type: String,
      ref: "Scholarship",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<IStudentModel>("Student", studentSchema);
