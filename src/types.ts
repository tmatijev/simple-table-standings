type Match = {
  isHomeMatch: boolean
  goalsFor: number
  goalsAgainst: number
}

type Team = {
  name: string
  matches: {
    [key: string]: Match[]
  }
}

type Teams = Team[]