//let leagueId = 787027217543708672; // build function to pass League ID from form later

function userNameSubmission(document, form, userName, sleeperData, teams) {
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
    userIdSubmission(document, form, usernameOutput, userIdOutput, sleeperData, teams);
    })
}
function userIdSubmission(document, form, usernameOutput, userIdOutput, sleeperData, teams){
  sleeperData.style.visibility = "visible";
  let userIdLeagues;
  let userIdLeaguesResponse = myFetchLeaguesFromUserIds(userIdOutput);
  userIdLeaguesResponse.then(function (result){
    userIdLeagues = result;
  }).then(function () {
    let jsonLeagueId = userIdLeagues.map (o => o.league_id);
    let jsonLeagueNames = userIdLeagues.map (o => o.name);
    console.log(jsonLeagueNames);
    addTeamInfoByUserName(document, jsonLeagueId, jsonLeagueNames);
    })
}

function leagueUrlSubmission(document, form, leagueId, sleeperData, teams) {

  console.log(leagueId);
  if(leagueId = ""){
    ownerData.style.visibility = "hidden"
  }
  sleeperData.style.visibility = "visible";
  let listedTeams;
   // Set listedTeamsResponse equal to the value returned by calling myFetchUsers()
  let listedTeamsResponse = myFetchUsers();
  listedTeamsResponse.then(function (result) {
    listedTeams = result;

    }).then(function () {
      //console.log(listedTeams);
        
      let owner = listedTeams.map (o => o.display_name);
      let namedTeams = listedTeams.map (o => o.metadata.team_name);
      let jsonLeagueId = listedTeams.map (o => o.league_id);
      addTeamInfoByLeagueUrl(document, owner, namedTeams, jsonLeagueId);
      })
  
  //console.log(teams)
}
function buttonSubmission(document, leagueId, sleeperData, teams) {

  //let leagueId = leagueUrl.value;

  //reset visual elements of form

  sleeperData.style.visibility = "visible";
  //console.log(teams)
}
function addTeamInfoByLeagueUrl(document, owner, namedTeams, jsonLeagueId){
  let sleeperData = document.getElementById("sleeperData");
  let ownerData = document.getElementById("ownerData");
  ownerData.innerHTML = `` //resets innerHTML table
  //let teamData = document.getElementById("teamData");
  for (let i=0; owner.length > i; i++){
    ownerData.innerHTML +=
    `<td><button name="${owner[i]}" id="${owner[i]}" type="submit" value="${owner[i]}">${owner[i]}</button></td>
    <td><a href="#${namedTeams[i]}" onclick="RedirectURL();return false;">${namedTeams[i]}</a></td>`
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
  let sleeperData = document.getElementById("sleeperData");
  let ownerData = document.getElementById("ownerData");
  ownerData.innerHTML = `` //resets innerHTML table
  //let teamData = document.getElementById("teamData");
  for (let i=0; jsonLeagueNames.length > i; i++){
    ownerData.innerHTML +=
    `<td><button name="${jsonLeagueNames[i]}" id="leagueSelectors" type="submit" value="${jsonLeagueId[i]}">${jsonLeagueNames[i]}</button></td>`
    // teamData.innerHTML +=
    // `<td>${team[i]}</td>`
    }
     
  // sleeperData.innerHTML =
  //   `<h2>Teams</h2>
  //   <ol>
  //       <li>Owners: ${owner}</li>
  //       <li>Players: ${players}</li>
  //   </ol>`
}

function addRosterInfo(document, playerOnRoster){
  let sleeperData = document.getElementById("sleeperData");
  let ownerData = document.getElementById("ownerData");
  ownerData.innerHTML = `` //resets innerHTML table
  //let teamData = document.getElementById("teamData");
  for (let i=0; owner.length > i; i++){
    ownerData.innerHTML +=
    `<td><button name="${owner[i]}" type="submit" value="${owner[i]}">${owner[i]}</button></td>
    <td><a href="#${namedTeams[i]}" onclick="RedirectURL();return false;">${namedTeams[i]}</a></td>`
    // teamData.innerHTML +=
    // `<td>${team[i]}</td>`
    }
     
  // sleeperData.innerHTML =
  //   `<h2>Teams</h2>
  //   <ol>
  //       <li>Owners: ${owner}</li>
  //       <li>Players: ${players}</li>
  //   </ol>`
}
async function myFetchUsers() {
  let leagueId = document.querySelector("input[name=leagueUrl]").value; 
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
  let leagueIdsReturned = await fetch(`https://api.sleeper.app/v1/user/${userIdOutput}/leagues/nfl/2022`).then( function(response) {
    return response.json();
  });
  return leagueIdsReturned;
}

function addRosterInfo(document, owner, namedTeams, jsonLeagueId){
  

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

  