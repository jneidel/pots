import { Pot } from ".";

export type Transaction = {
  name: string;
  date: Date;
  amount: Number;
  pot: Pot;
}
