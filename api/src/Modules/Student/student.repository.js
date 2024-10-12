import studentModel from "./student.model.js";
import { BaseRepository } from "../../Repository/baseRepository.js";

/**
 * Repository class for interacting with the student collection in the database.
 */
class StudentRepository extends BaseRepository {
  constructor() {
    super(studentModel);
  }
}

export default new StudentRepository();
