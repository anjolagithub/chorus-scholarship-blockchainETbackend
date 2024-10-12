import donorModel from "./donor.model";
import { BaseRepository } from "../../Repository";

class DonorRepository extends BaseRepository<any> {
  constructor() {
    super(donorModel);
  }
}

export default new DonorRepository();