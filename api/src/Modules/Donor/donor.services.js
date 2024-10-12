import DonorRepository from "./donor.repository.js";

export default class DonorServices {
  static async createDonor(data) {
    return await DonorRepository.createOne(data);
  }
}
