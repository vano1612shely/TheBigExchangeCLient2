import { IUser } from "./user.interface";

export interface IAuthFormData extends Pick<IUser, "login"> {
  password: string;
}
