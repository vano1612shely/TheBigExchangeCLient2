import axios from "axios";
import api, { URL } from "../api/interceptors";
import { IDataResponse, IDataResponseForAdmin } from "./info-service.interface";
class InfoService {
  async getAllData(): Promise<IDataResponse | null> {
    const res = await api.get("/info/getAll");
    if (res.data) {
      return res.data;
    } else return null;
  }
  async getAllDataForAdmin(): Promise<IDataResponseForAdmin | null> {
    const res = await api.get("/info/getAllForAdmin");
    if (res.data) {
      return res.data;
    } else return null;
  }
  async updateData(data: any): Promise<IDataResponse | null> {
    const res = await api.patch("/info/updateAll", { data });
    if (res.data) {
      return res.data;
    }
    return null;
  }
}

export default new InfoService();
