import bcrypt from 'bcrypt';

/**
 * A helper class for generating and verifying hashes using bcrypt.
 */
export default class HashHelper {

  static async generateHash(plainText) {
    return await bcrypt.hash(plainText, 10);
  }

  static async verifyHash(plainText, hash) {
    const isMatch = await bcrypt.compare(plainText, hash);
    return isMatch;
  }
}
