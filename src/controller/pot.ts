import { Require, Validate } from "../flag";
import database from "../config/database";
import { Pot } from "../config/models/types";

export async function add( flags ): Promise<string> {
  const name = await Require.text( {
    value : flags.name,
    prompt: "Name of the pot?",
  } );

  // const color = Validate.hex( { value: flags.color } );
  // const colorBg = Validate.hex( { value: flags["color-bg"] } );
  // const { dryrun } = flags;

  database.Pot.create( { name } );

  return name;
}

export function list(): string[] {
  const pots = database.Pot.findAll().map( pot => pot.name );

  database.close();

  return pots;
}

export async function remove( flags ): Promise<string> {
  const pot = await Require.pot( {
    value: flags.name,
  } );
  const { name } = pot;

  database.Pot.remove( pot );

  return name;
}

export async function edit( flags ): Promise<string[]> {
  const pot = await Require.pot( {
    value: flags.name,
  } );

  const changedValues: Partial<Pot> = {};
  changedValues.name = await Require.text( {
    value : flags.newName,
    prompt: "New name of the pot?",
  } );

  database.Pot.edit( pot, changedValues );

  return Object.keys( changedValues );
}
