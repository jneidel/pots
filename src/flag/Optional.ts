import * as askFor from "../controller/questions";
import {ValueOnly, PromptOptions, InteractiveOptions} from "./options";

export default class Optional {
  static async tag( options: InteractiveOptions ) {
    const {value, isInteractive} = options;

    if (value)
      return value;
    else if (isInteractive) {
      const confirm = await askFor.confirmation( {message: "Add a tag?", default: false})
      if (confirm) {
        console.log( "ask for tag" );
        return "tag";
      }
    }

    return null;
  }
}
