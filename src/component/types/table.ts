export interface TableDimensions {
  rows: number;
  columns: number;
  dataStartRow: number;
  dataStartColumn: number;
}

export type Chars = {
  "top"?: string;    "top-mid"?: string;    "top-left"?: string;    "top-right"?: string;
  "bottom"?: string; "bottom-mid"?: string; "bottom-left"?: string; "bottom-right"?: string;
  "left"?: string;   "left-mid"?: string;
  "mid"?: string;    "mid-mid"?: string;
  "right"?: string;  "right-mid"?: string;
  "middle"?: string;
}

export type TableEntry = string|{
  content: any;
  chars?: Chars;
}
export type TableRow = TableEntry[]
export type TableMatrix = TableRow[]
