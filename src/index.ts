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

type ExtendedTeam = Team & {
  points: number
  goalsFor: number
  goalsAgainst: number
  goalDiff: number
}

type ExtendedTeamWithRecords = ExtendedTeam & {
  [key: string]: {
    goals: number
    points: number
  }
}

type Teams = Team[]

function calculatePoints(goalsFor: number, goalsAgainst: number) {
  if (goalsFor > goalsAgainst) {
    return 3
  }

  if (goalsFor < goalsAgainst) {
    return 0
  }

  return 1
}

function calculateVersusRatio(goalsFor: number, goalsAgainst: number) {
  if (goalsFor > goalsAgainst) {
    return 1
  }

  if (goalsFor < goalsAgainst) {
    return -1
  }

  return 0
}

function calculateTeamRecord({
  goalsFor,
  goalsAgainst,
  currentRecord
}: {
  goalsFor: number
  goalsAgainst: number
  currentRecord: any // TODO
}) {
  const { points, goals } = currentRecord

  if (goalsFor > goalsAgainst) {
    return { points: points + 1, goals: goals + (goalsFor - goalsAgainst) }
  }

  if (goalsFor < goalsAgainst) {
    return { points: points - 1, goals: goals + (goalsFor - goalsAgainst) }
  }

  return currentRecord
}

function sortTeamsByPoints(teams: ExtendedTeam[]) {
  return teams.sort(
    (objA: ExtendedTeam, objB: ExtendedTeam) =>
      Number(objB.points) - Number(objA.points)
  )
}

function compareTwoTeams(firstTeam: ExtendedTeam, secondTeam: ExtendedTeam) {
  const { matches } = firstTeam
  const { name: secondTeamName } = secondTeam

  // Data which will be returned
  const firstTeamBetter = [firstTeam, secondTeam]
  const secondTeamBetter = [secondTeam, firstTeam]

  const firstTeamVsSecond = matches[secondTeamName.toLowerCase()]

  let firstTeamVsSecondRatio = 0
  let firstTeamVsSecondGoalDiff = 0

  firstTeamVsSecond.forEach(({ goalsFor, goalsAgainst }) => {
    firstTeamVsSecondRatio += calculateVersusRatio(goalsFor, goalsAgainst)
    firstTeamVsSecondGoalDiff += goalsFor - goalsAgainst
  })

  // Head to head record
  // ---------------------------------------------
  // If first team has better head-to-head record
  if (firstTeamVsSecondRatio > 0) {
    return firstTeamBetter
  }

  // if second team has better head-to-head record
  if (firstTeamVsSecondRatio < 0) {
    return secondTeamBetter
  }

  // Goal difference (versus)
  // ---------------------------------------------
  // if first team has better goal difference
  if (firstTeamVsSecondGoalDiff > 0) {
    return firstTeamBetter
  }

  // if second team has better goal difference
  if (firstTeamVsSecondGoalDiff < 0) {
    return secondTeamBetter
  }

  // Goal difference (general)
  // ---------------------------------------------
  if (firstTeam.goalDiff > secondTeam.goalDiff) {
    return firstTeamBetter
  }

  if (firstTeam.goalDiff < secondTeam.goalDiff) {
    return secondTeamBetter
  }

  // Goals for comparison
  // ---------------------------------------------
  if (firstTeam.goalsFor > secondTeam.goalsFor) {
    return firstTeamBetter
  } else {
    return secondTeamBetter
  }
}

function groupByPointsAndSort(teams: ExtendedTeam[]) {
  const groupedByPoints: any = {} // TODO
  const sortedTeams: ExtendedTeam[] = []

  // Group teams by points
  for (const team of teams) {
    const { points } = team
    groupedByPoints[points] = groupedByPoints[points] ?? []
    groupedByPoints[points].push(team)
  }

  // Compare and sort grouped teams values
  Object.keys(groupedByPoints).forEach(key => {
    const currentTeamsWithPoints = groupedByPoints[key]

    // If there is only one team, add it to the array
    if (currentTeamsWithPoints.length === 1) {
      sortedTeams.push(...currentTeamsWithPoints)
      return
    }

    // if there are two teams, we need to see which is better
    if (currentTeamsWithPoints.length === 2) {
      const samePointsTeam = compareTwoTeams(
        currentTeamsWithPoints[0],
        currentTeamsWithPoints[1]
      ).reverse()
      sortedTeams.push(...samePointsTeam)
      return
    }

    // Push all the rest variations
    // TODO: In the future, also make heavy comparisons with 2 or more teams
    // with the same points.
    sortedTeams.push(...currentTeamsWithPoints)
  })

  return sortedTeams.reverse()
}

function prepareData(teams: Team[]) {
  let teamsWithData: ExtendedTeam[] = []

  for (const team of teams) {
    if (!team.hasOwnProperty('name')) {
      console.warn('Each team must have a name!')
      return
    }

    if (!team.hasOwnProperty('name')) {
      console.warn('Each team must have matches inside!')
      return
    }

    // Prepare initial team object
    const { matches, name } = team
    teamsWithData.push({
      name,
      matches,
      points: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDiff: 0
    })
  }

  // First, sort by points
  const sortedTeamsByPoints = sortTeamsByPoints(teamsWithData)
  // Group by points and sort
  return groupByPointsAndSort(sortedTeamsByPoints)
}

export default function simpleTableStandings(teams: Teams) {
  // Check if it is an array
  if (!Array.isArray(teams)) {
    console.warn('Teams object must be an array!')
    return
  }

  // Check if it is an empty array
  if (teams.length === 0) {
    console.warn('You provided an empty array. Missing other params')
  }

  return prepareData(teams)
}
