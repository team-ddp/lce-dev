// const {
//   authenticate,
//   createHttpSession,
//   createHttp2Request,
//   LeagueClient,
//   LeagueWebSocket,
//   request,
// } = require("league-connect");

// const {
//   LCU_USER_STATUS,
//   LCU_MATCH_INFO,
//   LCU_RECENT_MATCHLIST,
//   LCU_MATCH_TIMELINE,
//   LCU_GET_SESSION,
//   LCU_GET_RANK
// } = require("./consts.js");

import {
  authenticate,
  createHttpSession,
  createHttp2Request,
  createHttp1Request,
  LeagueClient,
  createWebSocketConnection,
  Credentials,
} from "league-connect";

import {
  LCU_USER_STATUS,
  LCU_MATCH_INFO,
  LCU_RECENT_MATCHLIST,
  LCU_MATCH_TIMELINE,
  LCU_GET_SESSION,
  LCU_GET_RANK,
  LCU_GET_NAME_TO_ACCOUNTID,
  LCU_SEARCH_MATCHLIST,
} from "../../consts/consts";

import { store } from "../../process_renderer/store/store";
import {
  setDefaultInfo,
  setRankInfo,
  setStatus,
} from "../../process_renderer/store/user";
import { RootState } from "../../process_renderer/store";

const time = 5000;

export default class LCU {
  lolClientConnection: LeagueClient;
  lolClientCredentials: Credentials;
  user: any;
  state: Boolean;
  // store: Store;

  constructor(credentials: Credentials, connectClient: () => void) {
    return (async (): Promise<any> => {
      console.log("생성중...");
      this.state = true;
      this.lolClientConnection = new LeagueClient(credentials);
      this.lolClientCredentials = credentials;
      this.lolClientConnection.on("connect", (newCredentilas) => {
        this.lolClientConnection = new LeagueClient(newCredentilas);
        this.lolClientCredentials = newCredentilas;
        this.user = this.firstConnect();
        console.log("asgasegasegasegasegaesgasegasegesgas");
      });
      console.log("클라 접속");
      this.lolClientConnection.on("disconnect", () => {
        this.state = false;
        console.log("not sign");
        connectClient();
        // this.lolClientConnection.stop();
      });
      this.user = await this.firstConnect();
      this.lolClientConnection.start();
      console.log("유저 기본정보");
      return this;
    })() as unknown as any;
  }

  // async init(credentials: Credentials, connectClient: () => void) {
  //   console.log("생성중...");
  //   this.lolClientConnection = new LeagueClient(credentials);
  //   this.lolClientCredentials = credentials;
  //   this.user;
  //   this.lolClientConnection.on("connect", (newCredentilas) => {
  //     this.lolClientConnection = new LeagueClient(newCredentilas);
  //     this.lolClientCredentials = newCredentilas;
  //     this.getUser();
  //     console.log("allow");
  //   });

  //   console.log("클라 접속");
  //   this.lolClientConnection.on("disconnect", () => {
  //     console.log("not sign");
  //     connectClient();
  //     // this.getState();
  //     this.lolClientConnection.stop();
  //   });
  //   this.lolClientConnection.start();
  //   this.user = await this.firstConnect();
  //   console.log("유저 기본정보");
  //   // this.getState();
  //   return this;
  // }
  async firstConnect() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("first");
        this.getUser().then(resolve).catch(reject);
      }, 5000);
    });
  }
  async LCURequest(httpMethod: any, endPoint: any) {
    console.log("http1 요청");
    console.log(endPoint);
    const creedntils = await authenticate();
    console.log("요청2");
    const result = await createHttp1Request(
      {
        method: httpMethod,
        url: endPoint,
      },
      creedntils
    );
    console.log("session close");

    const data = await result.json();
    if ("errorCode" in data) {
      console.log("error");
      // console.log(data);
      throw new Error("LCU-Request-Rejected " + endPoint);
    } else {
      return data;
    }
  }

  async getUser() {
    console.log("getUser");
    return new Promise((resolve, reject) => {
      this.LCURequest("GET", LCU_USER_STATUS)
        .then((result: any) => {
          console.log(result);
          store.dispatch(setDefaultInfo(result));
          console.log(store.getState());
          console.log("asdfsadfdf");
          resolve(result);
        })
        .catch(() => {
          if (this.state) {
            setTimeout(() => {
              console.log("loop...");
              this.getUser().then(resolve).catch(reject);
            }, time);
          }
        });
    });
  }

  async getMatchList() {
    console.log("getMatchList");
    return new Promise((resolve, reject) => {
      this.LCURequest("GET", LCU_RECENT_MATCHLIST)
        .then((result) => {
          // console.log(result);
          resolve(result);
          // this.setWebSocket(this.lolClientCredentials);
        })
        .catch(reject);
    });
  }
  async getRank() {
    console.log("getRank");
    return new Promise((resolve, reject) => {
      this.LCURequest("GET", LCU_GET_RANK)
        .then((result) => {
          // console.log(result);
          resolve(result);
          // this.setWebSocket(this.lolClientCredentials);
        })
        .catch(reject);
    });
  }

  async getMatchInfo(id: string) {
    console.log("getMatchInfo");
    const url = LCU_MATCH_INFO(id);
    console.log(url);
    return new Promise((resolve, reject) => {
      this.LCURequest("GET", url)
        .then((result) => {
          // console.log(result);
          resolve(result);
          // this.setWebSocket(this.lolClientCredentials);
        })
        .catch(reject);
    });
  }
  async searchMatchList(puuid: string) {
    console.log("searchMatchList");
    const url = LCU_SEARCH_MATCHLIST(puuid);
    console.log(url);
    return new Promise((resolve, reject) => {
      this.LCURequest("GET", url)
        .then((result) => {
          // console.log(result);
          resolve(result);
        })
        .catch(reject);
    });
  }
  async getUserNameToAccountid(name: string) {
    console.log("getUserNameToAccountid");
    const url = LCU_GET_NAME_TO_ACCOUNTID(name);
    console.log(url);
    return new Promise((resolve, reject) => {
      this.LCURequest("GET", url)
        .then((result) => {
          // console.log(result);
          resolve(result);
        })
        .catch(reject);
    });
  }
}

//  http2 METHOD
// async LCURequest(httpMethod: any, endPoint: any) {
//   console.log("http 요청");
//   const session = await createHttpSession(this.lolClientCredentials);
//   console.log("요청2");
//   const result = await createHttp2Request(
//     {
//       method: httpMethod,
//       url: endPoint,
//     },
//     session,
//     this.lolClientCredentials
//   );
//   session.close();
//   console.log("session close");

//   const data = await result.json();
//   if ("errorCode" in data) {
//     console.log("error");
//     console.log(data);
//     throw new Error("LCU-Request-Rejected");
//   } else {
//     return data;
//   }
// }
