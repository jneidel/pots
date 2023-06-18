import { Command, Flags } from "@oclif/core";
import { add } from "../../controller/pot";

export default class Add extends Command {
  static summary = "Add a pot.";

  static examples = [ `$ <%= config.bin %> <%= command.id %>
  $ <%= config.bin %> <%= command.id %> -n life
  $ <%= config.bin %> <%= command.id %> -n life --color #ff0000 --color-bg dddddd --dryrun
  ` ];

  static flags = {
    name: Flags.string( {
      char       : "n",
      description: "Name of the pot",
      aliases    : [ "p", "pot", "text" ],
    } ),
    color: Flags.string( {
      char       : "c",
      helpGroup  : "Optional",
      description: "Text color of the transaction",
    } ),
    "color-bg": Flags.string( {
      description: "Background color of the transaction",
      char       : "b",
      helpGroup  : "Optional",
      aliases    : [ "bg" ],
    } ),
    dryrun: Flags.boolean( {
      helpGroup  : "Testing",
      description: "Print the pot instead of persisting it",
      default    : false,
    } ),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse( Add );

    await add( flags ).catch( err => {
      if ( err.name === "SequelizeUniqueConstraintError" )
        this.error( `Name already exists in the system.` );
      else
        this.error( `${err.name}: ${err.message}` );
    } ).then( () => this.log( "Successfully added pot." ) );
  }
}
