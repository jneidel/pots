import { Require, Optional, Validate } from "../flag";
import database from "../config/database";
import { Transaction } from "../config/models/types";

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

export async function edit( flags ): Promise<string[]> {
  const name = Optional.text( {
    value: flags.name,
  } );
  const amount = Optional.number( {
    value: flags.amount,
  } );
  const pot = Optional.pot( {
    value: flags.pot,
  } );
  const dateString = Optional.date( {
    value: flags.date,
  } );
  const date = dateString !== null ? dateString.date : null;

  const changedValues: Partial<Transaction> = {};
  [ // set non-null values on change object
    { name },
    { amount },
    { pot },
    { date },
  ].forEach( obj => {
    const propertyName = Object.keys( obj )[0];
    const value = obj[propertyName];

    if ( value !== null )
      changedValues[propertyName] = value;
  } );

  if ( Object.keys( changedValues ).length === 0 )
    throw new Error( "No flags for values to be changed given\nSee --help for available flags" );

  const transaction = await Require.transaction( {
    value: flags.name,
  } );
  database.Transaction.edit( transaction, changedValues );

  return Object.keys( changedValues );
}
