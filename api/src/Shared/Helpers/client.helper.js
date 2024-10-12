import { config } from '../../Config/app.config';

/**
 * Manages the client links based on the current branch name.
 */
export class ClientHelper {
  /**
   * Gets the current client links based on the branch name.
   * @returns The client links object for the current branch.
   */
  static getCurrentClient() {
    const currentBranchName= config.environment.branchName;
    const staggingLinks = config.clients.stagging;
    const productionLinks = config.clients.production;
    return currentBranchName === 'stagging' ? staggingLinks : productionLinks;
  }
}
