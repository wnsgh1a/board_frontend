export interface UserSignUpRequest {
  email: string;
  password: string;
  nickname: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}
