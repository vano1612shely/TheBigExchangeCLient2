import api from "../api/interceptors";
import { ITelegramSendMessageRequest } from "./telegram-service.interface";
class TelegramService {
  async sendData(data: ITelegramSendMessageRequest): Promise<boolean | null> {
    const sData = { ...data };
    sData.from = "site";
    const res = await api.post("/sendMessage", sData);
    if (res.data) {
      return res.data;
    } else return false;
  }
  async getRequest(id: string) {
    const res = await api.get(`/client/requestForCustomer/${id}`);
    return res.data
  }
}

export default new TelegramService();
