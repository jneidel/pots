import { Require, Optional, Validate } from "../flag";
import { getDatabase } from "../config/database";

export async function add( flags ) {
  const name = await Require.text( {
    value : flags.name,
    prompt: "Name of the pot?",
  } );

  const color = Validate.hex( { value: flags.color } );
  const colorBg = Validate.hex( { value: flags["color-bg"] } );
  const { dryrun } = flags;

  const { Pot } = getDatabase().models;
  return Pot.create( { name, color, colorBg } );
}
