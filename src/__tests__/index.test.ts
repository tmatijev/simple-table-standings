import simpleTableStandings from '../index';
import { Teams } from '../types';

describe('simpleTableStandings', () => {
  const teamsMatches: Teams = [
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
          { isHomeMatch: true, goalsFor: 3, goalsAgainst: 1 },
          { isHomeMatch: false, goalsFor: 2, goalsAgainst: 1 },
        ],
        osijek: [
          { isHomeMatch: true, goalsFor: 1, goalsAgainst: 1 },
          { isHomeMatch: false, goalsFor: 2, goalsAgainst: 2 },
        ],
      },
    }
  ];

  it('should calculate standings correctly', () => {
    const result = simpleTableStandings(teamsMatches);
    
    expect(result).toBeDefined();
    expect(result?.[0].name).toBe('Hajduk');
    expect(result?.[0].points).toBe(8);
    expect(result?.[0].goalsFor).toBe(8);
    expect(result?.[0].goalsAgainst).toBe(8);
    expect(result?.[0].goalDiff).toBe(0);
  });

  it('should handle empty array', () => {
    const result = simpleTableStandings([]);
    expect(result).toBeUndefined();
  });

  it('should handle invalid input', () => {
    const result = simpleTableStandings(null as any);
    expect(result).toBeUndefined();
  });

  it('should sort teams with same points correctly', () => {
    const result = simpleTableStandings(teamsMatches);
    
    // Both teams should have 8 points
    const samePointsTeams = result?.filter(team => team.points === 8);
    expect(samePointsTeams?.length).toBe(2);
    
    if (samePointsTeams?.length === 2) {
      const [firstTeam, secondTeam] = samePointsTeams;
      
      // Verify head-to-head matches
      expect(firstTeam.records?.[secondTeam.name.toLowerCase()].points).toBeGreaterThan(0);
      
      // If head-to-head is tied, verify goal difference
      if (firstTeam.records?.[secondTeam.name.toLowerCase()].points === 0) {
        expect(firstTeam.goalDiff).toBeGreaterThan(secondTeam.goalDiff);
      }
    }
  });
}); 