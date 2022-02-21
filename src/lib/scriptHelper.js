//let leagueId = 787027217543708672; // build function to pass League ID from form later

function userNameSubmission(document, form, userName, sleeperData, teamData, teams) {
  sleeperData.style.visibility = "visible";
  let userId;
  let userIdResponse = myFetchUserIdFromUserName();
  userIdResponse.then(function (result) {
    userId = result;
  }).then(function () {
    let usernameOutput = userId.username;
    let userIdOutput = userId.user_id;
    //console.log(userId);
    //console.log(userIdOutput);
    userIdSubmission(document, form, usernameOutput, userIdOutput, sleeperData, teamData, teams);
    })
}
function userIdSubmission(document, form, usernameOutput, userIdOutput, sleeperData, teamData, teams){
  sleeperData.style.visibility = "visible";
  teamData.style.visibility = "visible";
  let userIdLeagues;
  let userIdLeaguesResponse = myFetchLeaguesFromUserIds(userIdOutput);
  userIdLeaguesResponse.then(function (result){
    userIdLeagues = result;
  }).then(function () {
    let jsonLeagueId = userIdLeagues.map (o => o.league_id);
    let jsonLeagueNames = userIdLeagues.map (o => o.name);
    //console.log(jsonLeagueNames);
    addTeamInfoByUserName(document, jsonLeagueId, jsonLeagueNames);
    })
}

function leagueUrlSubmission(document, form, leagueId, sleeperData, teams) {

  //console.log(leagueId);
  // if(leagueId = ""){
  //   ownerData.style.visibility = "hidden"
  // }
  sleeperData.style.visibility = "visible";
  let listedTeams;
  //console.log(leagueId);
   // Set listedTeamsResponse equal to the value returned by calling myFetchUsers()
  let listedTeamsResponse = myFetchUsers(leagueId);
  listedTeamsResponse.then(function (result) {
    listedTeams = result;

    }).then(function () {
      //console.log(listedTeams);
        
      let owner = listedTeams.map (o => o.display_name);
      let jsonUserId = listedTeams.map (o => o.user_id);
      let namedTeams = listedTeams.map (o => o.metadata.team_name);
      let jsonLeagueId = listedTeams.map (o => o.league_id);
      addTeamInfoByLeagueUrl(document, owner, jsonUserId, namedTeams, jsonLeagueId, listedTeams);
      })
  
  //console.log(teams)
}
function ownerSubmission(document, form, leagueInfo, sleeperData, teamData, teams) {
  let userIdofRostersFetch = leagueInfo[0]
  let leagueIdofRostersFetch = leagueInfo[1]
  let listedRosters;
  let listedRostersResponse = myFetchRosters(leagueIdofRostersFetch);
  listedRostersResponse.then(function (result) {
    listedRosters = result;
  }).then(function () {
    console.log(listedRosters);
    addPlayerInfo(document, userIdofRostersFetch, leagueIdofRostersFetch, listedRosters);
  //let leagueId = leagueUrl.value;

  //reset visual elements of form

  sleeperData.style.visibility = "visible";
  })
}
function addTeamInfoByLeagueUrl(document, owner, jsonUserId, namedTeams, jsonLeagueId, listedTeams){
  let sleeperData = document.getElementById("sleeperData");
  let ownerData = document.getElementById("ownerData");
  let teamData = document.getElementById("teamData");
  ownerData.innerHTML = ``
  teamData.innerHTML = `` //resets innerHTML table
  //let teamData = document.getElementById("teamData");
  for (let i=0; owner.length > i; i++){
    ownerData.innerHTML +=
    `<td><button name="${owner[i]}" type="submit" value="${[jsonUserId[i], jsonLeagueId[i]]}">${owner[i]}</button></td>
    <td><button name="${namedTeams[i]}" type="submit" value="${[jsonUserId[i], jsonLeagueId[i]]}">${namedTeams[i]}</button></td>`
    // teamData.innerHTML +=
    // `<td>${team[i]}</td>`
    }
    document.getElementById("leagueUrl").value = "";
    document.getElementById("userName").value = ""; // reset league URL form
  // sleeperData.innerHTML =
  //   `<h2>Teams</h2>
  //   <ol>
  //       <li>Owners: ${owner}</li>
  //       <li>Players: ${players}</li>
  //   </ol>`
}

function addTeamInfoByUserName(document, jsonLeagueId, jsonLeagueNames){
  let teamData = document.getElementById("teamData");
  let ownerData = document.getElementById("ownerData");
  ownerData.innerHTML = `` //resets innerHTML table
  //let teamData = document.getElementById("teamData");
  for (let i=0; jsonLeagueNames.length > i; i++){
    teamData.innerHTML +=
    `<td><button name="${jsonLeagueNames[i]}" type="submit" value="${jsonLeagueId[i]}">${jsonLeagueNames[i]}</button></td>`
    // teamData.innerHTML +=
    // `<td>${team[i]}</td>`
    }
    document.getElementById("leagueUrl").value = "";
    document.getElementById("userName").value = "";
}

function addPlayerInfo(document, userIdofRostersFetch, leagueIdofRostersFetch, listedRosters){
  //for (i=0; i<)
  console.log(userIdofRostersFetch);
  let owners = listedRosters.map (o => o.owner_id);
  let index = owners.indexOf(userIdofRostersFetch);
  console.log(index);
  let players = listedRosters.map (o => o.players);
  console.log(players)
  let sleeperData = document.getElementById("sleeperData");
  let ownerData = document.getElementById("ownerData");
  ownerData.innerHTML = `` //resets innerHTML table
  //let teamData = document.getElementById("teamData");
  for (let i=0; players[index].length > i; i++){
    ownerData.innerHTML +=
    `<td>${players[index][i]}</td>
    <td>22<td>`
    // teamData.innerHTML +=
    // `<td>${team[i]}</td>`
    }
}

// function addRosterInfo(document, playerOnRoster){
//   let sleeperData = document.getElementById("sleeperData");
//   let ownerData = document.getElementById("ownerData");
//   ownerData.innerHTML = `` //resets innerHTML table
//   //let teamData = document.getElementById("teamData");
//   for (let i=0; owner.length > i; i++){
//     ownerData.innerHTML +=
//     `<td><button name="${owner[i]}" type="submit" value="${owner[i]}">${owner[i]}</button></td>
//     <td><a href="#${namedTeams[i]}" onclick="RedirectURL();return false;">${namedTeams[i]}</a></td>`
//     // teamData.innerHTML +=
//     // `<td>${team[i]}</td>`
//     }
// }


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

async function myFetchPlayers() {
  //let selectedTeamPlayers = document.querySelector("").value; // GET ON THIS
  let playersReturned = await fetch(`./nfl.json`).then( function(response) {
      return response.json();
  });
  return playersReturned;
}


function RedirectURL(){
    window.location= createDynamicURL();
}



// fetch(`https://api.sleeper.app/v1/league/${leagueID}`)
//   .then(function() {
//     // handle the response
//   })
//   .catch(function() {
//     // handle the error
//   });

  