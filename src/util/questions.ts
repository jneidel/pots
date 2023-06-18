import inquirer from "inquirer";
import { validateDateString } from "./date";

type Choices<T> = Array<{
  name: string;
  value: T;
}>;

function handleOneOrZeroChoices<T>( data: { choices: Choices<T>; noun?: string } ): T|null {
  const { choices, noun } = data;

  if ( choices.length === 0 ) {
    const genericErrorMessage = "None to choose from. To create some use: NOUN add";
    const specificErrorMessage = `No ${noun}s found. To create some use: ${noun} add`;
    throw new Error( noun ? specificErrorMessage : genericErrorMessage );
  } else if ( choices.length === 1 ) {
    const [ choice ] = choices;

    if ( typeof choice === "string" ) {
      console.log( `Using ${choice}` );
      return choice;
    } else {
      console.log( `Using ${choice.name}` );
      return choice.value;
    }
  } else { // multiple
    return null;
  }
}

export async function dayOfTheWeek( choices: Choices<string> ): Promise<string> {
  const choice: string|null = handleOneOrZeroChoices( { choices } );

  if ( choice !== null ) return new Promise( ( resolve ) => resolve( choice ) ); else
    return inquirer.prompt( [ {
      type   : "list",
      name   : "dotw",
      message: "What day of the week?",
      choices,
    } ] ).then( ans => ans.dotw );

}

export async function number( message: string, defaultVal?: number ): Promise<number> {
  return inquirer.prompt( [ {
    type   : "string",
    name   : "n",
    message,
    default: defaultVal,
    validate( input ) {
      const valid = !isNaN( parseFloat( input ) );
      return valid || "Please enter a number";
    },
  } ] ).then( ans => parseFloat( ans.n ) );
}

export async function renaming( defaultVal: string,  message = "Please open your editor to rename" ): Promise<string> {
  return inquirer.prompt( [ {
    type   : "editor",
    name   : "updated",
    message,
    default: defaultVal,
  } ] ).then( ans => ans.updated.trim() );
}

export async function selectFromList<T>( data: { message: string; choices: Choices<T>; noun?: string } ): Promise<T> {
  const { message, choices, noun } = data;

  const choice = handleOneOrZeroChoices<T>( { choices, noun } );
  if ( choice !== null )
    return choice;

  return inquirer.prompt( [ {
    type: "list",
    name: "select",
    message,
    choices,
  } ] ).then( ans => ans.select );
}

export async function text( message: string ): Promise<string> {
  return inquirer.prompt( [ {
    type    : "input",
    name    : "text",
    validate: input => !!input || "Can't be empty",
    message,
  } ] ).then( ans => ans.text.trim() );
}

export async function date( defaultVal = "today" ): Promise<string> {
  return inquirer.prompt( [ {
    type    : "input",
    name    : "date",
    message : "What date?",
    default : defaultVal,
    validate: input => validateDateString( input, true ),
  } ] ).then( ans => ans.date );
}

export async function confirmation( data: { message: string; default: boolean } ): Promise<boolean> {
  return inquirer.prompt( [ {
    type   : "confirm",
    name   : "confirmation",
    message: data.message,
    default: data.default,
  } ] ).then( ans => ans.confirmation );
}

export const renamingHelpText = ( wording ) => `It will ask you to ${wording} in your $EDITOR (in your case: ${process.env.EDITOR}).`;
