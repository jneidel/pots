import Realm from "realm";

export const Transaction = {
  name      : "Transaction",
  properties: {
    _id   : { type: "objectId", default: () => new Realm.BSON.ObjectId() },
    name  : "string",
    date  : "date",
    amount: "float",
    pot   : "Pot?",
  },
};
