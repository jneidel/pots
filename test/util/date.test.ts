import { validateDateString, DateString } from "../../src/util/date";

test.each( [
  "today",
  "yesterday",
  "tomorrow",
  "Thursday",
  "fri",
  "next wednesday",
  "last week tue",
  "aug 15",
  "in 2 days",
  "5/24/2022",
  "in 66 days",
  "8 days ago",
  "in 2 weeks",
  "7th of December",
  "1st of may",
  "2099",
  "mar 2020",
  "last year",
  "last month",
] )( "validateDateString accepts valid dates: %s", ( dateString: string ) => {
  expect( validateDateString( dateString, true ) ).toBe( true );
} );

test( "validateDateString returns message on invalid date", () => {
  expect( validateDateString( "2222222222222", true ) ).toMatch( "Invalid date passed." );
} );

test.each( [
  "mon 3 weeks ago",
  "Thur",
  "moonday",
  "last fortnite",
  "null",
  "is this a date?",
] )( "validateDateString rejects invalid dates: %s", ( dateString: string ) => {
  expect( () => {
    new DateString( dateString );
  } ).toThrow();
} );

test( "DateString happy path", () => {
  expect( () => {
    new DateString( "5/24/2022" );
  } ).not.toThrow();
} );
