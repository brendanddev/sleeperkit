import { SleeperClient } from "./client.js";
import type { League } from "./types.js";

const client = new SleeperClient();
const LEAGUE_ID = "1395543914030596096";
const PLAYERS_CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000;

async function main() {
    const a = Date.now();
    await client.getPlayers();
    console.log("first:", Date.now() - a, "ms");

    const b = Date.now();
    await client.getPlayers();
    console.log("second:", Date.now() - b, "ms");
}

main();