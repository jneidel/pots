import inquirer from "inquirer";
import * as askFor from "../../src/util/questions";

jest.mock( "inquirer" );

test( "selectFromList with 0 choices", async () => {
  const choices = [];

  askFor.selectFromList( { message: "test", choices } )
    .then( () => expect( true ).toBe( false ) )
    .catch( err => expect( err.message ).toMatch( "None to choose from" ) );
} );

test( "selectFromList with 0 choices with noun", async () => {
  const choices = [];
  const noun = "apple_tree_123";

  askFor.selectFromList( { message: "test", choices, noun } )
    .then( () => expect( true ).toBe( false ) )
    .catch( err => {
      expect( err.message ).toMatch( `No ${noun}` );
      expect( err.message ).toMatch( `${noun} add` );
    } );
} );

test( "selectFromList with 1 choice", async () => {
  const choices = [ {
    name : "test",
    value: "test",
  } ];

  askFor.selectFromList( { message: "test", choices } )
    .then( res => expect( res ).toBe( choices[0].value ) );
} );

test.concurrent( "selectFromList with 2 choices", async () => {
  const choices = [
    {
      name : "test0",
      value: "test0",
    }, {
      name : "test1",
      value: "test1",
    },
  ];
  const result = choices[0].value;

  ( inquirer.prompt as unknown as jest.Mock ).mockResolvedValue( {
    select: result,
  } );

  askFor.selectFromList( { message: "test", choices } )
    .then( res => expect( res ).toBe( result ) );
} );

test.concurrent( "text with trimmable whitespace", async () => {
  const input = "   ee  ";
  const result = "ee";

  ( inquirer.prompt as unknown as jest.Mock ).mockResolvedValue( {
    text: input,
  } );

  askFor.text( "test" )
    .then( res => expect( res ).toBe( result ) );
} );

test.concurrent( "number parses float", async () => {
  const input = "1.9900";
  const result = 1.99;

  ( inquirer.prompt as unknown as jest.Mock ).mockResolvedValue( {
    n: input,
  } );

  askFor.number( "test" )
    .then( res => expect( res ).toBe( result ) );
} );
