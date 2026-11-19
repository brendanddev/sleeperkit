import { SLEEPER_LEAGUES } from "../config/config.js";
import { SleeperClient } from "./client.js";

const PUKA_PLAYER_ID = '9493';

const client = new SleeperClient();
const emotiLeague = SLEEPER_LEAGUES["emoticon"];
const bLeague = SLEEPER_LEAGUES["bagot"];
const playerMap = await client.getPlayers();

if (bLeague) {
    const ROSTER_ID = 4;
    const THROUGH_WEEK = 9;

    let wouldWin = 0;
    let wouldLose = 0;
    let wouldTie = 0;

    for (let week = 1; week <= THROUGH_WEEK; week++) {
        const currWeekMatchup = await client.getWeeklyMatchups(bLeague, week);
        const currentRoster = currWeekMatchup.find(matchup => matchup.roster_id === ROSTER_ID);
        if (!currentRoster) throw new Error("No user with that roster id");

        currWeekMatchup.forEach(entry => {
            if (entry.roster_id === ROSTER_ID) return;

            if (entry.points > currentRoster.points) wouldLose++;
            else if (entry.points === currentRoster.points) wouldTie++;
            else wouldWin++;
        });
    }

    console.log(`For the current season, roster=${ROSTER_ID} would have won ${wouldWin} times, lost ${wouldLose} times, and tied ${wouldTie} times`);


    // const playerSeasonViews = await client.getPlayerSeasonView(PUKA_PLAYER_ID, 2026, 9);
    // console.log(playerSeasonViews);

    // const trendingPlayers = await client.getTopFreeAgents(bLeague, 2026, 9, ['WR'], 10);
    // console.log(trendingPlayers);

    // const weeklyLeaders = await client.getWeeklyLeaders(2026, 9, ['RB']);
    // console.log(weeklyLeaders);

    // const rosters = await client.getRosters(emotiLeague);
    // console.log(rosters);

    //     // const state = await client.getNflState();
    //     // console.log(state);

    //     // const leagueStandings = await client.getLeagueStandings(emotiLeague);
    //     // console.log(leagueStandings);

    //     // const snapPercentage = await client.getSnapPercentageForWeek(PUKA_PLAYER_ID, 8);
    //     // console.log(snapPercentage);

    //     // const pukaStats = await client.getPlayerStatsByWeek(PUKA_PLAYER_ID);
    //     // const week8 = pukaStats["8"];
    //     // console.log(week8);

} else {
    console.log(`Invalid League ID`);
}
