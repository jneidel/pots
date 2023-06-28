import { Command, Flags } from "@oclif/core";
import { edit } from "../../controller/transaction";

export default class Edit extends Command {
  static summary = "Add a transaction.";
  static description = "You will be prompted";

  static examples = [ `$ <%= config.bin %> <%= command.id %>
$ <%= config.bin %> <%= command.id %> -n "Edeka" -p life -a -22.67
$ <%= config.bin %> <%= command.id %> -n "Edeka" -p life -a -22.67 -t groceries -d yesterday --color #ff0000 --color-bg dddddd --dryrun
` ];

  static flags = {
    name: Flags.string( {
      char       : "N",
      description: "New name of the transaction",
    } ),
    pot: Flags.string( {
      char       : "P",
      description: "New pot that the transaction will belong to",
    } ),
    date: Flags.string( {
      char       : "D",
      description: "[default: today] New date of the transaction",
    } ),
    amount: Flags.string( {
      char       : "A",
      description: "New transaction amount, specify negative with minus (-)",
    } ),
    // tag: Flags.string( {
    //   char       : "t",
    //   helpGroup  : "Optional",
    //   description: "Tag/category that the transaction falls under",
    //   aliases    : [ "category" ],
    // } ),
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
    //   description: "Only print the transaction instead of persisting it",
    //   default    : false,
    // } ),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse( Edit );

    await edit( flags )
      .catch( err => this.error( err.message ) )
      .then( properties => {
        this.log( `Successfully updated transactions properties: ${properties.map( p => `'${p}'` )}.` );
      } );
  }
}
