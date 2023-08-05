import { Pot } from ".";

export interface Transaction {
  name: string;
  date: Date;
  amount: number;
  pot: Pot;
}
