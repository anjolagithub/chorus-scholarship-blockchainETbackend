import ApplicationRepository from "./application.repository.js";

export default class ApplicationServices {
  static async ceateApplication(data) {
    try {
      return await ApplicationRepository.createOne(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllApplications(options) {
    try {
      return await ApplicationRepository.findMany({}, options);

    } catch (error) {
      console.log(error);
    }
  }
}
