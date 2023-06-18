import { Command, Flags } from "@oclif/core";
import { list } from "../../controller/transaction";

export default class Add extends Command {
  static summary = "List transactions.";

  static examples = [ `$ <%= config.bin %> <%= command.id %>
$ <%= config.bin %> <%= command.id %> -n "Edeka" -p life -a -22.67
$ <%= config.bin %> <%= command.id %> -n "Edeka" -p life -a -22.67 -t groceries -d yesterday --color #ff0000 --color-bg dddddd --dryrun
` ];

  static flags = {
  };

  async run(): Promise<void> {
    // const { flags } = await this.parse( Add );

    list();
  }
}
