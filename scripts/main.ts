import { SleeperClient } from "../src/client.js";
import { ScheduleGame } from "../src/types.js";

const LEAGUE_ID = '1395543914030596096';
const PUKA_PLAYER_ID = '9493';

const client = new SleeperClient();

const seasonProjectionLeaders = await client.getSeasonProjectionLeaders(2026, ['WR']);

console.log(seasonProjectionLeaders.length);
console.log(seasonProjectionLeaders[0]?.player, seasonProjectionLeaders[0]?.stats.pts_ppr);

// const schedule: ScheduleGame[] = await client.getSchedule(2026, "regular");
// console.log(schedule);

// const future = schedule.filter(g => g.week >= 15);
// console.log(future.slice(0, 3));

// console.log(new Set(schedule.map(g => g.status)));

// const playerMap = await client.getPlayers();
