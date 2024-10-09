import studentModel from "./student.model";
import { BaseRepository } from "../../Repository";

/**
 * Repository class for interacting with the student collection in the database.
 */
class StudentRepository extends BaseRepository<any> {
  constructor() {
    super(studentModel);
  }
}

export default new StudentRepository();
