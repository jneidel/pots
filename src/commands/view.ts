import { Command, Flags } from "@oclif/core";
import { view } from "../controller/view";

export default class View extends Command {
  static summary = "List pots.";

  static examples = [ `$ <%= config.bin %> <%= command.id %>
  $ <%= config.bin %> <%= command.id %> -n life
  $ <%= config.bin %> <%= command.id %> -n life --color #ff0000 --color-bg dddddd --dryrun
  ` ];

  static flags = {
  };

  async run(): Promise<void> {
    const { flags } = await this.parse( View );

    try {
      this.log( view( flags ) );
    } catch ( err: any ) {
      this.error( err.message );
    }
  }
}
