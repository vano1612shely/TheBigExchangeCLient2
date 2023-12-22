import { ICurrency } from "../currency/currency-service.interface";

export interface IChain {
  id: number;
  name: string;
  currencies: ICurrency[];
}
