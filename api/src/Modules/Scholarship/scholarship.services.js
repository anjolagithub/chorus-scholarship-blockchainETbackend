import ScholarshipRepository from "./scholarship.repository.js";
import { addImageToCloudinary } from "../../Shared/utils/uploadFileToCloud.js";

export default class ScholarshipServices {
  static async createScholarship(data) {
    try {
      return await ScholarshipRepository.createOne(data);
    } catch (error) {
      throw error
    }
  }

  static async getAllScholarships(options) {
    try {
      const scholarships = await ScholarshipRepository.findMany({status: "Open"}, options);
      console.log(JSON.stringify(scholarships, null, 4))
      return scholarships
    } catch (error) {
      console.log(error);
    }
  }

  static async uploadImageToCloudinary (data) {
    const url = await addImageToCloudinary(data);
    return url;
  }
}
