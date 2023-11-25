import { IAuthResponse } from "../../services/auth/auth-service.interface";

export interface IAuthInitialState extends Omit<IAuthResponse, "accessToken"> {
  isLoading: boolean;
}
