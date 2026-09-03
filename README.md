# Ginjo Travian Tool

A local Travian Legends helper for troop lookup, building planning, training estimates, travel timing, and tribe notes.

## Open It

Double-click this file, or right-click it and choose your browser:

```text
index.html
```

No install, server, account login, scripts, or `.exe` launcher is required.

## What Is Included

- Troop library for Romans, Teutons, Gauls, Huns, Egyptians, Spartans, and Vikings.
- Avatar profiles stored locally in the browser, each with its Travian server link, tribe, and villages.
- Server name and speed rules are derived from the Travian gameworld URL, not from a saved local server list.
- Dashboard village command table created from copied Travian overview pages.
- Inline village edits for population, field type, production, owned oases, troop counts, crop net, attack strength, and defense strength.
- Dated local snapshots are saved after each pasted Travian update so historical graphs can be added later.
- Paste parser for copied Travian troop, production, and profile village overview pages, syncing villages and updating matching troops, population, coordinates, capital status, and production locally without running scripts on Travian.
- Local village type and owned oasis metadata.
- Costs, combat stats, speed, carry, upkeep, requirements, and training estimates.
- Building cost planner using seeded level-1 costs and per-level multipliers.
- Troop training planner with quantity, world speed, and training building level.
- Coordinate travel-time calculator using the slowest selected unit.
- Tribe knowledge cards with strengths, weaknesses, merchants, heroes, and special buildings.
- Original inline SVG icons for resources, troop roles, combat stats, travel, training, and building categories.

## Data Notes

The dataset is intentionally centralized in `data.js` so it is easy to audit and correct. Official Travian support pages were used for current tribe notes, speed rules, infantry/cavalry comparison data, building-tool behavior, and the Viking unit table. Fandom and long-standing community data were used as seed references where the official support pages expose only comparison or total-cost values.

The interface icons are original local SVGs, not copied Travian game assets.

Avatar data is saved in your browser's `localStorage`. Clearing site data for this folder/browser will remove saved avatars, villages, troops, and resource entries. Server rules are recalculated from the saved gameworld link.

Village field type, owned oasis bonuses, and troop counts are stored locally.

For exact high-stakes planning, verify against your active gameworld, especially special-server balancing, Community Week values, and building costs affected by server-specific rules.

## Next Good Additions

- Import/export custom gameworld data as JSON.
- Separate classic, Community Week, Northern Legends, and server-speed presets.
- Tournament Square and world-wrap logic for travel times.
- Cropper and oasis production planners.
- Smithy upgrade break-even calculator.
