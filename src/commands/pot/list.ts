import { Command, Flags } from "@oclif/core";
import { list } from "../../controller/pot";

export default class Add extends Command {
  static summary = "List pots.";

  static examples = [ `$ <%= config.bin %> <%= command.id %>
  $ <%= config.bin %> <%= command.id %> -n life
  $ <%= config.bin %> <%= command.id %> -n life --color #ff0000 --color-bg dddddd --dryrun
  ` ];

  static flags = {
  };

  async run(): Promise<void> {
    // const { flags } = await this.parse( Add );

    list();
  }
}
