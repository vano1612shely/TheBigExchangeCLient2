import { IBank } from "../banks/banks-service.interface";
import { ICurrency } from "../currency/currency-service.interface";

export interface ITelegramSendMessageRequest {
  type: string;
  transactionType?: string;
  transactionFrom?: string;
  transactionTo?: string;
  city?: string;
  getCurrency: ICurrency | null;
  giveCurrency: ICurrency | null;
  getSum: number;
  giveSum: number;
  name: string;
  phone?: string;
  telegram: string;
  email?: string;
  exchange: number;
  walletType?: string;
  wallet?: string;
}
