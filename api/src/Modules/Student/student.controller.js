import { NotFoundException } from "../../Shared/Exceptions/Common/notFoundException.js";
import StudentServices from "./student.services.js";

export default class StudentController {

  static async updateStudentProfile(req, res) {
    const {accountTypeId} = req.user;

    const userAccount = await StudentServices.checkAccountPresence({
      _id: data.id,
    });

    if (!userAccount) throw new NotFoundException("Account does not exist");

    const updatedProfile = await StudentServices.updateStudent(data)
  }


}
