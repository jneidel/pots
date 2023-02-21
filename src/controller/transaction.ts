import { Require, Optional, Validate } from "../flag";
import { getDatabase } from "../config/database";

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
  const tag = await Optional.tag( {
    value: flags.tag,
    isInteractive,
  } );
  const date = await Require.date( {
    value  : flags.date,
    isInteractive,
    default: "today",
  } );

  const color = Validate.hex( { value: flags.color } );
  const colorBg = Validate.hex( { value: flags["color-bg"] } );
  const { dryrun } = flags;

  const { Transaction } = getDatabase().models;
  return Transaction.create( { name, amount, pot, tag, color, colorBg } );
}
