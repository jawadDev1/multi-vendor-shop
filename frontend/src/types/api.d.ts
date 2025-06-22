enum Role {
  SELLER = "SELLER",
  USER = "USER",
}

export interface IAPIUser {
  name: string;
  email: string;
  profile: string;
  verified?: boolean;
  role?: Role;
}

export interface IAPIResponse {
  success: boolean;
  message: string;
}

export interface IAPIUserResponse extends IAPIResponse {
  data: IAPIUser;
}
