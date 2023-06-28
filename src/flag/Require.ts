import * as askFor from "../util/questions";
import { ValueOnly, PromptOptions, InteractiveDefaultOptions } from "./options";
import { DateString } from "../util/date";
import database from "../config/database";
import { Pot } from "../config/models/types";

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
      try {
        return database.Pot.findById( value, { keepOpen: true } );
      } catch ( err ) {
        console.log( "404:", err );
        throw new Error( `Pot named '${value}' does not exist.` );
      }
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
}
