import api from "../api/interceptors";
import { ITelegramSendMessageRequest } from "./telegram-service.interface";
class TelegramService {
  async sendData(data: ITelegramSendMessageRequest): Promise<boolean | null> {
    const sData = { ...data };
    sData.from = "site";
    console.log(sData);
    const res = await api.post("/sendMessage", sData);
    if (res.data) {
      return res.data;
    } else return false;
  }
}

export default new TelegramService();
