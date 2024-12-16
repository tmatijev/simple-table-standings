export type Match = {
  isHomeMatch: boolean;
  goalsFor: number;
  goalsAgainst: number;
};

export type Team = {
  name: string;
  matches: {
    [key: string]: Match[];
  };
};

export type ExtendedTeam = Team & {
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  records?: {
    [key: string]: {
      points: number;
      goals: number;
    };
  };
};

export type Teams = Team[]; 