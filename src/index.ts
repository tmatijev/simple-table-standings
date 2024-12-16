import { Team, Teams, ExtendedTeam, Match } from "./types";
import {
  calculatePoints,
  calculateVersusRatio,
  calculateTeamRecord,
} from "./utils";

function sortTeamsByPoints(teams: ExtendedTeam[]): ExtendedTeam[] {
  return [...teams].sort((a, b) => b.points - a.points);
}

function compareTwoTeams(
  firstTeam: ExtendedTeam,
  secondTeam: ExtendedTeam
): ExtendedTeam[] {
  const { matches } = firstTeam;
  const { name: secondTeamName } = secondTeam;

  const firstTeamBetter: ExtendedTeam[] = [firstTeam, secondTeam];
  const secondTeamBetter: ExtendedTeam[] = [secondTeam, firstTeam];

  const firstTeamVsSecond = matches[secondTeamName.toLowerCase()];

  let firstTeamVsSecondRatio = 0;
  let firstTeamVsSecondGoalDiff = 0;

  firstTeamVsSecond.forEach(({ goalsFor, goalsAgainst }) => {
    firstTeamVsSecondRatio += calculateVersusRatio(goalsFor, goalsAgainst);
    firstTeamVsSecondGoalDiff += goalsFor - goalsAgainst;
  });

  if (firstTeamVsSecondRatio > 0) return firstTeamBetter;
  if (firstTeamVsSecondRatio < 0) return secondTeamBetter;
  if (firstTeamVsSecondGoalDiff > 0) return firstTeamBetter;
  if (firstTeamVsSecondGoalDiff < 0) return secondTeamBetter;
  if (firstTeam.goalDiff > secondTeam.goalDiff) return firstTeamBetter;
  if (firstTeam.goalDiff < secondTeam.goalDiff) return secondTeamBetter;
  if (firstTeam.goalsFor > secondTeam.goalsFor) return firstTeamBetter;
  return secondTeamBetter;
}

function groupByPointsAndSort(teams: ExtendedTeam[]): ExtendedTeam[] {
  const groupedByPoints: { [key: number]: ExtendedTeam[] } = {};
  const sortedTeams: ExtendedTeam[] = [];

  teams.forEach((team) => {
    const { points } = team;
    groupedByPoints[points] = groupedByPoints[points] ?? [];
    groupedByPoints[points].push(team);
  });

  Object.keys(groupedByPoints).forEach((key) => {
    const currentTeamsWithPoints = groupedByPoints[Number(key)];

    if (currentTeamsWithPoints.length === 1) {
      sortedTeams.push(...currentTeamsWithPoints);
      return;
    }

    if (currentTeamsWithPoints.length === 2) {
      const samePointsTeam = compareTwoTeams(
        currentTeamsWithPoints[0],
        currentTeamsWithPoints[1]
      ).reverse();
      sortedTeams.push(...samePointsTeam);
      return;
    }

    sortedTeams.push(...currentTeamsWithPoints);
  });

  return sortedTeams.reverse();
}

function validateTeam(team: Team): boolean {
  if (!("name" in team)) {
    console.warn("Each team must have a name!");
    return false;
  }

  if (!("matches" in team)) {
    console.warn("Each team must have matches inside!");
    return false;
  }

  return true;
}

function validateMatch(result: Match): boolean {
  if (
    !("isHomeMatch" in result) ||
    !("goalsFor" in result) ||
    !("goalsAgainst" in result)
  ) {
    console.warn("Invalid match data structure");
    return false;
  }
  return true;
}

function initializeExtendedTeam(team: Team): ExtendedTeam {
  return {
    ...team,
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDiff: 0,
    records: {},
  };
}

function processMatches(
  extendedTeam: ExtendedTeam,
  matches: { [key: string]: Match[] }
): ExtendedTeam | undefined {
  const updatedTeam = { ...extendedTeam };

  for (const [opponent, results] of Object.entries(matches)) {
    if (!updatedTeam.records) {
      updatedTeam.records = {};
    }
    updatedTeam.records[opponent] = { points: 0, goals: 0 };

    for (const result of results) {
      if (!validateMatch(result)) return undefined;

      const { goalsFor, goalsAgainst } = result;

      if (updatedTeam.records[opponent]) {
        updatedTeam.records[opponent] = calculateTeamRecord({
          currentRecord: updatedTeam.records[opponent],
          goalsFor,
          goalsAgainst,
        });
      }

      updatedTeam.goalsFor += goalsFor;
      updatedTeam.goalsAgainst += goalsAgainst;
      updatedTeam.points += calculatePoints(goalsFor, goalsAgainst);
      updatedTeam.goalDiff = updatedTeam.goalsFor - updatedTeam.goalsAgainst;
    }
  }

  return updatedTeam;
}

function prepareData(teams: Teams): ExtendedTeam[] | undefined {
  const teamsWithData: ExtendedTeam[] = [];

  for (const team of teams) {
    if (!validateTeam(team)) return undefined;

    const extendedTeam = initializeExtendedTeam(team);
    const processedTeam = processMatches(extendedTeam, team.matches);

    if (!processedTeam) return undefined;
    teamsWithData.push(processedTeam);
  }

  const sortedTeamsByPoints = sortTeamsByPoints(teamsWithData);
  return groupByPointsAndSort(sortedTeamsByPoints);
}

export default function simpleTableStandings(
  teams: Teams | null
): ExtendedTeam[] | undefined {
  if (!teams || !Array.isArray(teams)) return undefined;
  if (teams.length === 0) return undefined;

  return prepareData(teams);
}
