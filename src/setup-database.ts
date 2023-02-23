#! /usr/bin/env node

if ( process.argv.length < 3 || ![ "dev", "prod" ].includes( process.argv[2] ) ) {
  console.error( "$ node setup-database.js NODE_ENV" );
  console.error( "Missing environment: specify either 'dev' or 'prod'" );
  process.exit( 1 );
} else {
  process.env.NODE_ENV = process.argv[2];
}

import { setupDatabase } from "./config/database";

( async () => {
  await setupDatabase( { logging: true } );
} )();
