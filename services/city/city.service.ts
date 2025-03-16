import api from "../api/interceptors";
import { ICity, ICityByCountry } from "./city-service.interface";

class CityService {
  async getList(): Promise<ICityByCountry> {
    const res = await api.get("/city");
    return res.data;
  }
  async getListWithoutFormat(): Promise<ICity[]> {
    const res = await api.get("/city/withoutFormat");
    return res.data;
  }
  async addCity(city: string, country: string, percent?: number): Promise<ICity> {
    const res = await api.post("/city", {
      city,
      country,
      percent
    });
    return res.data;
  }
  async deleteCity(id: number): Promise<ICity> {
    const res = await api.delete("/city", {
      data: {
        id,
      },
    });
    return res.data;
  }
}

export default new CityService();
