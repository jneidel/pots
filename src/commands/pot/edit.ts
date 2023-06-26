import { Command, Flags } from "@oclif/core";
import { edit } from "../../controller/pot";

export default class Edit extends Command {
  static summary = "Update a pot.";

  static examples = [ `$ <%= config.bin %> <%= command.id %>
  $ <%= config.bin %> <%= command.id %> -n life
  $ <%= config.bin %> <%= command.id %> -n life -N Leben
  ` ];

  static flags = {
    name: Flags.string( {
      char       : "n",
      description: "Name of the pot",
      aliases    : [ "p", "pot", "text" ],
    } ),
    newName: Flags.string( {
      char       : "N",
      description: "New name of the pot",
    } ),
    // color: Flags.string( {
    //   char       : "c",
    //   helpGroup  : "Optional",
    //   description: "Text color of the transaction",
    // } ),
    // "color-bg": Flags.string( {
    //   description: "Background color of the transaction",
    //   char       : "b",
    //   helpGroup  : "Optional",
    //   aliases    : [ "bg" ],
    // } ),
    // dryrun: Flags.boolean( {
    //   helpGroup  : "Testing",
    //   description: "Print the pot instead of persisting it",
    //   default    : false,
    // } ),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse( Edit );

    await edit( flags ).catch( err => {
      this.error( `${err.message}` );
    } ).then( properties => {
      this.log( `Successfully updated pots properties: ${properties.map( p => `'${p}'` )}.` )
    });
  }
}
