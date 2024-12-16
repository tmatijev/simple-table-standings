import { Match } from './types';

export function calculatePoints(goalsFor: number, goalsAgainst: number): number {
  if (goalsFor > goalsAgainst) return 3;
  if (goalsFor < goalsAgainst) return 0;
  return 1;
}

export function calculateVersusRatio(goalsFor: number, goalsAgainst: number): number {
  if (goalsFor > goalsAgainst) return 1;
  if (goalsFor < goalsAgainst) return -1;
  return 0;
}

export function calculateTeamRecord({ 
  goalsFor, 
  goalsAgainst, 
  currentRecord 
}: { 
  goalsFor: number;
  goalsAgainst: number;
  currentRecord: { points: number; goals: number; }
}): { points: number; goals: number; } {
  const { points, goals } = currentRecord;

  if (goalsFor > goalsAgainst) {
    return { points: points + 1, goals: goals + (goalsFor - goalsAgainst) };
  }

  if (goalsFor < goalsAgainst) {
    return { points: points - 1, goals: goals + (goalsFor - goalsAgainst) };
  }

  return currentRecord;
} 