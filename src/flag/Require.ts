import * as askFor from "../util/questions";
import { ValueOnly, PromptOptions, InteractiveDefaultOptions } from "./options";
import { getDatabase } from "../config/database";

export default class Require {
  static async text( options: PromptOptions ) {
    const { value, prompt } = options;

    if ( value )
      return value;
    else
      return askFor.text( prompt );
  }

  static async number( options: PromptOptions ) {
    const { value, prompt } = options;

    if ( value )
      return value;
    else
      return askFor.number( prompt );
  }

  static async date( options: InteractiveDefaultOptions ) {
    const { value, isInteractive, default: defaultVal } = options;

    if ( value )
      return value;
    else if ( !isInteractive )
      return defaultVal;
    else
      return askFor.date();
  }

  static async pot( options: ValueOnly ) {
    const { value } = options;
    const { Pot } = getDatabase().models;

    if ( value ) {
      return Pot.findOne( {
        where: {
          name: value,
        },
      } ).then( res => {
        if ( res === null )
          throw new Error( `Pot named '${value}' does not exist.` );
        else
          return res;
      } );
    } else {
      const pots: any = await Pot.findAll();

      const selected = await askFor.selectFromList( {
        message: "Select a pot:",
        choices: pots.map( pot => ( { name: pot.name, value: pot } ) ),
      } );

      return selected;
    }
  }
}
