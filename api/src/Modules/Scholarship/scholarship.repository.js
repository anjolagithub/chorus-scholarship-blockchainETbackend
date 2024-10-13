import scholarshipModel from "./scholarship.model.js";
import { BaseRepository } from "../../Repository/baseRepository.js";

class ScholarshipRepository extends BaseRepository {
  constructor() {
    super(scholarshipModel);
  }
}

export default new ScholarshipRepository();
