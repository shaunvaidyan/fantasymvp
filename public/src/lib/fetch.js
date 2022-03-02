async function myFetchUsers(leagueId) {
    //let leagueId = document.querySelector("input[name=leagueUrl]").value;
    //console.log(`myFetch leagueId ${leagueId}`) 
    let teamsReturned = await fetch(`https://api.sleeper.app/v1/league/${leagueId}/users`).then( function(response) {
      return response.json();
    });
    //.catch(err => console.log("Request Failed", err));
    return teamsReturned;
    
  }
async function myFetchUserIdFromUserName() {
    let userName = document.querySelector("input[name=userName]").value; 
    let userIdsReturned = await fetch(`https://api.sleeper.app/v1/user/${userName}`).then( function(response) {
      return response.json();
    });
    //.catch(err => console.log("Request Failed", err));
    return userIdsReturned;
    
}
  
async function myFetchLeaguesFromUserIds(userIdOutput){
    let leagueIdsReturned = await fetch(`https://api.sleeper.app/v1/user/${userIdOutput}/leagues/nfl/2021`).then( function(response) {
      return response.json();
    });
    return leagueIdsReturned;
}
  
async function myFetchRosters(leagueIdofRostersFetch){
    let rostersReturned = await fetch(`https://api.sleeper.app/v1/league/${leagueIdofRostersFetch}/rosters`).then( function(response) {
      return response.json();
    });
    //console.log(rostersReturned)
    return rostersReturned;
}
  
async function myFetchNflJson() {
    //let selectedTeamPlayers = document.querySelector("").value; // GET ON THIS
    let nflPlayersReturned = await fetch(`./stats/nfl.json`).then(res => res.json());
    return nflPlayersReturned;
}

async function myFetchSeasonScores(seasonYear){
  let seasonScoresReturned = await fetch(`./stats/${seasonYear}.json`).then(res => res.json());
  return seasonScoresReturned;
}
export { myFetchUsers, myFetchUserIdFromUserName, myFetchLeaguesFromUserIds, myFetchRosters, myFetchNflJson, myFetchSeasonScores };
