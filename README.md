# Simple table standings

### Usage

Simply pass the params for the teams and legs:

```js
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
        { isHomeMatch: false, goalsFor: 3, goalsAgainst: 3 },
      ],
      osijek: [
        { isHomeMatch: true, goalsFor: 1, goalsAgainst: 2 },
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
        // { isHomeMatch: true, goalsFor: 3, goalsAgainst: 3 },
        { isHomeMatch: true, goalsFor: 2, goalsAgainst: 3 },
        { isHomeMatch: false, goalsFor: 2, goalsAgainst: 1 },
      ],
      osijek: [
        { isHomeMatch: true, goalsFor: 0, goalsAgainst: 0 },
        { isHomeMatch: false, goalsFor: 2, goalsAgainst: 0 },
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
        { isHomeMatch: false, goalsFor: 0, goalsAgainst: 0 },
      ],
      hajduk: [
        { isHomeMatch: true, goalsFor: 1, goalsAgainst: 1 },
        { isHomeMatch: false, goalsFor: 2, goalsAgainst: 1 },
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
        { isHomeMatch: true, goalsFor: 2, goalsAgainst: 3 },
        { isHomeMatch: false, goalsFor: 3, goalsAgainst: 1 },
      ],
      osijek: [
        { isHomeMatch: true, goalsFor: 0, goalsAgainst: 0 },
        { isHomeMatch: false, goalsFor: 0, goalsAgainst: 1 },
      ],
    },
  },
];

const standings = teamsMatches(teams);
```

Will return the following output:

```json
[
  {
    name: 'Hajduk',
    matches: {
      dinamo: [
        { isHomeMatch: true, goalsFor: 1, goalsAgainst: 0 },
        { isHomeMatch: false, goalsFor: 2, goalsAgainst: 0 }
      ],
      rijeka: [
        { isHomeMatch: true, goalsFor: 1, goalsAgainst: 3 },
        { isHomeMatch: false, goalsFor: 3, goalsAgainst: 3 }
      ],
      osijek: [
        { isHomeMatch: true, goalsFor: 1, goalsAgainst: 2 },
        { isHomeMatch: false, goalsFor: 1, goalsAgainst: 1 }
      ]
    },
    points: 8,
    goalsFor: 9,
    golasAgainst: 9,
    goalDiff: 0,
    records: {
      dinamo: { points: 2, goals: 3 },
      rijeka: { points: -1, goals: -2 },
      osijek: { points: -1, goals: -1 }
    }
  },
  {
    name: 'Osijek',
    matches: {
      dinamo: [
        { isHomeMatch: true, goalsFor: 2, goalsAgainst: 2 },
        { isHomeMatch: false, goalsFor: 0, goalsAgainst: 0 }
      ],
      rijeka: [
        { isHomeMatch: true, goalsFor: 1, goalsAgainst: 1 },
        { isHomeMatch: false, goalsFor: 0, goalsAgainst: 0 }
      ],
      hajduk: [
        { isHomeMatch: true, goalsFor: 1, goalsAgainst: 1 },
        { isHomeMatch: false, goalsFor: 2, goalsAgainst: 1 }
      ]
    },
    points: 8,
    goalsFor: 6,
    golasAgainst: 5,
    goalDiff: 0,
    records: {
      dinamo: { points: 0, goals: 0 },
      rijeka: { points: 0, goals: 0 },
      hajduk: { points: 1, goals: 1 }
    }
  },
  {
    name: 'Dinamo',
    matches: {
      hajduk: [
        { isHomeMatch: false, goalsAgainst: 1, goalsFor: 0 },
        { isHomeMatch: true, goalsAgainst: 2, goalsFor: 0 }
      ],
      rijeka: [
        { isHomeMatch: true, goalsFor: 2, goalsAgainst: 3 },
        { isHomeMatch: false, goalsFor: 2, goalsAgainst: 1 }
      ],
      osijek: [
        { isHomeMatch: true, goalsFor: 0, goalsAgainst: 0 },
        { isHomeMatch: false, goalsFor: 2, goalsAgainst: 0 }
      ]
    },
    points: 7,
    goalsFor: 6,
    golasAgainst: 7,
    goalDiff: 0,
    records: {
      hajduk: { points: -2, goals: -3 },
      rijeka: { points: 0, goals: 0 },
      osijek: { points: 1, goals: 2 }
    }
  },
  {
    name: 'Rijeka',
    matches: {
      dinamo: [
        { isHomeMatch: true, goalsFor: 1, goalsAgainst: 2 },
        { isHomeMatch: false, goalsFor: 3, goalsAgainst: 3 }
      ],
      hajduk: [
        { isHomeMatch: true, goalsFor: 2, goalsAgainst: 3 },
        { isHomeMatch: false, goalsFor: 3, goalsAgainst: 1 }
      ],
      osijek: [
        { isHomeMatch: true, goalsFor: 0, goalsAgainst: 0 },
        { isHomeMatch: false, goalsFor: 0, goalsAgainst: 1 }
      ]
    },
    points: 5,
    goalsFor: 9,
    golasAgainst: 10,
    goalDiff: 0,
    records: {
      dinamo: { points: -1, goals: -1 },
      hajduk: { points: 0, goals: 1 },
      osijek: { points: -1, goals: -1 }
    }
  }
]
```
