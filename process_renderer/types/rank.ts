export const rank = {
  queueMap: {
    RANKED_FLEX_SR: {
      division: "NA",
      highestDivision: "NA",
      highestTier: "NONE",
      isProvisional: false,
      leaguePoints: 0,
      losses: 0,
      miniSeriesProgress: "",
      previousSeasonAchievedDivision: "NA",
      previousSeasonAchievedTier: "NONE",
      previousSeasonEndDivision: "NA",
      previousSeasonEndTier: "NONE",
      provisionalGameThreshold: 10,
      provisionalGamesRemaining: 0,
      queueType: "RANKED_FLEX_SR",
      ratedRating: 0,
      ratedTier: "NONE",
      tier: "NONE",
      warnings: null,
      wins: 0,
    },
    RANKED_SOLO_5x5: {
      division: "III",
      highestDivision: "III",
      highestTier: "BRONZE",
      isProvisional: true,
      leaguePoints: 47,
      losses: 0,
      miniSeriesProgress: "",
      previousSeasonAchievedDivision: "IV",
      previousSeasonAchievedTier: "SILVER",
      previousSeasonEndDivision: "IV",
      previousSeasonEndTier: "SILVER",
      provisionalGameThreshold: 10,
      provisionalGamesRemaining: 7,
      queueType: "RANKED_SOLO_5x5",
      ratedRating: 0,
      ratedTier: "NONE",
      tier: "BRONZE",
      warnings: null,
      wins: 3,
    },
  },
};

export interface rank_type {
  division: string;
  highestDivision: string;
  highestTier: string;
  isProvisional: boolean;
  leaguePoints: number;
  losses: number;
  miniSeriesProgress: string;
  previousSeasonAchievedDivision: string;
  previousSeasonAchievedTier: string;
  previousSeasonEndDivision: string;
  previousSeasonEndTier: string;
  provisionalGameThreshold: number;
  provisionalGamesRemaining: number;
  queueType: number;
  ratedRating: number;
  ratedTier: string;
  tier: string;
  warnings: boolean;
  wins: number;
}
export const rank_interface = {
  division: "",
  highestDivision: "",
  highestTier: "",
  isProvisional: false,
  leaguePoints: 0,
  losses: 0,
  miniSeriesProgress: "",
  previousSeasonAchievedDivision: "",
  previousSeasonAchievedTier: "",
  previousSeasonEndDivision: "",
  previousSeasonEndTier: "",
  provisionalGameThreshold: 0,
  provisionalGamesRemaining: 0,
  queueType: 0,
  ratedRating: 0,
  ratedTier: "",
  tier: "",
  warnings: false,
  wins: 0,
};

export class Rank_Class implements rank_type {
  division: string;
  highestDivision: string;
  highestTier: string;
  isProvisional: boolean;
  leaguePoints: number;
  losses: number;
  miniSeriesProgress: string;
  previousSeasonAchievedDivision: string;
  previousSeasonAchievedTier: string;
  previousSeasonEndDivision: string;
  previousSeasonEndTier: string;
  provisionalGameThreshold: number;
  provisionalGamesRemaining: number;
  queueType: number;
  ratedRating: number;
  ratedTier: string;
  tier: string;
  warnings: boolean;
  wins: number;

  constructor(data: any) {
    this.division = data.division;
    this.highestDivision = data.highestDivision;
    this.highestTier = data.highestTier;
    this.isProvisional = data.isProvisional;
    this.leaguePoints = data.leaguePoints;
    this.losses = data.losses;
    this.miniSeriesProgress = data.miniSeriesProgress;
    this.previousSeasonAchievedDivision = data.previousSeasonAchievedDivision;
    this.previousSeasonAchievedTier = data.previousSeasonAchievedTier;
    this.previousSeasonAchievedDivision = data.previousSeasonEndDivision;
    this.previousSeasonEndTier = data.previousSeasonEndTier;
    this.provisionalGameThreshold = data.provisionalGameThreshold;
    this.provisionalGamesRemaining = data.provisionalGamesRemaining;
    this.queueType = data.queueType;
    this.ratedRating = data.ratedRating;
    this.ratedTier = data.ratedTier;
    this.tier = data.tier;
    this.warnings = data.warnings;
    this.wins = data.wins;
  }
}
