import { Command, Flags } from "@oclif/core";
import { remove } from "../../controller/transaction";

export default class Remove extends Command {
  static summary = "Interactively remove a transaction.";

  static examples = [ `$ <%= config.bin %> <%= command.id %>
` ];

  static flags = {};

  async run(): Promise<void> {
    await remove().catch( err => {
      this.error( `${err.message}` );
    } ).then( name => this.log( `Successfully removed transaction '${name}'.` ) );
  }
}
