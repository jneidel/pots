import * as askFor from "../util/questions";
import { ValueOnly, PromptOptions, InteractiveOptions } from "./options";
import { getDatabase } from "../config/database";
type Tag = any;

export default class Optional {
  static async tag( options: InteractiveOptions ): Promise<Tag|undefined> {
    const { value, isInteractive } = options;
    const { Tag } = getDatabase().models;

    if ( value ) {
      return Tag.findOne( {
        where: {
          name: value,
        },
      } ).then( res => {
        if ( res === null )
          throw new Error( `Tag named '${value}' does not exist.` );
        else
          return res;
      } );
    } else if ( isInteractive ) {
      const confirm = await askFor.confirmation( { message: "Add a tag?", default: false } );
      if ( confirm ) {
        const tags: any[] = await Tag.findAll();
        const selected = await askFor.selectFromList( {
          message: "Select a tag:",
          choices: tags.map( tag => ( { name: tag.name, value: tag } ) ),
          noun   : "tag",
        } );

        return selected;
      }
    }

    return undefined;
  }
}
