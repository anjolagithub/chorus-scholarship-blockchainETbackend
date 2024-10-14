import mongoose, { Schema } from "mongoose";

/**
 * Mongoose schema for the Payment  model.
 */
const paymentSchema = new Schema(
  {
    date: Date,
    amount: Number,
    status: {
      type: String,
      default: "initialized"
    },
    paymentMethod: String,
    transactionId: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Payment", paymentSchema);
