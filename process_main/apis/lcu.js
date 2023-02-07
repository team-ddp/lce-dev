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

module.exports = class LCU {
  constructor(credentials) {
    this.lolClientConnection = new LeagueClient(credentials);
    this.lolClientCredentials = credentials;
    console.log(credentials);
    this.lolClientConnection.on("connect", (newCredentilas) => {
      this.lolClientConnection = new LeagueClient(newCredentilas);
      this.lolClientConnection = newCredentilas;
      this.setUser();
      console.log("allow");
    });

    this.lolClientConnection.on("disconnect", () => {
      console.log("not sign");
      this.lolClientConnection.stop();
    });
    this.lolClientConnection.start();
    this.setUser();
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

  async setUser() {
    console.log("setUser");
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
