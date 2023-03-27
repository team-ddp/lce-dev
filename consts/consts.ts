// 내꺼 정보
// account 209961925
// ppuid 5ea66ff4-e4ec-5787-bbab-bfdbfbfa61f6

// 최근 20경기 가져옴
export const LCU_RECENT_MATCHLIST =
  "/lol-match-history/v1/products/lol/current-summoner/matches";

// 게임 id로 상세정보 조회
export const LCU_MATCH_INFO = (id: string) =>
  `/lol-match-history/v1/games/${id}`;

// 게임 id로 타임라인 조회
export const LCU_MATCH_TIMELINE = (id: string) =>
  `/lol-match-history/v1/game-timelines/${id}`;

// 기본정보 조회
export const LCU_USER_STATUS = "/lol-summoner/v1/current-summoner";

// 세션 조회
export const LCU_GET_SESSION = "/lol-login/v1/session";

// 현재 랭크 조회
export const LCU_GET_RANK = "/lol-ranked/v1/current-ranked-stats";

// Community Dragon
export const RANK_EMBLEM = (tier: string) =>
  `https://raw.communitydragon.org/13.5/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/${tier}.png`;
