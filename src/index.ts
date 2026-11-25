import { SleeperClient } from "./client.js";
import type { League } from "./types.js";

const client = new SleeperClient();
const LEAGUE_ID = "1395543914030596096";

async function main() {
    const users = await client.getUsers(LEAGUE_ID);
    users.forEach(user => {
        console.log(user.display_name);
    });
}

main();