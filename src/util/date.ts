const { Date } = require( "sugar" );

export function validateDateString( dateString: string, dontThrow = false ): string|boolean {
  const date = Date.create( dateString );
  const message = `Invalid date passed.

Natural language dates like these supported:
  today, yesterday, tomorrow, Thursday, fri, next wednesday, last week tue, mon 3 weeks ago, aug 15

Alternatively an exact dates like 5/24/2022 can also be used.

You can play around with what works here: https://sugarjs.com/dates/#/Parsing`;

  if ( !Date.isValid( date ) ) {
    if ( !dontThrow )
      throw new Error( message );

    return message;
  } else {
    return true;
  }
}

export class DateString {
  string: string;
  date: Date;

  constructor( string: string ) {
    validateDateString( string );

    this.string = string;
    this.date = Date.create( string );
  }

  format( formatString: string ): string[] {
    return Date.format( this.date, formatString ).split( " " );
  }
}
