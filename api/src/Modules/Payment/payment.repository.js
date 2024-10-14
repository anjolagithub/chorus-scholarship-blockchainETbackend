import paymentModel from "./payment.model.js";
import { BaseRepository } from "../../Repository/baseRepository.js";

class PaymentRepository extends BaseRepository {
  constructor() {
    super(paymentModel);
  }
}

export default new PaymentRepository();
