import StudentRepository from "./student.repository.js";

export default class StudentServices {
  static async createStudent(data) {
    try {
      return await StudentRepository.createOne(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async updateStudent(
    filter,
    setPayload,
    unSetPayload
  ) {
    try {
      const updatedAccount = await StudentRepository.updateOne(
        filter,
        setPayload,
        unSetPayload
      );
  
      return updatedAccount;
      
    } catch (error) {
      throw error
    }
  }

  static async checkAccountPresence(filter) {
    return await StudentRepository.findOne(filter);
  }
}
