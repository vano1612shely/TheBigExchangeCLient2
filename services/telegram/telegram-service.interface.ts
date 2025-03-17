import { ICurrency } from "../currency/currency-service.interface";

export interface ITelegramSendMessageRequest {
  getType: {
    value: string
    label: string
  };
  giveType: {
    value: string
    label: string
  }
  transactionType?: string;
  transactionFrom?: string;
  transactionTo?: string;
  city?: string;
  city_id?: number;
  getCurrency: ICurrency | null;
  giveCurrency: ICurrency | null;
  getSum: number;
  giveSum: number;
  name: string;
  phone?: string;
  telegram: string;
  email?: string;
  exchange: number;
  wallet?: string;
  from?: string;
  bank?: string;
  chain?: string;
}
