import accountModel from "./account.model.js";
import { BaseRepository } from "../../Repository/baseRepository.js";

class AccountRepository extends BaseRepository {
  constructor() {
    super(accountModel);
  }
}

export default new AccountRepository();
