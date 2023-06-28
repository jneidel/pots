import database from "../config/database";
import { Pot, Transaction } from "../config/models/types";

export function findPot( value: any ): Pot {
  try {
    return database.Pot.findById( value, { keepOpen: true } );
  } catch ( err ) {
    console.log( "404:", err );
    throw new Error( `Pot named '${value}' does not exist.` );
  }
}
