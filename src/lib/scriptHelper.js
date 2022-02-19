//let leagueId = 787027217543708672; // build function to pass League ID from form later


function formLeagueIdSubmission(document, leagueId, sleeperData, teams) {

  //let leagueId = leagueUrl.value;

  //reset visual elements of form

  sleeperData.style.visibility = "visible";
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
     
  // sleeperData.innerHTML =
  //   `<h2>Teams</h2>
  //   <ol>
  //       <li>Owners: ${owner}</li>
  //       <li>Players: ${players}</li>
  //   </ol>`
}

function addTeamInfoByUserName(document, owner, namedTeams, jsonLeagueId){
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
  return teamsReturned;
  
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

  