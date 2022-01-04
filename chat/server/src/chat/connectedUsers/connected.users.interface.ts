import { UserI } from "src/users/users.interface";

export interface ConnectedUserI {
  id?: number;
  socketId: string;
  user: UserI;
}