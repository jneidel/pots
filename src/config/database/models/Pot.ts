import { DataTypes, Sequelize } from "sequelize";

export function definePot( sequelize: Sequelize ) {
  return sequelize.define( "Pot", {
    name: {
      type     : DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
    },
    bgColor: {
      type: DataTypes.STRING,
    },
  }, {} );
}
