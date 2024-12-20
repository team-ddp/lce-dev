// 내꺼 정보
// account 209961925
// 65900240
// ppuid 5ea66ff4-e4ec-5787-bbab-bfdbfbfa61f6

// 최근 20경기 가져옴
export const LCU_RECENT_MATCHLIST =
  "/lol-match-history/v1/products/lol/current-summoner/matches";

// 게임 id로 상세정보 조회
export const LCU_MATCH_INFO = (gameid: string) =>
  `/lol-match-history/v1/games/${gameid}`;

// 게임 id로 타임라인 조회
export const LCU_MATCH_TIMELINE = (gameid: string) =>
  `/lol-match-history/v1/game-timelines/${gameid}`;

// 기본정보 조회
export const LCU_USER_STATUS = "/lol-summoner/v1/current-summoner";

// 세션 조회
export const LCU_GET_SESSION = "/lol-login/v1/session";

// 현재 랭크 조회
export const LCU_GET_RANK = "/lol-ranked/v1/current-ranked-stats";

// puuid 랭크 조회
export const LCU_GET_RANK_USE_PUUID = (puuid: string) =>
  `/lol-ranked/v1/ranked-stats/${puuid}`;

// 닉네임으로 AccountId 조회
export const LCU_GET_NAME_TO_ACCOUNTID = (name: string) =>
  `/lol-summoner/v1/summoners?name=${name}`;

// 다른플레이어 20경기 조회
export const LCU_SEARCH_MATCHLIST = (puuid: string) =>
  `/lol-match-history/v1/products/lol/${puuid}/matches`;

// Community Dragon
export const RANK_EMBLEM = (tier: string) =>
  `https://raw.communitydragon.org/13.5/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/${tier}.png`;
