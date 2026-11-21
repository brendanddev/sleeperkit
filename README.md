# sleeperkit

A typed TypeScript client for the [Sleeper](https://sleeper.com) fantasy football API.
Covers the documented REST API plus several undocumented endpoints used by Sleeper's
own frontend, with local caching for the large player dataset.

Unofficial and not affiliated with Sleeper.

> Early development. The API may change.

## Install

```bash
npm install sleeperkit
```

## Usage

```ts
import { SleeperClient } from "sleeperkit";

const client = new SleeperClient();

const state = await client.getNflState();
const rosters = await client.getRosters("1395543914030596096");

// The player dataset is cached to disk and memory.
const players = await client.getPlayers();
console.log(players["9493"].full_name);

// Stats and projections need an explicit season.
const weeks = await client.getPlayerStatsByWeek("9493", Number(state.season));
```

### Options

```ts
new SleeperClient({
  cacheDir: "/tmp/sleeper",   // Where the player cache is written, default "data".
});
```

## What's covered

**Documented API** (`api.sleeper.app/v1`)
- Users, leagues, rosters, matchups
- Full player dataset, with a 24-hour disk and memory cache
- Trending adds and drops
- NFL state

**Undocumented API** (`api.sleeper.com`)

These power Sleeper's own frontend. They work, but carry no stability guarantee.

- Team depth charts
- Per-player stats and projections, by week or season
- Weekly leaders across positions

## Caching

`getPlayers()` returns the full player dataset, around 5MB. Sleeper asks that it
not be fetched more than once a day, so it's cached to disk and held in memory
for the process lifetime.

## Notes on the Sleeper API

Things worth knowing, learned the hard way:

- Unknown query parameters are ignored rather than rejected. `position=DEF` on the
  trending endpoint looks like it filters, and doesn't.
- Missing resources return `200` with a `null` body, not a `404`.
- Points are split into whole and hundredths fields (`fpts` + `fpts_decimal`).
- Rate limit is 1000 requests per minute.
- There is no write API — roster moves can't be automated.

## License

MIT
