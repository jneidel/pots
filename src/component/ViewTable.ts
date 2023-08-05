import { Transaction, Pot } from "../config/models/types";
import BaseTable from "./BaseTable";
import { TableMatrix } from "./types/table";

export default class TransactionTableView extends BaseTable {
  private transactions: Transaction[];
  private pots: Pot[];
  private headerRow: string[];
  private sumsRow: string[];

  constructor( transactions: Transaction[], pots: Pot[] ) {
    const headerRow = 1;
    const sumsRow = 1;
    const descriptionColumn = 1;

    const dataStartRow = headerRow + sumsRow;
    const dataRows = transactions.length;
    const rows = dataRows + dataStartRow;

    const dataStartColumn = descriptionColumn;
    const dataColumns = pots.length;
    const columns = dataColumns + dataStartColumn;

    const dimensions = {
      dataStartColumn,
      dataStartRow,
      rows,
      columns,
    };
    super( dimensions );

    this.transactions = transactions;
    this.pots = pots;

    this.headerRow = this.generateHeaderRow();
    this.sumsRow = this.calculateSumsRow();

    this.fillTable();
  }

  private generateHeaderRow() {
    return [
      "Transactions",
      ...this.pots.map( p => p.name ),
    ];
  }
  private calculateSumsRow() {
    const sumsByPot = this.transactions.reduce( ( acc, trans: Transaction ) => {
      const current = acc[trans.pot.name] || 0;
      acc[trans.pot.name] = current + trans.amount;
      return acc;
    }, {} );

    return [
      "Totals",
      ...this.pots.map( pot => ( sumsByPot[pot.name] || 0 ).toFixed( 2 ) ),
    ];
  }

  private getColumnIndexForPot( pot: Pot ) {
    return this.headerRow.indexOf( pot.name );
  }
  private getTransactionAtRow( rowIndex: number ): Transaction {
    // assumption: dataRowIndex >= 0
    const dataRowIndex = rowIndex - this.dimensions.dataStartRow;

    return this.transactions[dataRowIndex];
  }

  private isHeaderRow( rowIndex: number ) {
    return rowIndex === 0;
  }
  private isSumsRow( rowIndex: number ) {
    return rowIndex === 1;
  }

  public generateTableMatrixWithData(): TableMatrix {
    const matrix: TableMatrix = [];

    for ( let row = 0; row < this.dimensions.rows; row++ )
      if ( this.isHeaderRow( row ) ) {
        matrix[row] = this.headerRow;
      } else if ( this.isSumsRow( row ) ) {
        matrix[row] = this.sumsRow;
      } else {
        matrix[row] = this.fillRowWithTransactionData( row );

        if ( this.isFirstDataRow( row ) )
          matrix[row] = this.underlineRow( matrix[row] );
      }


    return matrix;
  }

  private fillRowWithTransactionData( rowIndex: number ) {
    const trans = this.getTransactionAtRow( rowIndex );
    let row = this.generateRowOf( "" );

    row[this.getColumnIndexForPot( trans.pot )] = { content: trans.amount.toFixed( 2 ) };

    row[0] = { content: trans.name, chars: this.underlineChars };
    row[1] = this.mergeEntryWithChars( row[1], this.underlineCharsFinishFromNextColumn );

    if ( this.transactionsHaveMonthChangeBetweenThem( rowIndex ) )
      row = this.underlineRow( row );

    return row;
  }

  public transactionsHaveMonthChangeBetweenThem( index: number ): boolean {
    const dataAwareIndex = index - this.dimensions.dataStartRow;

    if ( dataAwareIndex <= 0 ) {
      return false;
    } else {
      const previousTransaction = this.transactions[dataAwareIndex - 1];
      const currentTransaction = this.transactions[dataAwareIndex];

      return previousTransaction.date.getMonth() !== currentTransaction.date.getMonth();
    }
  }

  public fillTable() {
    const tableRows = this.generateTableMatrixWithData();
    tableRows.forEach( row => this.table.push( row ) );
  }
}
