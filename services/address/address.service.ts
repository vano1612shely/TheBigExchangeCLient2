import api from "../api/interceptors";
import { IAddressResponse } from "./address-service.interface";
class AddressService {
  async getAllData(): Promise<IAddressResponse[] | null> {
    const res = await api.get("/address");
    if (res.data) {
      return res.data;
    } else return null;
  }
  async create(data: any): Promise<IAddressResponse | null> {
    const res = await api.post("/address", data);
    if (res.data) {
      return res.data;
    }
    return null;
  }
  async delete(id: number): Promise<IAddressResponse | null> {
    const res = await api.delete("/address", { data: { id } });
    if (res.data) {
      return res.data;
    }
    return null;
  }
  async getRegions() {
    const res = await api.get("/address/getRegions");
    if (res.data) {
      return res.data;
    }
    return null;
  }
}

export default new AddressService();
