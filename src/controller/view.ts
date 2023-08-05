import Table from "cli-table3";
import { Transaction } from "../config/models/types";
import database from "../config/database";
import ViewTable from "../component/ViewTable";

export function view( flags ) {
  const pots = database.Pot.findAll( { keepOpen: true } );
  const transactions = database.Transaction.findAll( { keepOpen: true } )
    .filter( ( trans: Transaction ) => trans.pot );

  const columns = [ "Transactions", ...pots.map( p => p.name ) ];

  const table = new Table( {
    colWidths: [ 35 ],
    chars    : {
      "mid"      : " ",
      "right-mid": "│",
      "mid-mid"  : "│",
      "left-mid" : "│",
    },
    colAligns: [ "left", ...new Array( columns.length - 1 ).fill( "right" ) ],
    style    : { head: [] },
    wordWrap : true,
  } );

  const tableView = new ViewTable( transactions, pots );
  const tableRows = tableView.generateTableMatrixWithData();
  tableRows.forEach( row => table.push( row ) );

  database.close();

  return table.toString();
}
