import { JwtPayload } from "jsonwebtoken";

export interface IActivationToken extends JwtPayload {
  id: string;
  email: string;
}

