import { Require, Optional, Validate } from "../flag";
import database from "../config/database";

export async function add( flags ) {
  const isInteractive = !( !flags.date && flags.name && flags.pot && flags.amount );
  const name = await Require.text( {
    value : flags.name,
    prompt: "Transaction name?",
  } );
  const amount = await Require.number( {
    value : flags.amount,
    prompt: "What amount?",
  } );
  const pot = await Require.pot( {
    value: flags.pot,
  } );
  const date = await Require.date( {
    value  : flags.date,
    isInteractive,
    default: "today",
  } ).then( dateString => dateString.date );
  // const color = Validate.hex( { value: flags.color } );
  // const colorBg = Validate.hex( { value: flags["color-bg"] } );
  // const { dryrun } = flags;

  database.Transaction.create( { name, amount, pot, date } );
}


export function list(): string {
  const transactions = database.Transaction.findAll();

  let outString = "";

  transactions.forEach( ( t ) => {
    if ( t.pot )
      outString += `"${t.name}" for ${t.amount} in "${t.pot.name}" on ${t.date}\n`;
    else
      outString += `"${t.name}" for ${t.amount} in "unknown pot" on ${t.date}\n`;
  } );

  database.close();

  return outString;
}

}
