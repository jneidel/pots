import { ValueOnly } from "./options";

export default class Validate {
  static hex( options: ValueOnly ) {
    const value = String( options.value ).toUpperCase();

    const regexHashtag = /^#[0-9A-F]{6}$/;
    const regexNoHashtag = /^[0-9A-F]{6}$/;

    if ( regexHashtag.test( value ) )
      return value;
    else if ( regexNoHashtag.test( value ) )
      return `#${value}`;
    else
      return null;
  }
}
