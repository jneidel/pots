import { Command, Flags } from "@oclif/core";
import { list } from "../../controller/tag";

export default class List extends Command {
  static summary = "List the tags along with their monthly totals.";

  static examples = [ `$ <%= config.bin %> <%= command.id %>
  ` ];

  static flags = {
    month: Flags.string( {
      char       : "m",
      description: "Month to list the totals for",
      aliases    : [ "d", "date" ],
    } ),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse( List );

    await list( flags )
      .catch( err => this.error( err.message ) );
  }
}
