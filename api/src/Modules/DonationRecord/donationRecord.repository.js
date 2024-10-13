import donationRecord from "./donationRecord.model.js";
import { BaseRepository } from "../../Repository/baseRepository.js";

class DonationRecordRepository extends BaseRepository {
  constructor() {
    super(donationRecord);
  }
}

export default new DonationRecordRepository();
