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


export function list() {
  const transactions = database.Transaction.findAll();

  transactions.forEach( ( t ) => {
    if ( t.pot )
      console.log( t.name, t.pot.name, t.amount, t.date );
    else
      console.log( t.name, t.amount, t.date );
  } );

  database.close();
}
