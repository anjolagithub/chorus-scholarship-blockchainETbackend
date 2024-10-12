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
    const updatedAccount = await StudentRepository.updateOne(
      filter,
      setPayload,
      unSetPayload
    );

    return updatedAccount;
  }

  static async checkAccountPresence(filter) {
    return await StudentRepository.findOne(filter);
  }
}
