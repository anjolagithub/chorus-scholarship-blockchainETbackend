import DonationRecordServices from "./donationRecord.services.js";

export class DonationRecordController {
    static async createRecord(req, res) {
        try {
            const data = req.body;

            const record = await DonationRecordServices.createDonationRecord(data);
            
            res.status(200).json({ message: "Donation recorded successfully", record });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}