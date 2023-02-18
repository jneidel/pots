import { Command, Flags } from "@oclif/core";
import { Require, Optional, Validate } from "../../flag";

export default class Add extends Command {
  static summary = "Add a transaction.";

  static examples = [ `$ <%= config.bin %> <%= command.id %>
$ <%= config.bin %> <%= command.id %> -n "Edeka" -p life -a -22.67 -t groceries
$ <%= config.bin %> <%= command.id %> -n "Edeka" -p life -a -22.67 -t groceries -d yesterday --color #ff0000 --color-bg #dddddd --dryrun
` ];

  static flags = {
    name: Flags.string( {
      char: "n",
      description: "Name of the transaction",
      aliases: ["text"],
    } ),
    pot: Flags.string( {
      char: "p",
      description: "Pot that the transaction belongs to",
    } ),
    date: Flags.string( {
      char: "d",
      description: "[default: today] Date of the transaction",
    } ),
    amount: Flags.string( {
      char: "a",
      description: "Transaction size, specify negative with minus (-)",
      aliases: ["size"],
    } ),
    tag: Flags.string( {
      char: "t",
      helpGroup: "Optional",
      description: "Tag/category that the transaction falls under",
      aliases: ["category"],
    } ),
    color: Flags.string( {
      char: "c",
      helpGroup: "Optional",
      description: "Text color of the transaction",
    } ),
    "color-bg": Flags.string( {
      description: "Background color of the transaction",
      char: "b",
      helpGroup: "Optional",
      aliases: ["bg"],
    } ),
    dryrun: Flags.boolean( {
      helpGroup: "Testing",
      description: "Only print the transaction instead of persisting it",
      default: false,
    } ),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse( Add );
    const isInteractive = !(!flags.date && flags.name && flags.pot && flags.amount);

    const name = await Require.text( {
      value: flags.name,
      prompt: "Transaction name?"
    } );
    const amount = await Require.number( {
      value: flags.amount,
      prompt: "What amount?"
    } );
    const pot = await Require.pot( {
      value: flags.pot,
    })
    const tag = await Optional.tag( {
      value: flags.tag,
      isInteractive,
    })
    const date = await Require.date( {
      value: flags.date,
      isInteractive,
      default: "today"
    } );

    const color = Validate.hex( { value: flags.color, } );
    const colorBg = Validate.hex( { value: flags["color-bg"] })
    const { dryrun } = flags;
  }
}
