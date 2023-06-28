import { ValueOnly } from "./options";
import { DateString } from "../util/date";
import { Pot, Transaction } from "../config/models/types";
import { findPot } from "./util";

export default class Optional {
  static pot( options: ValueOnly ): Pot|null {
    const { value } = options;

    if ( value )
      return findPot( value );
    else
      return null;
  }

  static number( options: ValueOnly ): Number|null {
    const { value } = options;

    if ( value )
      return Number.parseFloat( value );
    else
      return null;
  }


  static text( options: ValueOnly ): string|null {
    const { value } = options;

    if ( value )
      return value;
    else
      return null;
  }

  static date( options: ValueOnly ): DateString|null {
    const { value } = options;

    if ( value )
      return new DateString( value );
    else
      return null;
  }
}
