import { DataTypes, Sequelize } from "sequelize";

export function definePot( sequelize: Sequelize ) {
  return sequelize.define( "Pot", {
    name: {
      type     : DataTypes.STRING,
      allowNull: false,
      unique   : true,
    },
    color: {
      type: DataTypes.STRING,
    },
    colorBg: {
      type: DataTypes.STRING,
    },
  }, {} );
}
