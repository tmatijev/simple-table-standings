# Simple table standings

[![npm status](https://img.shields.io/badge/npm-v1.0.3-brightgreen.svg)](https://www.npmjs.org/package/simple-table-standings)

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

const standings = teamsMatches(teams);
```

Will return the following output:

```
[
  {
    name: 'Hajduk',
    matches: { dinamo: [Array], rijeka: [Array], osijek: [Array] },
    points: 8,
    goalsFor: 8,
    golasAgainst: 8,
    goalDiff: 0,
    records: { dinamo: [Object], rijeka: [Object], osijek: [Object] }
  },
  {
    name: 'Osijek',
    matches: { dinamo: [Array], rijeka: [Array], hajduk: [Array] },
    points: 8,
    goalsFor: 6,
    golasAgainst: 5,
    goalDiff: 0,
    records: { dinamo: [Object], rijeka: [Object], hajduk: [Object] }
  },
  {
    name: 'Dinamo',
    matches: { hajduk: [Array], rijeka: [Array], osijek: [Array] },
    points: 6,
    goalsFor: 7,
    golasAgainst: 9,
    goalDiff: 0,
    records: { hajduk: [Object], rijeka: [Object], osijek: [Object] }
  },
  {
    name: 'Rijeka',
    matches: { dinamo: [Array], hajduk: [Array], osijek: [Array] },
    points: 5,
    goalsFor: 10,
    golasAgainst: 11,
    goalDiff: 0,
    records: { dinamo: [Object], hajduk: [Object], osijek: [Object] }
  }
]
```
