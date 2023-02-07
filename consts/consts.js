// 내꺼 정보
// account 209961925
// ppuid 5ea66ff4-e4ec-5787-bbab-bfdbfbfa61f6

// 최근 20경기 가져옴
module.exports.LCU_RECENT_MATCHLIST =
  "/lol-match-history/v1/products/lol/current-summoner/matches";

// 게임 id로 상세정보 조회
module.exports.LCU_MATCH_INFO = (id) => `/lol-match-history/v1/games/${id}`;

// 게임 id로 타임라인 조회
module.exports.LCU_MATCH_TIMELINE = (id) =>
  `/lol-match-history/v1/game-timelines/${id}`;

// 기본정보 조회
module.exports.LCU_USER_STATUS = "/lol-summoner/v1/current-summoner";
