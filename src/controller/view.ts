import { Transaction } from "../config/models/types";
import database from "../config/database";
import ViewTable from "../component/ViewTable";

export function view( flags ) {
  const pots = database.Pot.findAll( { keepOpen: true } );
  const transactions = database.Transaction.findAll( { keepOpen: true, sortBy: { name: "date", direction: "asc" } } )
    .filter( ( trans: Transaction ) => trans.pot );

  const tableView = new ViewTable( transactions, pots );

  database.close();

  return tableView.print();
}
