import Table from "cli-table3";
import { Transaction } from "../config/models/types";
import database from "../config/database";

export function view( flags ) {
  const pots = database.Pot.findAll( { keepOpen: true } )
    .map( pot => pot.name );
  const transactions = database.Transaction.findAll( { keepOpen: true } )
    .filter( ( trans: Transaction ) => trans.pot );

  const sumsByPot = transactions.reduce( ( acc, trans: Transaction ) => {
    const current = acc[trans.pot.name] || 0;
    acc[trans.pot.name] = current + trans.amount;
    return acc;
  }, {} );

  const columns = [ "Transactions", ...pots ];
  const sums = [ "Totals", ...pots.map( pot => ( sumsByPot[pot] || 0 ).toFixed( 2 ) ) ];

  const table = new Table( {
    colWidths: [ 35 ],
    chars    : {
      "mid"      : " ",
      "right-mid": "│",
      "mid-mid"  : "│",
    },
    colAligns: [ "left", ...new Array( columns.length - 1 ).fill( "right" ) ],
    style    : { head: [] },
    wordWrap : true,
  } );

  table.push( columns );
  table.push( sums );

  transactions.forEach( ( trans: Transaction ) => {
    const potIndex = columns.indexOf( trans.pot.name );
    const arr = new Array( columns.length ).fill( "" );
    arr[0] = {
      content: trans.name,
      chars  : { "mid": "─", "left-mid": "├" },
    };

    arr[potIndex] = trans.amount.toFixed( 2 );

    arr[1] = {
      content: arr[1],
      chars  : { "mid-mid": "┤" },
    };
    table.push( arr );
  } );

  database.close();

  return table.toString();
}
