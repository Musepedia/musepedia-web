export interface UserDTO{
  id: number,
  nickname: string,
  avatarUrl: string
}

export interface WxLoginParam{
  code: string,
  encryptedData?: string,
  iv?: string,
  nickname?: string,
  avatarUrl?: string
}

export declare function userLogin(data: WxLoginParam): Promise<UserDTO>;

export declare function getUserInfo(): Promise<UserDTO>;
