import { myFetchUsers, myFetchUserIdFromUserName, myFetchLeaguesFromUserIds, myFetchRosters } from './fetch.js';

function userNameSubmission(document, form, userName, sleeperData, teams) {
  sleeperData.style.display = "";
  document.getElementById('ownerData').style.display = "none";
  document.getElementById('teamData').style.display = "";
  document.getElementById('rosterData').style.display = "none";
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
  document.getElementById('teamData').style.visibility = "visible";
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
      //ERROR HANDLING NULL TEAM NAMES WHICH ARISE WHEN OWNERs DON'T SET A CUSTOM NAME
      for (let i=0; i< namedTeams.length; i++){
        if (namedTeams[i] === undefined){
          namedTeams[i] = `Team ${owner[i]}`;
        }
      }

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
  let rosterData = document.getElementById('rosterData');
  ownerData.style.display = "";
  rosterData.innerHTML = ``;
  rosterData.style.display = "none";
  ownerData.innerHTML = `<thead>
                          <tr>
                            <th>Owners</th>
                            <th>Team Names</th>
                          </tr>
                         </thead>
                         <tbody id="ownerDataTable">
                         </tbody>`
  teamData.innerHTML = ``
  let ownerDataTable = document.getElementById("ownerDataTable");
  teamData.style.display = "none"; //resets innerHTML table
  //let teamData = document.getElementById("teamData");
  let ownerRows = `<meta>`;
  for (let i=0; owner.length > i; i++){
    ownerRows +=
    `<tr><td><button name="${owner[i]}" type="submit" value="${[jsonUserId[i], jsonLeagueId[i]]}">${owner[i]}</button></td><td><button name="${namedTeams[i]}" type="submit" value="${[jsonUserId[i], jsonLeagueId[i]]}">${namedTeams[i]}</button></td></tr>`
    // teamData.innerHTML +=
    // `<td>${team[i]}</td>`
    }
    ownerDataTable.innerHTML = ownerRows;
    
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
  let teamData = document.getElementById("teamData");
  let rosterData = document.getElementById('rosterData');
  rosterData.innerHTML = ``;
  ownerData.innerHTML = ``;
  teamData.innerHTML = `<thead>
                        <th>Leagues You Are In</th>
                        </thead>
                        <tbody id="teamDataTable">
                        </tbody>`; //resets innerHTML table
  let teamDataTable = document.getElementById("teamDataTable");  
  for (let i=0; jsonLeagueNames.length > i; i++){
    let teamRows = document.createElement("tr");
    let cell = document.createElement("td");
    cell.innerHTML =
    `<button name="${jsonLeagueNames[i]}" type="submit" value="${jsonLeagueId[i]}">${jsonLeagueNames[i]}</button>`
    teamRows.appendChild(cell);
    teamDataTable.appendChild(teamRows);
    }
  // for (let i=0; jsonLeagueNames.length > i; i++){
  //   teamRows +=
  //   `<tr><td><button name="${jsonLeagueNames[i]}" type="submit" value="${jsonLeagueId[i]}">${jsonLeagueNames[i]}</button></td><tr>`
  //   }
    // teamDataTable.innerHTML = teamRows;
    document.getElementById("leagueUrl").value = "";
    document.getElementById("userName").value = "";
}

function addPlayerInfo(document, userIdofRostersFetch, leagueIdofRostersFetch, listedRosters){

  console.log(userIdofRostersFetch);
  let owners = listedRosters.map (o => o.owner_id);
  let index = owners.indexOf(userIdofRostersFetch);
  console.log(index);
  let players = listedRosters.map (o => o.players);
  
  let playerIndex = players[index];
  console.log(playerIndex);
  
  let sleeperData = document.getElementById("sleeperData");
  let ownerData = document.getElementById("ownerData");
  let teamData = document.getElementById('teamData');
  let rosterData = document.getElementById('rosterData');
  rosterData.style.display = "";
  rosterData.style.visibility = "visible";
  teamData.innerHTML = ``;
  teamData.style.display = "none";
  ownerData.innerHTML = ``;
  ownerData.style.display = "none";
  rosterData.innerHTML = `<thead>
                          <tr>
                            <th>Players</th>
                            <th>Season Total Points</th>
                          </tr>
                          </thead>
                          <tbody id="rosterDataTable">
                          </tbody>`; //resets innerHTML table
  let rosterDataTable = document.getElementById("rosterDataTable");
  
  for (let i=0; players[index].length > i; i++){
    let score = getRandom(50, 480);
    let rosterRows = document.createElement("tr");
    let cell = document.createElement("td");
    cell.innerText = `${players[index][i]}`;
    let cell2 = document.createElement("td");
    cell2.innerText = `${score}`;
    rosterRows.appendChild(cell);
    rosterRows.appendChild(cell2);
    rosterDataTable.appendChild(rosterRows);
    }
    let dataTableRoster = new DataTable('#rosterData', {     // options 
      paging: true
    });
    //makeBSTable(document.getElementById('rosterData'))
}
function getRandom(min, max) {
  let value = (Math.random() * (max - min + 1)) + min;
  return Number.parseFloat(value).toFixed(2);
}

function RedirectURL(){
    window.location= createDynamicURL();
}

// function makeBSTable(otable){
//   var table = $(otable).clone(); console.log(table);
//   table.addClass("table-hover table-bordered table-striped table");
//   var div = $('<div class="table-responsive" />');
//   $(otable).replaceWith(div);
//   div.append(table);
// }

export { userNameSubmission, userIdSubmission, leagueUrlSubmission, ownerSubmission };