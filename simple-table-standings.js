module.exports = function (teams) {
  // Check if it is an array
  if (!Array.isArray(teams)) {
    console.warn("Teams object must be an array!");
    return;
  }

  // Check if it is an empty array
  if (teams.length === 0) {
    console.warn("You provided an empty array. Missing other params");
  }

  function calculatePoints(goalsFor, goalsAgainst) {
    if (goalsFor > goalsAgainst) {
      return 3;
    }
  
    if (goalsFor < goalsAgainst) {
      return 0;
    }
  
    return 1;
  }
  
  function calculateTeamRecord({ goalsFor, goalsAgainst, currentRecord }) {
    const { points, goals } = currentRecord;
  
    if (goalsFor > goalsAgainst) {
      return { points: points + 1, goals: goals + (goalsFor - goalsAgainst) };
    }
  
    if (goalsFor < goalsAgainst) {
      return { points: points - 1, goals: goals + (goalsFor - goalsAgainst) };
    }
  
    return currentRecord;
  }
  
  function sortTeamsByPoints(teams) {
    return teams.sort((objA, objB) => Number(objB.points) - Number(objA.points));
  }
  
  function prepareData(teams) {
    let teamsWithData = [];
  
    for (team of teams) {
      if (!team.hasOwnProperty("name")) {
        console.warn("Each team must have a name!");
        return;
      }
  
      if (!team.hasOwnProperty("name")) {
        console.warn("Each team must have matches inside!");
        return;
      }
  
      // Prepare initial team object
      const { matches, name } = team;
      teamsWithData.push({
        name,
        matches,
        points: 0,
        goalsFor: 0,
        golasAgainst: 0,
        goalDiff: 0,
      });
  
      for (const [opponent, results] of Object.entries(team.matches)) {
        // TODO: Use opponent later. Needed for ranking rules!
        const currentTeam = teamsWithData.find((team) => team.name === name);
  
        // Create "head to head" records for every oppponent
        if (!currentTeam.hasOwnProperty("records")) {
          currentTeam.records = {};
        }
        currentTeam.records[opponent] = { points: 0, goals: 0 };
  
        for (result of results) {
          if (!result.hasOwnProperty("isHomeMatch")) {
            console.warn(
              "There has to be a 'isHomeMatch' property inside the each match"
            );
            return;
          }
  
          if (!result.hasOwnProperty("goalsFor")) {
            console.warn(
              "There has to be a 'goalsFor' property inside the each match"
            );
            return;
          }
  
          if (!result.hasOwnProperty("goalsAgainst")) {
            console.warn(
              "There has to be a 'goalsAgainst' property inside the each match"
            );
            return;
          }
  
          const { goalsFor, goalsAgainst, isHomeMatch } = result;
  
          // Calculate and update the record against the current opponent
          const record = calculateTeamRecord({
            currentRecord: currentTeam.records[opponent],
            goalsFor,
            goalsAgainst,
          });
  
          // Update the values for the current team
          currentTeam.goalsFor += goalsFor;
          currentTeam.golasAgainst += goalsAgainst;
          currentTeam.points += calculatePoints(goalsFor, goalsAgainst);
          currentTeam.records[opponent] = record;
        }
      }
    }
  
    // First, sort by points
    const sortedTeamsByPoints = sortTeamsByPoints(teamsWithData);
    return sortedTeamsByPoints;
  }

  // Prepare the data
  return prepareData(teams);
};
