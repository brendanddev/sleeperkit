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

export type NflTeam = typeof NFL_TEAMS[number];

// Current NFL week and season.
export interface NflState {
    week: number;
    display_week: number;
    leg: number;
    season: string;
    season_type: string;
}

// Which part of the NFL season a stats or projections request covers.
export type SeasonType = "regular" | "post" | "pre";

// League settings and metadata.
export interface League {
    league_id: string;
    name: string;
    status: string;
    season: string;
    sport: string;
    total_rosters: number;
}

// One teams roster.
export interface Roster {
    league_id: string;
    owner_id: string;
    roster_id: number;
    players: string[];
    starters: string[];
    reserve: string[] | null;
    settings: RosterSettings;
}

// A league member.
export interface User {
    user_id: string;
    username: string;
    display_name: string;
}

// One player from the full dump.
export interface Player {
    player_id: string;
    full_name: string;
    team: string;
    position: string | null;
    fantasy_positions: string[] | null;
    depth_chart_order: number;
    injury_status: string | null;
    status: string | null;
}

// One row from the trending adds/drops list. No name or position, just the ID.
export interface TrendingEntry {
    player_id: string;
    count: number;
}

// One teams depth chart. Keys are position codes (QB, RB, WR1, LCB),
// values are player IDs ordered starter first.
export type DepthChart = Record<string, string[]>;

// A stat or projection bag. Keys vary by player, position and week,
// so no fixed interface is possible.
export type Stats = Record<string, number>;

// One games stats or projections for one player. Same shape for both,
// category says which.
export interface PlayerWeekEntry {
    player_id: string;
    week: number | null;
    season: string;
    team: string;
    opponent: string | null;
    game_id: string;
    date: string;
    category: "stat" | "proj";
    stats: Stats;
}

// Returned when grouping=week. Keys are week numbers; null = bye or missed game.
export type WeeklyEntries = Record<string, PlayerWeekEntry | null>;

// Roster slots Sleeper reports in fantasy_positions.
// The array is for iterating and runtime checks, the type is derived from it
// so the two cannot drift apart.
export const FANTASY_POSITIONS = ["QB", "RB", "WR", "TE", "K", "DEF"] as const;
export type FantasyPosition = typeof FANTASY_POSITIONS[number];

// Describes the settings type nested in each roster.
export interface RosterSettings {
    fpts: number;
    fpts_against: number;
    fpts_against_decimal: number;
    fpts_decimal: number;
    losses: number;
    ppts: number;
    ppts_decimal: number;
    ties: number;
    wins: number;
}

// Describes one teams side of a weekly matchup. Two entries share a matchup_id.
// null means that roster isnt playing. 
export interface MatchupEntry {
    matchup_id: number | null;
    roster_id: number;
    points: number;
    players: string[];
    starters: string[];
    players_points: Record<string, number>;
}

// The player summary nested inside a weekly leader entry.
// No player_id, thats on the entry itself.
export interface EmbeddedPlayer {
    first_name: string;
    last_name: string;
    position: string;
    team: string;
    fantasy_positions: string[];
    injury_status: string | null;
}

// One players week from the bulk stats endpoint, ranked by pts_ppr.
export interface WeeklyLeaderEntry {
    player_id: string;
    week: number;
    season: string;
    team: string;
    opponent: string | null;
    game_id: string;
    date: string;
    stats: Stats;
    player: EmbeddedPlayer;
}
