import mongoose, { Schema } from "mongoose";

/**
 * Mongoose schema for the Student model.
 */
const studentSchema = new Schema (
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
    skills: {
      type: Object,
      default: {}
    },
    location: String
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Student", studentSchema);
