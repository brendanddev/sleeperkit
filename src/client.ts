import type { League, NflState, Roster, User } from "./types.js";

const SLEEPER_API = "https://api.sleeper.app/v1";

export interface SleeperClientOptions {
    // Base URL for the documented API. Rarely needs changing.
    baseUrl?: string;
    // Directory the player cache is written to, unused.
    cacheDir?: string;
}

export interface SleeperClientOptions {
    // Base URL for the documented API. Rarely needs changing.
    baseUrl?: string;
    // Directory the player cache is written to. Relative paths resolve
    // against the process working directory.
    cacheDir?: string;
}

export class SleeperClient {
    private baseUrl: string;

    public constructor(options: SleeperClientOptions = {}) {
        this.baseUrl = options.baseUrl ?? SLEEPER_API;
    }

    public async get<T>(endpoint: string, base: string = this.baseUrl): Promise<T> {
        const response = await fetch(`${base}/${endpoint}`);
        if (!response.ok) {
            throw new Error(`An error occurred, status code: ${response.status}`);
        }
        return response.json();
    }

    public async getNflState(): Promise<NflState> {
        return this.get<NflState>('state/nfl');
    }

    public async getLeague(leagueId: string): Promise<League | undefined> {
        return this.get<League>(`/league/${leagueId}`);
    }

    public async getRosters(leagueId: string): Promise<Roster[]> {
        return this.get<Roster[]>(`/league/${leagueId}/rosters`);
    }

    public async getUsers(leagueId: string): Promise<User[]> {
        return this.get<User[]>(`league/${leagueId}/users`);
    }




}