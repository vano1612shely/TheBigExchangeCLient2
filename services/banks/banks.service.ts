import api from "../api/interceptors";
import { IBank, ICreateBank } from "./banks-service.interface";

class CurrencyService {
  async getAll(): Promise<IBank[]> {
    const res = await api.get("/banks");
    return res.data;
  }
  async create(data: ICreateBank, file: File | null): Promise<IBank> {
    const bodyFormData = new FormData();
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        bodyFormData.append(key, (data as any)[key]);
      }
    }
    if (file) {
      bodyFormData.append("image", file);
    }
    const res = await api.post("/banks", bodyFormData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  }
  async delete(id: number): Promise<IBank> {
    const res = await api.delete("/banks", {
      data: {
        id,
      },
    });
    return res.data;
  }
}

export default new CurrencyService();
