import mongoose, { Schema } from "mongoose";

const applicationSchema = new Schema(
  {
    fullName: String,
    phone: Number,
    email: String,
    nationality: String,
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ["Male", "Female", "Rather not say"],
    },
    currentLevelofEducation: String,
    schoolName: String,
    major: String,
    expectedGraduationDate: Date,
    appliedOn: Date,
    fundingNeeded: {
      type: String,
      enum: ["Full tuition", "Partial tuition", "Living expenses"],
    },
    motivationStatement: String,
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student"
    },
    amountRequested: Number,
    documents: {
      proofOfEnrollment: String,
      academicTranscripts: String,
      letterOfRecommendation: String,
      personalStatement: String,
    },
    applicationDate: Date,
    status: {
      type: String,
      enum: ["Submitted", "Reviewed", "Awarded"],
      default: "Submitted"
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
