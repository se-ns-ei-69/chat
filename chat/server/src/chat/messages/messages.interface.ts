import { UserI } from "src/users/users.interface";

export interface MessageI {
  id: number;
  content: string;
  edited: boolean;
  user: UserI;
  created_at: Date;
  fileName? : string;
  file? : any;
  imageUrl? : string;
  isFile: boolean
}