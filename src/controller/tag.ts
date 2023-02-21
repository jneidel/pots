import { Require, Optional, Validate } from "../flag";
import { getDatabase } from "../config/database";
const { Tag } = getDatabase().models;

export async function add( flags ) {
  const name = await Require.text( {
    value : flags.name,
    prompt: "Name of the tag?",
  } );

  return Tag.create( { name } );
}

export async function list( flags ) {
  await Tag.findAll().then( ans => ans.map( a => a.dataValues ).forEach( tag => console.log( tag.name ) ) );
}
