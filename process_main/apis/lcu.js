const {
  authenticate,
  createHttpSession,
  createHttp2Request,
  LeagueClient,
  LeagueWebSocket,
} = require("league-connect");

const {
  LCU_USER_STATUS,
  LCU_MATCH_INFO,
  LCU_RECENT_MATHLIST,
  LCU_MATCH_TIMELINE,
} = require("./consts.js");

const time = 3000;
let check = false;

module.exports = class LCU {
  constructor(credentials) {
    console.log("생성중...");
    this.lolClientConnection = new LeagueClient(credentials);
    this.lolClientCredentials = credentials;
    // console.log(credentials);
    this.lolClientConnection.start();
    check = true;
    this.lolClientConnection.on("connect", (newCredentilas) => {
      this.lolClientConnection = new LeagueClient(newCredentilas);
      this.lolClientConnection = newCredentilas;
      this.getUser();
      console.log("allow");
    });

    console.log("클라 접속");
    this.lolClientConnection.on("disconnect", () => {
      check = false;
      console.log("not sign");
      this.lolClientConnection.stop();
      console.log(check);
    });
    console.log(check);
    // this.setUser();
    // console.log("유저 기본정보");
  }

  async LCURequest(httpMethod, endPoint) {
    console.log("http 요청");
    const session = await createHttpSession(this.lolClientCredentials);
    console.log("요청2");
    const result = await createHttp2Request(
      {
        method: httpMethod,
        url: endPoint,
      },
      session,
      this.lolClientCredentials
    );
    session.close();
    const data = await result.json();
    if ("errorCode" in data) {
      console.log("error");
      console.log(data);
      throw new Error("LCU-Request-Rejected");
    } else {
      return data;
    }
  }

  async getUser() {
    console.log("getUser");
    return new Promise((resolve, reject) => {
      this.LCURequest("GET", LCU_USER_STATUS)
        .then((result) => {
          console.log(result);
          this.setWebSocket(this.lolClientCredentials);
        })
        .catch(() => {
          setTimeout(() => {
            this.setUser().then(resolve).catch(reject);
          }, time);
        });
    });
  }

  async getMatchList() {
    console.log("searchMatch");
    return new Promise((resolve, reject) => {
      this.LCURequest("GET", LCU_RECENT_MATHLIST).then((result) => {
        console.log(result);
        this.setWebSocket(this.lolClientCredentials);
      });
    });
  }
};
