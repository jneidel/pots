import { join } from "path";

export let NODE_ENV: "dev"|"prod" = "dev";
if ( !process.argv[1].match( /\/bin\/run/ ) )
  NODE_ENV = "prod";
if ( process.env.NODE_ENV === "dev" )
  NODE_ENV = "dev";
else if ( process.env.NODE_ENV === "prod" )
  NODE_ENV = "prod";

const { HOME } = process.env;
if ( !HOME ) {
  console.error( "Environmental variable $HOME is not set" );
  process.exit( 1 );
}

export const DATA_DIR = NODE_ENV === "dev" ?
  join( __dirname, "..", ".." ) :
  join( HOME, ".local/share/pots" );
export const SQLITE_DB = join( DATA_DIR, "db.sqlite" );
