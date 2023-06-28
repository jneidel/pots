import * as askFor from "../util/questions";
import { ValueOnly, PromptOptions, InteractiveDefaultOptions } from "./options";
import { DateString } from "../util/date";
import database from "../config/database";
import { Pot, Transaction } from "../config/models/types";
import { findPot } from "./util";

export default class Require {
  static async text( options: PromptOptions ): Promise<string> {
    const { value, prompt } = options;

    if ( value )
      return value;
    else
      return askFor.text( prompt );
  }

  static async number( options: PromptOptions ): Promise<Number> {
    const { value, prompt } = options;

    if ( value )
      return Number.parseFloat( value );
    else
      return askFor.number( prompt );
  }

  static async date( options: InteractiveDefaultOptions ): Promise<DateString> {
    const { value, isInteractive, default: defaultVal } = options;

    if ( value )
      return new DateString( value );
    else if ( !isInteractive )
      return new DateString( "today" );
    else
      return askFor.date().then( ans => new DateString( ans ) );
  }

  static async pot( options: ValueOnly ): Promise<Pot> {
    const { value } = options;

    if ( value ) {
      return findPot( value );
    } else {
      const pots = database.Pot.findAll();

      const selected = await askFor.selectFromList<Pot>( {
        message: "Select a pot:",
        choices: [ ...pots ]
          .map( ( pot ) => ( { name: pot.name, value: pot } ) ),
        noun: "pot",
      } );

      return selected;
    }
  }

  static async transaction( options: ValueOnly, verb: string|null = null ): Promise<Transaction> {
    const { value } = options;

    // if ( value ) {
    //   try {
    //     return database.Transaction.findById( value, { keepOpen: true } );
    //   } catch ( err ) {
    //     console.log( "404:", err );
    //     throw new Error( `Pot named '${value}' does not exist.` );
    //   }
    // } else {
    const transactions = database.Transaction.findAll();

    const selected = await askFor.selectFromList<Transaction>( {
      message: verb ? `Select a transaction to ${verb}:` : "Select a transaction:",
      choices: [ ...transactions ]
        .map( ( trans ) => ( { name: `"${trans.name}" for ${trans.amount} in "${trans.pot.name}"`, value: trans } ) ),
      noun: "transaction",
    } );

    return selected;
    // }
  }
}
