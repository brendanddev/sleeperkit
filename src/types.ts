export const NFL_TEAMS = [
    "ARI",
    "ATL",
    "BAL",
    "BUF",
    "CAR",
    "CHI",
    "CIN",
    "CLE",
    "DAL",
    "DEN",
    "DET",
    "GB",
    "HOU",
    "IND",
    "JAX",
    "KC",
    "LV",
    "LAC",
    "LAR",
    "MIA",
    "MIN",
    "NE",
    "NO",
    "NYG",
    "NYJ",
    "PHI",
    "PIT",
    "SF",
    "SEA",
    "TB",
    "TEN",
    "WAS"
];

// A single abbreviated NFL team.
export type NflTeam = typeof NFL_TEAMS[number];

export interface NflState {
    week: number;
    season_type: string;
    season: string;
    leg: number;
    league_season: string;
    previous_season: string;
    season_start_date: string;
    display_week: number;
    league_create_season: string;
    season_has_scores: boolean;
}

export interface League {
    league_id: string;
    name: string;
    status: string;
    avatar: string | null;
    shard: number;
    season: string;
    season_type: string;
    sport: string;
    total_rosters: number;
}

// Name from API. Single roster stats.
export interface RosterSettings {
    wins: number;
    losses: number;
    ties: number;
    fpts: number;
    fpts_against: number;
    fpts_against_decimal: number;
    fpts_decimal: number;
    ppts: number;
    ppts_decimal: number;
    total_moves: number;
    waiver_budget_used: number;
    waiver_position: number;
}

export interface Roster {
    league_id: string;
    owner_id: string;
    roster_id: number;
    players: string[];
    starters: string[];
    reserve: string | null;
    settings: RosterSettings;
}

export interface User {
    league_id: string;
    user_id: string;
    avatar: string | null;
    display_name: string;
}

export interface Player {
    player_id: string;
}
