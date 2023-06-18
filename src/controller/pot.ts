import { Require, Validate } from "../flag";
import database from "../config/database";

export async function add( flags ) {
  const name = await Require.text( {
    value : flags.name,
    prompt: "Name of the pot?",
  } );

  // const color = Validate.hex( { value: flags.color } );
  // const colorBg = Validate.hex( { value: flags["color-bg"] } );
  const { dryrun } = flags;

  database.Pot.create( { name } );
}

export function list() {
  const pots = database.Pot.findAll();

  pots.forEach( ( pot ) => {
    console.log( pot.name );
  } );

  database.close();
}
