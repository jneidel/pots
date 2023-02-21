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

export function parseDateStringForValues( dateString: string, formatString: string ): string[] {
  validateDateString( dateString );
  const date = Date.create( dateString );
  return Date.format( date, formatString ).split( " " );
}
