import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAuthResponse } from "../../services/auth/auth-service.interface";
import { IAuthFormData } from "../../types/auth.interface";
import authService from "@/services/auth/auth.service";

export const login = createAsyncThunk<IAuthResponse, IAuthFormData>(
  "auth/login",
  async ({ login, password }, thunkAPI) => {
    try {
      const response = await authService.login(login, password);
      if (!response) {
        throw new Error();
      }
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
  return {};
});
