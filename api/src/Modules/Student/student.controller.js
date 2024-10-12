import { NotFoundException } from "../../Shared/Exceptions/Common/notFoundException.js";
import { ForbiddenException } from "../../Shared/Exceptions/Common/forbiddenException.js"
import StudentServices from "./student.services.js";

export default class StudentController {

  static async updateStudentProfile(req, res) {
    try {
      const {accountType, accountTypeId} = req.user;
      const data = req.body;
  
      if (accountType !== "Student") {
        throw new ForbiddenException("Cannot perform this operation!")
      }
  
      const userAccount = await StudentServices.checkAccountPresence({
        _id: accountTypeId,
      });
  
      if (!userAccount) throw new NotFoundException("Account does not exist");
  
      const updatedProfile = await StudentServices.updateStudent({_id: accountTypeId},data);

      res.status(200).json({message: "profile updated successfully.", profile: updatedProfile})
    } catch (error) {
      res.status(500).json({error})
    }

  }

}
