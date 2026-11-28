import { SleeperClient } from "./client.js";
import type { League } from "./types.js";

const client = new SleeperClient();
const LEAGUE_ID = "1395543914030596096";
const PUKA_PID = "9493";
const PLAYERS_CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000;

async function main() {
    const PUKA = await client.getPlayerById(PUKA_PID);
    console.log(PUKA?.full_name);
    console.log(PUKA?.age);
    console.log(PUKA?.number);
    console.log(PUKA?.status);

}

main();