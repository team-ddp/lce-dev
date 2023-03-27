export interface userInfo_type {
  accountId: number;
  displayName: string;
  internalName: string;
  nameChangeFlag: boolean;
  profileIconId: number;
  puuid: string;
  summonerId: number;
  summonerLevel: number;
  unnamed: boolean;
}
export class userInfo_type_class implements userInfo_type {
  accountId: number;
  displayName: string;
  internalName: string;
  nameChangeFlag: boolean;
  profileIconId: number;
  puuid: string;
  summonerId: number;
  summonerLevel: number;
  unnamed: boolean;

  constructor(data: any) {
    this.accountId = data.accountId;
    this.displayName = data.displayName;
    this.internalName = data.internalName;
    this.nameChangeFlag = data.nameChangeFlag;
    this.profileIconId = data.profileIconId;
    this.puuid = data.puuid;
    this.summonerId = data.summonerId;
    this.summonerLevel = data.summonerLevel;
    this.unnamed = data.unnamed;
  }
}

export const interface_userInfo = {
  accountId: 0,
  displayName: "",
  internalName: "",
  nameChangeFlag: false,
  profileIconId: 0,
  puuid: "",
  summonerId: 0,
  summonerLevel: 0,
  unnamed: false,
};
