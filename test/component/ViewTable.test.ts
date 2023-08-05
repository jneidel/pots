import ViewTable from "../../src/component/ViewTable";
import { Transaction, Pot } from "../../src/config/models/types";

const pots: Pot[] = [
  { name: "p1" },
  { name: "p2" },
  { name: "p3" },
];
const trans: Transaction[] = [
  { name: "t1", date: new Date( "2023-07-27" ), amount: 1, pot: pots[0] },
  { name: "t2", date: new Date( "2023-07-28" ), amount: 2, pot: pots[2] },
  { name: "t3", date: new Date( "2023-08-02" ), amount: 3, pot: pots[1] },
  { name: "t4", date: new Date( "2023-08-03" ), amount: 4, pot: pots[2] },
];

const headerRow = [ "Transactions", "p1", "p2", "p3" ];
const sumsRow = [ "Totals", "1.00", "3.00", "6.00" ];

const table = new ViewTable( trans, pots );
const tableMatrixWithData = table.generateTableMatrixWithData();

test( "calculates correct sumsRow", () => {
  expect( tableMatrixWithData[1] ).toEqual( sumsRow );
} );
test( "calculates sumsRow with pots that have no transactions/no sum", () => {
  const transWithoutT1 = [ ...trans ].slice( 1 );
  const table = new ViewTable( transWithoutT1, pots );
  const tableMatrixWithData = table.generateTableMatrixWithData();

  const expected = [ "Totals", "0.00", "3.00", "6.00" ];
  expect( tableMatrixWithData[1] ).toEqual( expected );
} );
test( "has correct headerRow", () => {
  expect( tableMatrixWithData[0] ).toEqual( headerRow );
} );

test( "generateTableMatrixWithData has the right dimensions", () => {
  const table = new ViewTable( trans, pots );

  const numberOfRows = trans.length + 2;
  const numberOfColumns = pots.length + 1;

  const results = table.generateTableMatrixWithData();
  expect( results.length    ).toBe( numberOfRows );
  expect( results[0].length ).toBe( numberOfColumns );
  expect( results[1].length ).toBe( numberOfColumns );
  expect( results[2].length ).toBe( numberOfColumns );
  expect( results[3].length ).toBe( numberOfColumns );
  expect( results[4].length ).toBe( numberOfColumns );
  expect( results[5].length ).toBe( numberOfColumns );
  expect( results[6]        ).toBe( undefined );
} );

test( "generateTableMatrixWithData fills the right pots", () => {
  const table = new ViewTable( trans, pots );

  const result: any = table.generateTableMatrixWithData() ;
  expect( result[0] ).toEqual( headerRow );
  expect( result[1] ).toEqual( sumsRow );
  expect( result[2][0].content ).toBe( `${trans[0].name  } (Jul27)` );
  expect( result[2][1].content ).toBe( trans[0].amount.toFixed( 2 ) );
  expect( result[3][0].content ).toBe( `${trans[1].name  } (Jul28)` );
  expect( result[3][3].content ).toBe( trans[1].amount.toFixed( 2 ) );
  expect( result[4][0].content ).toBe( `${trans[2].name  } (Aug02)` );
  expect( result[4][2].content ).toBe( trans[2].amount.toFixed( 2 ) );
  expect( result[5][0].content ).toBe( `${trans[3].name  } (Aug03)` );
  expect( result[5][3].content ).toBe( trans[3].amount.toFixed( 2 ) );
} );

test.each( [
  [
    [ "", "s", "" ],
    [ { "mid": "m1" }, "" ],
    [ { content: "", chars: { "mid": "m1" } }, "s", "" ],
  ],
  [
    [ "c1" ],
    [ { "mid": "m1" } ],
    [ { content: "c1", chars: { "mid": "m1" } } ],
  ],
  [
    [ { content: "c2" } ],
    [ "" ],
    [ { content: "c2" } ],
  ],
  [
    [ { content: "c3" } ],
    [ { "mid": "m3" } ],
    [ { content: "c3", chars: { "mid": "m3" } } ],
  ],
  [
    [ { content: "c4", chars: { "mid-mid": "mm1" } } ],
    [ { "mid": "m4" } ],
    [ { content: "c4", chars: { "mid": "m4", "mid-mid": "mm1" } } ],
  ],
  [
    [ { content: "c5", chars: { "mid": "ma1" } } ],
    [ { "mid": "m5" } ],
    [ { content: "c5", chars: { "mid": "m5" } } ],
  ],
] )( "mergeRowWithChars is correctly merging: %o", ( row: any, chars: any, expected ) => {
  const table = new ViewTable( trans, pots );

  const result = table.mergeRowWithChars( row, chars );
  expect( result ).toEqual( expected );
} );

test.each( [
  [ 0, false ],
  [ 1, false ],
  [ 2, false ],
  [ 3, false ],
  [ 4, true ],
  [ 5, false ],
] )( "transactionsHaveMonthChangeBetweenThem (index=%d)", ( index: number, expected: boolean ) => {
  const table = new ViewTable( trans, pots );

  const result = table.transactionsHaveMonthChangeBetweenThem( index );
  expect( result ).toBe( expected );
} );
