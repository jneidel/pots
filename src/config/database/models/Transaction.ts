import { DataTypes, Sequelize } from "sequelize";

export function defineTransaction( sequelize: Sequelize, Pot, Tag ) {
  const Transaction = sequelize.define( "Transaction", {
    name: {
      type     : DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type     : DataTypes.DATE,
      allowNull: false,
    },
    amount: {
      type     : DataTypes.FLOAT,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
    },
    colorBg: {
      type: DataTypes.STRING,
    },
  }, {} );

  Transaction.hasOne( Pot, { onDelete: "CASCADE" } );
  Transaction.hasOne( Tag, { onDelete: "SET NULL" } );

  return Transaction;
}
