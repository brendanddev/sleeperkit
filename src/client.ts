import { dirname, join } from "node:path";
import { mkdir, stat, writeFile, readFile } from "node:fs/promises";
import type { League, NflState, Player, Roster, User } from "./types.js";

const PLAYERS_CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000;
const SLEEPER_API = "https://api.sleeper.app/v1";

export interface SleeperClientOptions {
    // Base URL for the documented API. Rarely needs changing.
    baseUrl?: string;
    // Directory the player cache is written to.
    cacheDir?: string;
}

export class SleeperClient {
    private baseUrl: string;
    private playersFile: string;
    private playerCache: Record<string, Player> | null = null;

    public constructor(options: SleeperClientOptions = {}) {
        this.baseUrl = options.baseUrl ?? SLEEPER_API;
        this.playersFile = join(options.cacheDir ?? "data", "players.json");
    }

    public async get<T>(endpoint: string, base: string = this.baseUrl): Promise<T> {
        const response = await fetch(`${base}/${endpoint}`);
        if (!response.ok) {
            throw new Error(`An error occurred, status code: ${response.status}`);
        }
        return response.json();
    }

    // Checks if the given player cache file is stale.
    private async isCacheStale(): Promise<boolean> {
        try {
            const cacheFileStats = await stat(this.playersFile);
            const lastModified = cacheFileStats.mtimeMs;
            if ((Date.now() - lastModified) > PLAYERS_CACHE_MAX_AGE_MS) {
                return true;
            }
            return false;
        } catch (err) {
            return true;
        }
    }

    // Requests full dump of NFL players, writes to the local storage file,
    // populates the object in memory, and returns it.
    private async refreshPlayerCache(): Promise<Record<string, Player>> {
        const players = await this.get<Record<string, Player>>(`players/nfl`);
        const playerData = JSON.stringify(players);
        await mkdir(dirname(this.playersFile), { recursive: true });
        await writeFile(this.playersFile, playerData);
        
        this.playerCache = players;
        return players;
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

    // Returns the full player map from the cheapest source available.
    // First check in memory, then file on disk, the network.
    public async getPlayers(forceRefresh = false): Promise<Record<string, Player>> {
        if (forceRefresh) return await this.refreshPlayerCache();
        if (this.playerCache) return this.playerCache;
        if (await this.isCacheStale()) return await this.refreshPlayerCache();

        // File is under 24h old but hasnt been loaded into memory yet. Read it in.
        const playerData = await readFile(this.playersFile, 'utf-8');
        const players = JSON.parse(playerData) as Record<string, Player>;
        this.playerCache = players;
        return players;
    }

    public async getPlayerById(playerId: string): Promise<Player | undefined> {
        const playerMap = await this.getPlayers();
        return playerMap[playerId];
    }

}