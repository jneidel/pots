import { Command, Flags } from "@oclif/core";
import { add } from "../../controller/transaction";

export default class Add extends Command {
  static summary = "Add a transaction.";

  static examples = [ `$ <%= config.bin %> <%= command.id %>
$ <%= config.bin %> <%= command.id %> -n "Edeka" -p life -a -22.67
$ <%= config.bin %> <%= command.id %> -n "Edeka" -p life -a -22.67 -t groceries -d yesterday --color #ff0000 --color-bg dddddd --dryrun
` ];

  static flags = {
    name: Flags.string( {
      char       : "n",
      description: "Name of the transaction",
      aliases    : [ "text" ],
    } ),
    pot: Flags.string( {
      char       : "p",
      description: "Pot that the transaction belongs to",
    } ),
    date: Flags.string( {
      char       : "d",
      description: "[default: today] Date of the transaction",
    } ),
    amount: Flags.string( {
      char       : "a",
      description: "Transaction size, specify negative with minus (-)",
      aliases    : [ "size" ],
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
    const { flags } = await this.parse( Add );

    await add( flags )
      .catch( err => this.error( err.message ) );
  }
}
