import api from "../api/interceptors";
import { removeTokenFromStorage, saveTokenToStorage } from "./auth.helper";

class AuthService {
  async login(login: string, password: string) {
    const res = await api.post("/auth/login", {
      login,
      password,
    });
    if (res.data) {
      saveTokenToStorage(res.data.access_token);
      return res.data;
    } else return null;
  }
  async logout() {
    removeTokenFromStorage();
  }
}

export default new AuthService();
