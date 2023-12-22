import api from "../api/interceptors";
import { IChain } from "./chain-service.interface";

class ChainService {
  async getAll(): Promise<IChain[]> {
    const res = await api.get("/chain");
    return res.data;
  }
  async getById(id: number): Promise<IChain> {
    const res = await api.get(`/chain/getById?id=${id}`);
    return res.data;
  }
  async getChainsForCurrency(currencyId: number): Promise<IChain[]> {
    const res = await api.get(
      `/chain/getChainsByCurrency?currencyId=${currencyId}`,
    );
    return res.data;
  }
  async create(name: string, currencies: number[] | string[]): Promise<IChain> {
    const res = await api.post("/chain", { name, currencyList: currencies });
    return res.data;
  }
  async update(id: number, name: string): Promise<IChain> {
    const res = await api.patch("/chain", {
      name: name,
      id: id,
    });
    return res.data;
  }
  async delete(id: number): Promise<IChain> {
    const res = await api.delete("/chain", { data: { id: id } });
    return res.data;
  }
  async deleteLink(chainId: number, currencyId: number): Promise<IChain> {
    const res = await api.delete("/chain/deleteLink", {
      data: {
        currencyId: currencyId,
        chainId: chainId,
      },
    });
    return res.data;
  }
  async addLink(chainId: number, currencyId: number): Promise<IChain> {
    const res = await api.post("/chain/addLink", {
      currencyId: currencyId,
      chainId: chainId,
    });
    return res.data;
  }
}

export default new ChainService();
