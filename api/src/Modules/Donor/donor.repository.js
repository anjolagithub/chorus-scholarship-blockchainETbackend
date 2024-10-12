import donorModel from "./donor.model.js";
import { BaseRepository } from "../../Repository/baseRepository.js";

class DonorRepository extends BaseRepository {
  constructor() {
    super(donorModel);
  }
}

export default new DonorRepository();
