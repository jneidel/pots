import * as askFor from "../controller/questions";
import {ValueOnly, PromptOptions, InteractiveDefaultOptions} from "./options";

export default class Require {
  static async text( options: PromptOptions ) {
    const { value, prompt } = options;

    if (value)
      return value;
    else
      return askFor.text( prompt );
  }

  static async number( options: PromptOptions ) {
    const { value, prompt } = options;

    if (value)
      return value;
    else
      return askFor.number( prompt );
  }

  static async date( options: InteractiveDefaultOptions ) {
    const { value, isInteractive, default: defaultVal } = options;

    if (value)
      return value;
    else if (!isInteractive)
      return defaultVal;
    else
      return askFor.date();
  }

  static async pot( options: ValueOnly ) {
    const {value} = options;

    if (value)
      return value;
    else {
      console.log( "ask for pot" );
      return "pot";
    }
  }
}
