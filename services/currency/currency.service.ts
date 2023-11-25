import api from "../api/interceptors";
import { ICreateCurrency, ICurrency } from "./currency-service.interface";

class CurrencyService {
  async getAll(): Promise<ICurrency[]> {
    const res = await api.get("/currency");
    return res.data;
  }
  async getCrypto(): Promise<ICurrency[]> {
    const res = await api.get("/currency/crypto");
    return res.data;
  }
  async getFiat(): Promise<ICurrency[]> {
    const res = await api.get("/currency/fiat");
    return res.data;
  }
  async create(data: ICreateCurrency, file: File | null): Promise<ICurrency> {
    const bodyFormData = new FormData();
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        bodyFormData.append(key, (data as any)[key]);
      }
    }
    if (file) {
      bodyFormData.append("image", file);
    }
    const res = await api.post("/currency", bodyFormData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  }
  async delete(id: number): Promise<ICurrency> {
    const res = await api.delete("/currency", {
      data: {
        id,
      },
    });
    return res.data;
  }
}

export default new CurrencyService();
