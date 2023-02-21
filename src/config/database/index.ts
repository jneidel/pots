import { Sequelize } from "sequelize";
import { SQLITE_DB } from "../env";
import { defineTransaction, definePot, defineTag } from "./models";
import { createDataDir } from "../fs";

let sequelize: Sequelize;

export async function setupDatabase( options ) {
  await createDataDir();

  openDatabaseConnection( options );
  await sequelize.sync( { alter: true } ); // TODO: not for production
}

async function openDatabaseConnection( options: { logging?: boolean } = {} ) {
  sequelize = new Sequelize( {
    dialect: "sqlite",
    storage: SQLITE_DB,
    logging: options.logging || false,
  } );
  const Pot = definePot( sequelize );
  const Tag = defineTag( sequelize );
  defineTransaction( sequelize, Pot, Tag );
}

export function getDatabase() {
  if ( !sequelize )
    openDatabaseConnection();

  return sequelize;
}

export * from "./models";
