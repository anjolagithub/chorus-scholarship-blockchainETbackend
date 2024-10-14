import PaymentRepository from "./payment.repository";

export class PaymentServices {
    
    static async createPayment(data) {
        return await PaymentRepository.createOne(data);
    }
}