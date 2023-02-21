import { Command, Flags } from "@oclif/core";
import { add } from "../../controller/tag";

export default class Add extends Command {
  static summary = "Add a tag.";

  static examples = [ `$ <%= config.bin %> <%= command.id %>
  $ <%= config.bin %> <%= command.id %> -n groceries
  ` ];

  static flags = {
    name: Flags.string( {
      char       : "n",
      description: "Name of the pot",
      aliases    : [ "t", "tag", "text" ],
    } ),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse( Add );

    await add( flags ).catch( err => {
      if ( err.name === "SequelizeUniqueConstraintError" )
        this.error( `Name already exists in the system.` );
      else
        this.error( `${err.name}: ${err.message}` );
    } ).then( () => this.log( "Successfully added tag." ) );
  }
}
