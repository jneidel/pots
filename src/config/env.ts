import { join } from "path";

const { HOME } = process.env;
if ( !HOME ) {
  console.error( "Environmental variable $HOME is not set" );
  process.exit( 1 );
}

export const DATA_DIR = join( HOME, ".local/share/pots" );
export const SQLITE_DB = join( DATA_DIR, "db.sqlite" );
export const TRANSACTIONS_FILE = ( year: string|number ) => join( DATA_DIR, `transactions-${year}.json` );
