import { DataTypes, Sequelize } from "sequelize";

export function defineTag( sequelize: Sequelize ) {
  return sequelize.define( "Tag", {
    name: {
      type     : DataTypes.STRING,
      allowNull: false,
    },
  }, {} );
}
