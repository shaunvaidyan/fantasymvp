import { myFetchUsers, myFetchUserIdFromUserName, myFetchLeaguesFromUserIds, myFetchRosters, myFetchNflJson, myFetchSeasonScores } from './fetch.js';

function userNameSubmission(document, userName, sleeperData) {
  sleeperData.style.display = "";
  document.getElementById('ownerData').style.display = "none";
  document.getElementById('teamData').style.display = "";
  document.getElementById('rosterData').style.display = "none";
  document.getElementById('subHeaderText').innerHTML = `Sleeper.app League Info`
  if ((document.getElementById('rosterData_wrapper')) !== null){
    document.getElementById('rosterData_wrapper').style.display = "none";
  }
  let userId;
  let userIdResponse = myFetchUserIdFromUserName();
  userIdResponse.then(function (result) {
    userId = result;
  }).then(function () {
    let userIdOutput = userId.user_id;
    let usernameDisplay = userId.display_name;
    //console.log(userIdOutput);
    userIdSubmission(document, usernameDisplay, userIdOutput, sleeperData);
    })
}
function userIdSubmission(document, usernameDisplay, userIdOutput, sleeperData){
  document.getElementById('teamData').style.visibility = "visible";
  let userIdLeagues;
  let userIdLeaguesResponse = myFetchLeaguesFromUserIds(userIdOutput);
  userIdLeaguesResponse.then(function (result){
    userIdLeagues = result;
  }).then(function () {
    let jsonLeagueId = userIdLeagues.map (o => o.league_id);
    let jsonLeagueNames = userIdLeagues.map (o => o.name);
    
    addTeamInfoByUserName(document, jsonLeagueId, jsonLeagueNames, usernameDisplay);
    })
}

function leagueUrlSubmission(document, leagueId) {

  let sleeperData = document.getElementById('sleeperData');
  document.getElementById('subHeaderText').innerHTML = `Sleeper.app League Info`;
  sleeperData.style.visibility = "visible";
  let listedTeams;
   // Set listedTeamsResponse equal to the value returned by calling myFetchUsers()
  let listedTeamsResponse = myFetchUsers(leagueId);
  listedTeamsResponse.then(function (result) {
    listedTeams = result;

    }).then(function () {
      console.log(listedTeams);
        
      let owner = listedTeams.map (o => o.display_name);
      let jsonUserId = listedTeams.map (o => o.user_id);
      let namedTeams = listedTeams.map (o => o.metadata.team_name);
      //ERROR HANDLING NULL TEAM NAMES WHICH ARISE WHEN OWNERs DON'T SET A CUSTOM NAME
      for (let i=0; i< namedTeams.length; i++){
        if (namedTeams[i] === undefined){
          namedTeams[i] = `Team ${owner[i]}`;
        }
      }
      ////////////////////////
      let jsonLeagueId = listedTeams.map (o => o.league_id);
      console.log(leagueId);
      addTeamInfoByLeagueUrl(document, owner, jsonUserId, namedTeams, leagueId, listedTeams);
      })
  
}
function ownerSubmission(document, leagueInfo, sleeperData, teamData) {
  let userIdofRostersFetch = leagueInfo[0]
  let leagueIdofRostersFetch = leagueInfo[1]
  let namedTeam = leagueInfo[2];

  let listedRosters;
  let listedRostersResponse = myFetchRosters(leagueIdofRostersFetch);
  listedRostersResponse.then(function (result) {
    listedRosters = result;
  }).then(function () {
    console.log(listedRosters);
    processPlayerInfo(document, userIdofRostersFetch, leagueIdofRostersFetch, namedTeam, listedRosters);

    sleeperData.style.visibility = "visible";
  })
}
function addTeamInfoByLeagueUrl(document, owner, jsonUserId, namedTeams, leagueId, listedTeams){
  let sleeperData = document.getElementById("sleeperData");
  let ownerData = document.getElementById("ownerData");
  let teamData = document.getElementById("teamData");
  let rosterData = document.getElementById('rosterData');
  sleeperData.style.display = "";
  ownerData.style.display = "";
  rosterData.innerHTML = ``;
  rosterData.style.display = "none";
  if ((document.getElementById('rosterData_wrapper')) !== null){
    document.getElementById('rosterData_wrapper').style.display = "none";
  }
  ownerData.innerHTML = `<thead>
                          <tr>
                            <th>Owners</th>
                            <th>Team Names</th>
                          </tr>
                         </thead>
                         <tbody id="ownerDataTable">
                         </tbody>`
  teamData.innerHTML = ``
  teamData.style.display = "none"; //resets innerHTML table

  ownerDataTable.addEventListener("click", function(event){
    let target = event.target;
    let leagueInfo = target.value.split(",");

    ownerSubmission(document, leagueInfo, sleeperData);
    event.preventDefault();
  });
    
  let listedRosterRecords;
  let fetchRecord = myFetchRosters(leagueId);
  fetchRecord.then(function (result) {
    listedRosterRecords = result;
    //console.log(listedRosterRecords);
  }).then(function () {
    listedRosterRecords.map (o => o.metadata.record);
    let recordRaw = listedRosterRecords.map (o => o.metadata.record);
    console.log(recordRaw);
  })
  
  let ownerRows = `<meta>`;
  for (let i=0; owner.length > i; i++){
    ownerRows +=
    `<tr><td><button name="${owner[i]}" type="submit" value="${[jsonUserId[i], leagueId, namedTeams[i]]}">${owner[i]}</button></td><td><button name="${namedTeams[i]}" type="submit" value="${[jsonUserId[i], leagueId, namedTeams[i]]}">${namedTeams[i]}</button></td></tr>`
    }
    ownerDataTable.innerHTML = ownerRows;
    
    document.getElementById("leagueUrl").value = "";
    document.getElementById("userName").value = ""; // reset league URL form
}

function addTeamInfoByUserName(document, jsonLeagueId, jsonLeagueNames, usernameDisplay){
  let sleeperData = document.getElementById("sleeperData");
  let ownerData = document.getElementById("ownerData");
  let teamData = document.getElementById("teamData");
  let rosterData = document.getElementById('rosterData');
  rosterData.innerHTML = ``;
  ownerData.innerHTML = ``;
  document.getElementById('subHeaderText').innerHTML = `Leagues That ${usernameDisplay} Is In`
  teamData.innerHTML = `<thead>
                        <th>Choose A League</th>
                        </thead>
                        <tbody id="teamDataTable">
                        </tbody>`; //resets innerHTML table
  let teamDataTable = document.getElementById("teamDataTable");
  teamDataTable.addEventListener("click", function(event){

    let target = event.target;
    let leagueId = target.value;

    
    leagueUrlSubmission(document, leagueId);
    
    event.preventDefault();
  }); 
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
function processPlayerInfo(document, userIdofRostersFetch, leagueIdofRostersFetch, namedTeam, listedRosters){
  let owners = listedRosters.map (o => o.owner_id);
  let index = owners.indexOf(userIdofRostersFetch);
  let players = listedRosters.map (o => o.players);
  
  let playerIndex = players[index];
  let listOfPlayers;
  let nflPlayersResponse = myFetchNflJson();
  let playerNamesArray = [];
  let playerPositionsArray = [];
  nflPlayersResponse.then(function (result) {
    listOfPlayers = result;
  }).then(function () {
    for (let i=0; i < playerIndex.length ; i++){
      if (!/[^a-zA-Z]/.test(playerIndex[i])){
        playerNamesArray.push(playerIndex[i])
        playerPositionsArray.push("DEF")
      } else {
        playerNamesArray.push((listOfPlayers[playerIndex[i]].full_name))
        playerPositionsArray.push((listOfPlayers[playerIndex[i]].position))
      }

    }
    processSeasonScores(document, namedTeam, userIdofRostersFetch, leagueIdofRostersFetch, listedRosters, playerNamesArray, playerPositionsArray, playerIndex);
  });
}

const setValueToField = (fields, value) => {
  const reducer = (acc, item, index, arr) => ({ [item]: index + 1 < arr.length ? acc : value });
  return fields.reduceRight(reducer, {});
};

// function processSeasonScores(document, userIdofRostersFetch, leagueIdofRostersFetch, listedRosters, playerNamesArray)
var playerObject = {};
function processSeasonScores(document, namedTeam, userIdofRostersFetch, leagueIdofRostersFetch, listedRosters, playerNamesArray, playerPositionsArray, playerIndex){
  let seasonYear = 2021;
  let seasonScoresResponse = myFetchSeasonScores(seasonYear);
  let listSeasonScores;
  let defaultOffensivePlayerScore = {
      "Bye": 0,
      "Pts": 0,
      "PassAtt": 0,
      "PassCmp": 0,
      "PassYds": 0,
      "PassTD": 0,
      "PassInt": 0,
      "Pass2Pt": 0,
      "RushAtt": 0,
      "RushYds": 0,
      "RushTD": 0,
      "Rush2Pt": 0,
      "Rec": 0,
      "RecYds": 0,
      "RecTD": 0,
      "Rec2Pt": 0,
      "FL": 0,
      "FLTD": 0
  }
  let defaultKickerScore = {
      "Bye": 0,
      "Pts*": 0,
      "XPA": 0,
      "XPM": 0,
      "FGA": 0,
      "FGM": 0,
      "50+": 0
  }
  
  seasonScoresResponse.then(function (result){
    listSeasonScores = result;
  }).then(function () {
    for (let i=0; i < playerNamesArray.length; i++){
      if(listSeasonScores[playerNamesArray[i]] === undefined && (playerPositionsArray[i] !== 'K')){
        playerObject[playerNamesArray[i]] = setValueToField([`${seasonYear}_statistics`],defaultOffensivePlayerScore);
        playerObject[playerNamesArray[i]]['position'] = playerPositionsArray[i];
      } else if (listSeasonScores[playerNamesArray[i]] === undefined && (playerPositionsArray[i] === 'K')){
        playerObject[playerNamesArray[i]] = setValueToField([`${seasonYear}_statistics`],defaultKickerScore);
        playerObject[playerNamesArray[i]]['position'] = playerPositionsArray[i];
      } else {
        playerObject[playerNamesArray[i]] = setValueToField([`${seasonYear}_statistics`],listSeasonScores[playerNamesArray[i]]);
        playerObject[playerNamesArray[i]]['position'] = playerPositionsArray[i];
      }// playerObject[playerNamesArray[i]] = (listSeasonScores[playerNamesArray[i]])
    }
    console.log(playerObject);
    // for
    addPlayerListInfo(document, namedTeam, userIdofRostersFetch, leagueIdofRostersFetch, listedRosters, playerNamesArray, playerPositionsArray, playerIndex, playerObject);
  })

}
function addPlayerListInfo(document, namedTeam, userIdofRostersFetch, leagueIdofRostersFetch, listedRosters, playerNamesArray, playerPositionsArray, playerIndex, playerObject){
  
  let sleeperData = document.getElementById("sleeperData");
  let ownerData = document.getElementById("ownerData");
  let teamData = document.getElementById('teamData');
  let rosterData = document.getElementById('rosterData');
  rosterData.style.display = "";
  document.getElementById('rosterData').style.display = "";
  rosterData.style.visibility = "visible";
  document.getElementById('rosterData').style.visibility = "visible";
  teamData.innerHTML = ``;
  teamData.style.display = "none";
  ownerData.innerHTML = ``;
  ownerData.style.display = "none";
  document.getElementById('subHeaderText').innerHTML = `${namedTeam} -- Roster`
  rosterData.innerHTML = `<thead>
                          <tr>
                            <th>Avatars</th>
                            <th>Position</th>
                            <th>Players</th>
                            <th>Season Total Points</th>
                            <th><button id="playerSelector">View Selected Player(s) Stats</button></th>
                          </tr>
                          </thead>
                          <tbody id="rosterDataTable">
                          </tbody>`; //resets innerHTML table
  let rosterDataTable = document.getElementById('rosterDataTable');
  for (let i=0; playerNamesArray.length > i; i++){
    let score = playerObject[playerNamesArray[i]]["2021_statistics"]["Pts"];
    let rosterRows = document.createElement("tr");
    let cellCheckBox = document.createElement("td");
    cellCheckBox.innerHTML = `<input type="checkbox" name="chkbx" value="${playerNamesArray[i]}">`
    let cellAvatar = document.createElement("td");
    if (!/[^a-zA-Z]/.test(playerIndex[i])){
      cellAvatar.innerHTML = `<img src="https://sleepercdn.com/images/team_logos/nfl/${playerIndex[i].toLowerCase()}.png" width="100" height="83">`
    } else {
      cellAvatar.innerHTML = `<img src="https://sleepercdn.com/content/nfl/players/thumb/${playerIndex[i]}.jpg" width="125" height="83">`
    }
    let cellPlayer = document.createElement("td");
    cellPlayer.innerText = `${playerNamesArray[i]}`;
    let cellScore = document.createElement("td");
    cellScore.innerText = `${score}`;
    let cellPosition = document.createElement("td");
    cellPosition.innerText = `${playerPositionsArray[i]}`;
    rosterRows.appendChild(cellAvatar);
    rosterRows.appendChild(cellPosition);
    rosterRows.appendChild(cellPlayer);
    rosterRows.appendChild(cellScore);
    rosterRows.appendChild(cellCheckBox);
    rosterDataTable.appendChild(rosterRows);
    }
    let dataTableRoster = new DataTable('#rosterData', {     // options 
      destroy: true,
      select: true,
      paging: true,
      columnDefs: [
        { orderable: false, targets: 0 },
        { orderable: false, targets: 4 }
      ],
      order: [ 3, 'desc' ]
    });
      // let playerSelectionButton = document.createElement("button");
      // playerSelectionButton.innerText = `View Selected Player(s) Detailed Stats`;
      // document.getElementById('rosterData_filter').appendChild(playerSelectionButton);
  //   rosterDataTable.addEventListener("click", function(e){
  //     // let target = event.target;
  //     // let leagueInfo = target.value.split(",");
  //     rosterSubmission(e);
      
  //     e.preventDefault();
  // });
    //makeBSTable(document.getElementById('rosterData'))
}
function getRandom(min, max) {
  let value = (Math.random() * (max - min + 1)) + min;
  return Number.parseFloat(value).toFixed(2);
}

function RedirectURL(){
    window.location= createDynamicURL();
}

function rosterSubmission(e) {
  // let target = e.target;
  // console.log(target.parentNode.childNodes);
  // let playerClicked;
  // if (target.parentNode.childNodes[0].nodeName === 'TD'){
  //   playerClicked = target.parentNode.childNodes[3].innerText;
  // } else if (target.parentNode.childNodes[0].nodeName === 'IMG'){
  //   playerClicked = target.parentNode.childNodes[0].parentNode.nextElementSibling.nextElementSibling.innerText;
  // }
  // console.log(playerClicked);

  // console.log(playerObject);
  // console.log(Object.keys(playerObject));
  // console.log(Object.entries(playerObject));
}

// function makeBSTable(otable){
//   var table = $(otable).clone(); console.log(table);
//   table.addClass("table-hover table-bordered table-striped table");
//   var div = $('<div class="table-responsive" />');
//   $(otable).replaceWith(div);
//   div.append(table);
// }

export { userNameSubmission, userIdSubmission, leagueUrlSubmission, ownerSubmission };