import PaymentServices from "./payment.services.js";

export class PaymentController {
    static async createPayment(req, res) {
        try {
            const data = req.body;

            const paymentDetails = await PaymentServices.createPayment(data);
            
            res.status(200).json({ message: "Payment recorded successfully", paymentDetails });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}