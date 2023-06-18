import Realm from "realm";
import * as models from "./models";
import * as types from "./models/types";

type DbOptions = {
  keepOpen: boolean;
}
const defaultDbOptions: DbOptions = {
  keepOpen: false,
};
const defaultFindAllOptions: DbOptions = Object.assign( defaultDbOptions, {
  keepOpen: true,
} );

class Database {
  private _database: any = undefined;
  private get database(): Realm {
    if ( !this._database )
      this.open();
    return this._database;
  }

  private open() {
    this._database = new Realm( {
      schema: Object.values( models ),
    } );
  }
  public close() {
    this.database.close();
  }

  private create( model: string, values: Object, options: DbOptions ) {
    this.database.write( () => {
      this.database.create( model, values );
    } );

    if ( !options.keepOpen )
      this.database.close();
  }

  private findById( model: string, id: any, options: DbOptions ) {
    const object: any = this.database.objectForPrimaryKey( model, id );

    if ( !options.keepOpen )
      this.database.close();

    return object;
  }

  private findAll( model: string, options: DbOptions ) {
    const objectArr: any[] = [ ...this.database.objects( model ) ];

    if ( !options.keepOpen )
      this.database.close();

    return objectArr;
  }

  private generateSpecificFunctionsFor<T extends Object>( model: string ) {
    return {
      create: ( values: T, options: DbOptions = defaultDbOptions ) => {
        return this.create( model, values, options );
      },
      findById: ( id: any, options: DbOptions = defaultFindAllOptions ): T => {
        return this.findById( model, id, options );
      },
      findAll: ( options: DbOptions = defaultDbOptions ): T[] => {
        return this.findAll( model, options );
      },
    };
  }

  public Pot = this.generateSpecificFunctionsFor<types.Pot>( "Pot" );
  public Transaction = this.generateSpecificFunctionsFor<types.Transaction>( "Transaction" );
}

const databaseIntance = new Database();
export default databaseIntance;
