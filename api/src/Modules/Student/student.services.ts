import StudentRepository from "./student.repository";

export default class StudentServices {
  public static async createStudent(data) {
    try {
      return await StudentRepository.createOne(data);
    } catch (error) {
      console.log(error);
    }
  }

  public static async updateStudent(
    filter: any,
    setPayload?: any,
    unSetPayload?: any
  ): Promise<any> {
    const updatedAccount = await StudentRepository.updateOne(
      filter,
      setPayload,
      unSetPayload
    );

    return updatedAccount;
  }
}
