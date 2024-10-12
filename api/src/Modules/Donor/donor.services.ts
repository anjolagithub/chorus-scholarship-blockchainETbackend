import DonorRepository from "./donor.repository";

export default class DonorServices {
  public static async createDonor(data) {
    return await DonorRepository.createOne(data);
  }
}
