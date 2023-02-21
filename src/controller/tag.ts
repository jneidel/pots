import { Require, Optional, Validate } from "../flag";
import { getDatabase } from "../config/database";

export async function add( flags ) {
  const name = await Require.text( {
    value : flags.name,
    prompt: "Name of the tag?",
  } );

  const { Tag } = getDatabase().models;
  return Tag.create( { name } );
}
