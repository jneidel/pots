import { Command, Flags } from "@oclif/core";
import { list } from "../../controller/pot";

export default class List extends Command {
  static summary = "List pots.";

  static examples = [ `$ <%= config.bin %> <%= command.id %>
  $ <%= config.bin %> <%= command.id %> -n life
  $ <%= config.bin %> <%= command.id %> -n life --color #ff0000 --color-bg dddddd --dryrun
  ` ];

  static flags = {
  };

  async run(): Promise<void> {
    try {
      list().forEach( pot => this.log( pot ) );
    } catch ( err: any ) {
      this.error( err.message );
    }
  }
}
