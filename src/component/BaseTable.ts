import { Chars, TableDimensions, TableEntry, TableRow } from "./types/table";

export default class BaseTable {
  protected dimensions: TableDimensions;

  constructor( dimensions: TableDimensions ) {
    this.dimensions = dimensions;
  }

  protected mergeEntryWithChars( entry: TableEntry, chars: Chars ) {
    if ( chars && typeof chars === "object" )
      if ( typeof entry === "object" && entry.chars )
        return Object.assign( entry, { chars: Object.assign( {}, entry.chars, chars ) } );
      else if ( typeof entry === "object" )
        return Object.assign( entry, { chars } );
      else if ( typeof entry === "string" && entry )
        return { content: entry, chars };
      else
        return { content: "", chars };
    else
      return entry;
  }

  public mergeRowWithChars( row: TableRow, charsArr: Chars[] ) {
    return row.map( ( rowData, index ) => {
      const chars = charsArr[index];

      return this.mergeEntryWithChars( rowData, chars );
    } );
  }

  protected generateRowOf<T>( fillWith: T ) {
    return new Array( this.dimensions.columns ).fill( fillWith );
  }

  protected underlineChars = { "mid": "─", "left-mid": "├", "mid-mid": "┼", "right-mid": "┤" };
  protected underlineCharsFinishFromNextColumn = { "mid-mid": "┤" };

  protected underlineRow( row: TableRow ): TableRow {
    const charsArr = this.generateRowOf( this.underlineChars );

    return this.mergeRowWithChars( row, charsArr );
  }

  protected isFirstDataRow( rowIndex: number ) {
    return rowIndex === this.dimensions.dataStartRow;
  }
}
