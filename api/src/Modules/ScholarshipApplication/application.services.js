import ApplicationRepository from "./application.repository.js";

export default class ApplicationServices {
  static async createApplication(data) {
    try {
      return await ApplicationRepository.createOne(data);
    } catch (error) {
      throw error
    }
  }

  static async getAllApplications(options) {
    try {
      return await ApplicationRepository.findMany({status: "Submitted"}, options);

    } catch (error) {
      throw error
    }
  }

  static async getStudentApplication(studentId) {
    try {
      return await ApplicationRepository.findOne({studentId})
    } catch (error) {
      throw error
    }
  }
}
