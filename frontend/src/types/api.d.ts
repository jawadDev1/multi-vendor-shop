export interface IAPIUser {
  name: string;
  email: string;
  profile: string;
  verified?: boolean;
}

export interface IAPIResponse {
  success: boolean;
  message: string;
}

export interface IAPIUserResponse extends IAPIResponse {
  data: IAPIUser
}
