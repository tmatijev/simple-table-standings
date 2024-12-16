# Simple Table Standings

[![npm version](https://img.shields.io/npm/v/simple-table-standings.svg)](https://www.npmjs.com/package/simple-table-standings)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)

A lightweight TypeScript library for calculating sports standings tables with head-to-head records.

## Features

- 🎯 Accurate points calculation
- 🔄 Head-to-head records
- 📊 Goal difference tracking
- 💪 TypeScript support
- 0️⃣ Zero dependencies

## Installation

```bash
npm install simple-table-standings
# or
yarn add simple-table-standings
# or
pnpm add simple-table-standings
```

## Usage

```typescript
import simpleTableStandings from "simple-table-standings";

const teamsMatches = [
  {
    name: "Hajduk",
    matches: {
      dinamo: [
        { isHomeMatch: true, goalsFor: 1, goalsAgainst: 0 },
        { isHomeMatch: false, goalsFor: 2, goalsAgainst: 0 },
      ],
      rijeka: [
        { isHomeMatch: true, goalsFor: 1, goalsAgainst: 3 },
        { isHomeMatch: false, goalsFor: 2, goalsAgainst: 3 },
      ],
      osijek: [
        { isHomeMatch: true, goalsFor: 1, goalsAgainst: 1 },
        { isHomeMatch: false, goalsFor: 1, goalsAgainst: 1 },
      ],
    },
  },
  {
    name: "Dinamo",
    matches: {
      hajduk: [
        { isHomeMatch: false, goalsAgainst: 1, goalsFor: 0 },
        { isHomeMatch: true, goalsAgainst: 2, goalsFor: 0 },
      ],
      rijeka: [
        { isHomeMatch: true, goalsFor: 3, goalsAgainst: 3 },
        { isHomeMatch: false, goalsFor: 2, goalsAgainst: 1 },
      ],
      osijek: [
        { isHomeMatch: true, goalsFor: 0, goalsAgainst: 0 },
        { isHomeMatch: false, goalsFor: 2, goalsAgainst: 2 },
      ],
    },
  },
  {
    name: "Osijek",
    matches: {
      dinamo: [
        { isHomeMatch: true, goalsFor: 2, goalsAgainst: 2 },
        { isHomeMatch: false, goalsFor: 0, goalsAgainst: 0 },
      ],
      rijeka: [
        { isHomeMatch: true, goalsFor: 1, goalsAgainst: 1 },
        { isHomeMatch: false, goalsFor: 1, goalsAgainst: 0 },
      ],
      hajduk: [
        { isHomeMatch: true, goalsFor: 1, goalsAgainst: 1 },
        { isHomeMatch: false, goalsFor: 1, goalsAgainst: 1 },
      ],
    },
  },
  {
    name: "Rijeka",
    matches: {
      dinamo: [
        { isHomeMatch: true, goalsFor: 1, goalsAgainst: 2 },
        { isHomeMatch: false, goalsFor: 3, goalsAgainst: 3 },
      ],
      hajduk: [
        { isHomeMatch: true, goalsFor: 3, goalsAgainst: 3 },
        { isHomeMatch: false, goalsFor: 3, goalsAgainst: 1 },
      ],
      osijek: [
        { isHomeMatch: true, goalsFor: 0, goalsAgainst: 1 },
        { isHomeMatch: false, goalsFor: 0, goalsAgainst: 1 },
      ],
    },
  },
];

const standings = simpleTableStandings(teamsMatches);
```

### Input Type

```typescript
type Match = {
  isHomeMatch: boolean;
  goalsFor: number;
  goalsAgainst: number;
};

type Team = {
  name: string;
  matches: {
    [opponent: string]: Match[];
  };
};
```

### Output Type

```typescript
type ExtendedTeam = Team & {
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  records?: {
    [opponent: string]: {
      points: number;
      goals: number;
    };
  };
};
```

### Example Output

```json
[
  {
    "name": "Hajduk",
    "points": 8,
    "goalsFor": 8,
    "goalsAgainst": 8,
    "goalDiff": 0,
    "records": {
      "dinamo": { "points": 2, "goals": 3 },
      "rijeka": { "points": -1, "goals": -3 }
    }
  }
  // ... more teams
]
```

## Rules

- Win: 3 points
- Draw: 1 point
- Loss: 0 points

Teams are sorted by (in order of priority):
1. Total points
2. Head-to-head matches (points earned in matches between tied teams)
3. Overall goal difference
4. Total goals scored

For example, if two teams have the same points:
- First, compare their head-to-head matches
- If still tied, compare their goal differences
- If still tied, compare total goals scored

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[ISC](https://choosealicense.com/licenses/isc/)
```
