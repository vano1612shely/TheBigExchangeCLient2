import { IAuthFormData } from "../../types/auth.interface";
import { IUser } from "../../types/user.interface";

export interface IAuthResponse {
  user: IUser | null;
  accessToken: string;
}

export interface IGetCodeResponse {
  status: boolean;
}
