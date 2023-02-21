import { Sequelize } from "sequelize";
import { SQLITE_DB } from "../env";
import { defineTransaction, definePot, defineTag } from "./models";
import { createDataDir } from "../fs";

let sequelize: Sequelize;

export async function setupDatabase() {
  await createDataDir();

  openDatabaseConnection();
  await sequelize.sync();
}

async function openDatabaseConnection() {
  sequelize = new Sequelize( {
    dialect: "sqlite",
    storage: SQLITE_DB,
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
