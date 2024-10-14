import DonationRecordRepository from "./donationRecord.repository";

export class DonationRecordServices {
    
    static async createDonationRecord(data) {
        return await DonationRecordRepository.createOne(data);
    }
}