import applicationModel from "./application.model.js";
import { BaseRepository } from "../../Repository/baseRepository.js";

class ApplicationRepository extends BaseRepository {
  constructor() {
    super(applicationModel);
  }
}

export default new ApplicationRepository();
