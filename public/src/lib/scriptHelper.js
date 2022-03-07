import { myFetchUsers, myFetchUserIdFromUserName, myFetchLeaguesFromUserIds, myFetchRosters, myFetchNflJson, myFetchSeasonScores } from './fetch.js';

function userNameSubmission(document, userName, sleeperData) {
  document.getElementById('playerComparison').style.display = "none";
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
    .catch(error => alert('Invalid UserName'));
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

function leagueUrlSubmission(document, leagueId, leagueName) {
  if ((!/[^a-zA-Z]/.test(leagueId))){
    alert("Invalid league URL!");
  } else {
  let sleeperData = document.getElementById('sleeperData');
  document.getElementById('playerComparison').style.display = "none";
  document.getElementById('subHeaderText').innerHTML = `Sleeper.app League Info <button id="backButtonTeamData"">Back</button>`;
  sleeperData.style.visibility = "visible";
  let listedTeams;
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
      ////////////////////////
      let jsonLeagueId = listedTeams.map (o => o.league_id);
      //console.log(leagueId);
      addTeamInfoByLeagueUrl(document, owner, jsonUserId, namedTeams, leagueId, listedTeams);
      })
      .catch(error => alert('Invalid LeagueID'));
    }
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
var htmlObject = {};
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
    
  let listedRosterRecords;
  let fetchRecord = myFetchRosters(leagueId);
  fetchRecord.then(function (result) {
    listedRosterRecords = result;
    //console.log(listedRosterRecords);
  }).then(function () {
    listedRosterRecords.map (o => o.metadata.record);
    let recordRaw = listedRosterRecords.map (o => o.metadata.record);
    //console.log(recordRaw);
  })
  .catch(error => alert('Invalid LeagueID'));
  
  let ownerRows = `<meta>`;
  for (let i=0; owner.length > i; i++){
    ownerRows +=
    `<tr><td><button name="${owner[i]}" type="submit" value="${[jsonUserId[i], leagueId, namedTeams[i]]}">${owner[i]}</button></td><td><button name="${namedTeams[i]}" type="submit" value="${[jsonUserId[i], leagueId, namedTeams[i]]}">${namedTeams[i]}</button></td></tr>`
    }
    ownerDataTable.innerHTML = ownerRows;
    
  document.getElementById("leagueUrl").value = "";
  document.getElementById("userName").value = ""; // reset league URL form
  htmlObject['ownerData'] = (document.getElementById('sleeperData').innerHTML)
  document.getElementById('backButtonTeamData').addEventListener("click", function(event){
    navBackToTeamData()
  });
  ownerDataTable.addEventListener("click", function(event){
    let target = event.target;
    let leagueInfo = target.value.split(",");
  
    ownerSubmission(document, leagueInfo, sleeperData);
    event.preventDefault();
  });
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
  
  for (let i=0; jsonLeagueNames.length > i; i++){
    let teamRows = document.createElement("tr");
    let cell = document.createElement("td");
    cell.innerHTML =
    `<button name="${jsonLeagueNames[i]}" type="submit" value="${[jsonLeagueId[i], jsonLeagueNames[i]]}">${jsonLeagueNames[i]}</button>`
    teamRows.appendChild(cell);
    teamDataTable.appendChild(teamRows);
    }
  htmlObject['teamData'] = (document.getElementById('sleeperData').innerHTML)
  teamDataTable.addEventListener("click", function(event){

    let target = event.target;
    let value = target.value.split(",");
    let leagueId = value[0];
    let leagueName = value[1];
  
      
    leagueUrlSubmission(document, leagueId, leagueName);
      
    event.preventDefault();
  });
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
    // console.log(playerObject);
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
  document.getElementById('subHeaderText').innerHTML = `${namedTeam} -- Roster <button id="backButtonOwnerData"">Back</button`

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
    if (!/[^a-zA-Z]/.test(playerIndex[i])){ // Error handling different avatar urls
      cellAvatar.innerHTML = `<img id="nflAvatar" src="https://sleepercdn.com/images/team_logos/nfl/${playerIndex[i].toLowerCase()}.png">`
    } else {
      cellAvatar.innerHTML = `<img src="https://sleepercdn.com/content/nfl/players/thumb/${playerIndex[i]}.jpg">`
    }
    document.getElementById('backButtonOwnerData').addEventListener("click", function(event){
      navBackToOwnerData()
    });
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
      htmlObject['rosterData'] = (document.getElementById('sleeperData').innerHTML)
      $('button').on('click', function () {
      let data = dataTableRoster
      .rows( function ( idx, data, node ) {
          return $(node).find('input[type="checkbox"][name="chkbx"]').prop('checked');
      } )
      .data()
      .toArray();

      populatePlayerComparison(data);
    })  
}
function populatePlayerComparison(data) {
  console.log(data);
  document.getElementById('rosterData_wrapper').style.display = "none";
  let playerComparisonRows = `<meta>`;
  for (let i=0; i < data.length; i++){
    playerComparisonRows +=
  `<li class="player">
  <div class="top-info">
  <div class="check"></div>
  ${(data[i])[0]}
  <h3>${(data[i])[2]} - ${(data[i])[1]} </h3>
  </div> <!-- .top-info -->

  <ul class="cd-stats-list">
    <li>${playerObject[((data[i])[2])]["2021_statistics"]["Pts"]}</li>
    <li>${playerObject[((data[i])[2])]["2021_statistics"]["PassYds"]}</li>
    <li>${playerObject[((data[i])[2])]["2021_statistics"]["PassTD"]}</li>
    <li>${playerObject[((data[i])[2])]["2021_statistics"]["RushYds"]}</li>
    <li>${playerObject[((data[i])[2])]["2021_statistics"]["RushTD"]}</li>
    <li>${playerObject[((data[i])[2])]["2021_statistics"]["Rec"]}</li>
    <li>${playerObject[((data[i])[2])]["2021_statistics"]["RecYds"]}</li>
    <li>${playerObject[((data[i])[2])]["2021_statistics"]["RecTD"]}</li>
    <!-- other values here -->
  </ul>
  </li> <!-- .player -->`
  }
  document.getElementById('playerComparisonTable').innerHTML = playerComparisonRows;
  document.getElementById('playerComparison').style.display = "block";
  
  $(function() {
    function playersTable( element ) {
      this.element = element;
      this.table = this.element.children('.cd-players-table');
      this.tableHeight = this.table.height();
      this.playersWrapper = this.table.children('.cd-players-wrapper');
      this.tableColumns = this.playersWrapper.children('.cd-players-columns');
      this.players = this.tableColumns.children('.player');
      this.playersNumber = this.players.length;
      this.playerWidth = this.players.eq(0).width();
      this.playersTopInfo = this.table.find('.top-info');
      this.statsTopInfo = this.table.children('.stats').children('.top-info');
      this.topInfoHeight = this.statsTopInfo.innerHeight() + 30;
      this.leftScrolling = false;
      this.filterBtn = this.element.find('.filter');
      this.resetBtn = this.element.find('.reset');
      this.filtering = false,
      this.selectedplayersNumber = 0;
      this.filterActive = false;
      this.navigation = this.table.children('.cd-table-navigation');
      // bind table events
      this.bindEvents();
    }
  
    playersTable.prototype.bindEvents = function() {
      let self = this;
      //detect scroll left inside producst table
      self.playersWrapper.on('scroll', function(){
        if(!self.leftScrolling) {
          self.leftScrolling = true;
          (!window.requestAnimationFrame) ? setTimeout(function(){self.updateLeftScrolling();}, 250) : window.requestAnimationFrame(function(){self.updateLeftScrolling();});
        }
      });
      //select single player to filter
      self.players.on('click', '.top-info', function(){
        let player = $(this).parents('.player');
        if( !self.filtering && player.hasClass('selected') ) {
          player.removeClass('selected');
          self.selectedplayersNumber = self.selectedplayersNumber - 1;
          self.updateFilterBtn();
        } else if( !self.filtering && !player.hasClass('selected') ) {
          player.addClass('selected');
          self.selectedplayersNumber = self.selectedplayersNumber + 1;
          self.updateFilterBtn();
        }
      });
      //filter players
      self.filterBtn.on('click', function(event){
        event.preventDefault();
        if(self.filterActive) {
          self.filtering =  true;
          self.showSelection();
          self.filterActive = false;
          self.filterBtn.removeClass('active');
        }
      });
      //reset player selection
      self.resetBtn.on('click', function(event){
        event.preventDefault();
        if( self.filtering ) {
          self.filtering =  false;
          self.resetSelection();
        } else {
          self.players.removeClass('selected');
        }
        self.selectedplayersNumber = 0;
        self.updateFilterBtn();
      });
      //scroll inside players table
      this.navigation.on('click', 'a', function(event){
        event.preventDefault();
        self.updateSlider( $(event.target).hasClass('next') );
      });
    }
  
    playersTable.prototype.updateFilterBtn = function() {
      //show/hide filter btn
      if( this.selectedplayersNumber >= 2 ) {
        this.filterActive = true;
        this.filterBtn.addClass('active');
      } else {
        this.filterActive = false;
        this.filterBtn.removeClass('active');
      }
    }
  
    playersTable.prototype.updateLeftScrolling = function() {
      let totalTableWidth = parseInt(this.tableColumns.eq(0).outerWidth(true)),
        tableViewport = parseInt(this.element.width()),
        scrollLeft = this.playersWrapper.scrollLeft();
  
      ( scrollLeft > 0 ) ? this.table.addClass('scrolling') : this.table.removeClass('scrolling');
  
      if( this.table.hasClass('top-fixed') && checkMQ() == 'desktop') {
        setTranformX(this.playersTopInfo, '-'+scrollLeft);
        setTranformX(this.statsTopInfo, '0');
      }
  
      this.leftScrolling =  false;
  
      this.updateNavigationVisibility(scrollLeft);
    }
  
    playersTable.prototype.updateNavigationVisibility = function(scrollLeft) {
      ( scrollLeft > 0 ) ? this.navigation.find('.prev').removeClass('inactive') : this.navigation.find('.prev').addClass('inactive');
      ( scrollLeft < this.tableColumns.outerWidth(true) - this.playersWrapper.width() && this.tableColumns.outerWidth(true) > this.playersWrapper.width() ) ? this.navigation.find('.next').removeClass('inactive') : this.navigation.find('.next').addClass('inactive');
    }
  
    playersTable.prototype.updateTopScrolling = function(scrollTop) {
      let offsetTop = this.table.offset().top,
        tableScrollLeft = this.playersWrapper.scrollLeft();
      
      if ( offsetTop <= scrollTop && offsetTop + this.tableHeight - this.topInfoHeight >= scrollTop ) {
        //fix players top-info && arrows navigation
        if( !this.table.hasClass('top-fixed') && $(document).height() > offsetTop + $(window).height() + 200) { 
          this.table.addClass('top-fixed').removeClass('top-scrolling');
          if( checkMQ() == 'desktop' ) {
            this.playersTopInfo.css('top', '0');
            this.navigation.find('a').css('top', '0px');
          }
        }
  
      } else if( offsetTop <= scrollTop ) {
        //player top-info && arrows navigation -  scroll with table
        this.table.removeClass('top-fixed').addClass('top-scrolling');
        if( checkMQ() == 'desktop' )  {
          this.playersTopInfo.css('top', (this.tableHeight - this.topInfoHeight) +'px');
          this.navigation.find('a').css('top', (this.tableHeight - this.topInfoHeight) +'px');
        }
      } else {
        //player top-info && arrows navigation -  reset style
        this.table.removeClass('top-fixed top-scrolling');
        this.playersTopInfo.attr('style', '');
        this.navigation.find('a').attr('style', '');
      }
  
      this.updateLeftScrolling();
    }
  
    playersTable.prototype.updateProperties = function() {
      this.tableHeight = this.table.height();
      this.playerWidth = this.players.eq(0).width();
      this.topInfoHeight = this.statsTopInfo.innerHeight() + 30;
      this.tableColumns.css('width', this.playerWidth*this.playersNumber + 'px');
    }
  
    playersTable.prototype.showSelection = function() {
      this.element.addClass('filtering');
      this.filterplayers();
    }
  
    playersTable.prototype.resetSelection = function() {
      this.tableColumns.css('width', this.playerWidth*this.playersNumber + 'px');
      this.element.removeClass('no-player-transition');
      this.resetplayersVisibility();
    }
  
    playersTable.prototype.filterplayers = function() {
      let self = this,
        containerOffsetLeft = self.tableColumns.offset().left,
        scrollLeft = self.playersWrapper.scrollLeft(),
        selectedplayers = this.players.filter('.selected'),
        numberplayers = selectedplayers.length;
  
      selectedplayers.each(function(index){
        let player = $(this),
          leftTranslate = containerOffsetLeft + index*self.playerWidth + scrollLeft - player.offset().left;
        setTranformX(player, leftTranslate);
        
        if(index == numberplayers - 1 ) {
          player.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
            setTimeout(function(){
              self.element.addClass('no-player-transition');
            }, 50);
            setTimeout(function(){
              self.element.addClass('filtered');
              self.playersWrapper.scrollLeft(0);
              self.tableColumns.css('width', self.playerWidth*numberplayers + 'px');
              selectedplayers.attr('style', '');
              player.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
              self.updateNavigationVisibility(0);
            }, 100);
          });
        }
      });
  
      if( $('.no-csstransitions').length > 0 ) {
        //browser not supporting css transitions
        self.element.addClass('filtered');
        self.playersWrapper.scrollLeft(0);
        self.tableColumns.css('width', self.playerWidth*numberplayers + 'px');
        selectedplayers.attr('style', '');
        self.updateNavigationVisibility(0);
      }
    }
    
    playersTable.prototype.resetplayersVisibility = function() {
      let self = this,
        containerOffsetLeft = self.tableColumns.offset().left,
        selectedplayers = this.players.filter('.selected'),
        numberplayers = selectedplayers.length,
        scrollLeft = self.playersWrapper.scrollLeft(),
        n = 0;
  
      self.element.addClass('no-player-transition').removeClass('filtered');
  
      self.players.each(function(index){
        let player = $(this);
        if (player.hasClass('selected')) {
          n = n + 1;
          let leftTranslate = (-index + n - 1)*self.playerWidth;
          setTranformX(player, leftTranslate);
        }
      });
  
      setTimeout(function(){
        self.element.removeClass('no-player-transition filtering');
        setTranformX(selectedplayers, '0');
        selectedplayers.removeClass('selected').attr('style', '');
      }, 50);
    }
  
    playersTable.prototype.updateSlider = function(bool) {
      let scrollLeft = this.playersWrapper.scrollLeft();
      scrollLeft = ( bool ) ? scrollLeft + this.playerWidth : scrollLeft - this.playerWidth;
  
      if( scrollLeft < 0 ) scrollLeft = 0;
      if( scrollLeft > this.tableColumns.outerWidth(true) - this.playersWrapper.width() ) scrollLeft = this.tableColumns.outerWidth(true) - this.playersWrapper.width();
      
      this.playersWrapper.animate( {scrollLeft: scrollLeft}, 200 );
    }
  
    let comparisonTables = [];
    $('.cd-players-comparison-table').each(function(){
      //create a playersTable object for each .cd-players-comparison-table
      comparisonTables.push(new playersTable($(this)));
    });
    
    let windowScrolling = false;
    //detect window scroll - fix player top-info on scrolling
    $(window).on('scroll', function(){
      if(!windowScrolling) {
        windowScrolling = true;
        (!window.requestAnimationFrame) ? setTimeout(checkScrolling, 250) : window.requestAnimationFrame(checkScrolling);
      }
    });
  
    let windowResize = false;
    //detect window resize - reset .cd-players-comparison-table properties
    $(window).on('resize', function(){
      if(!windowResize) {
        windowResize = true;
        (!window.requestAnimationFrame) ? setTimeout(checkResize, 250) : window.requestAnimationFrame(checkResize);
      }
    });
  
    function checkScrolling(){
      let scrollTop = $(window).scrollTop();
      comparisonTables.forEach(function(element){
        element.updateTopScrolling(scrollTop);
      });
  
      windowScrolling = false;
    }
  
    function checkResize(){
      comparisonTables.forEach(function(element){
        element.updateProperties();
      });
  
      windowResize = false;
    }
  
    function checkMQ() {
      //check if mobile or desktop device
      return window.getComputedStyle(comparisonTables[0].element.get(0), '::after').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
    }
  
    function setTranformX(element, value) {
      element.css({
          '-moz-transform': 'translateX(' + value + 'px)',
          '-webkit-transform': 'translateX(' + value + 'px)',
        '-ms-transform': 'translateX(' + value + 'px)',
        '-o-transform': 'translateX(' + value + 'px)',
        'transform': 'translateX(' + value + 'px)'
      });
    }
    htmlObject['playerComparison'] = (document.getElementById('sleeperData').innerHTML)
    //console.log(htmlObject['rosterData']);
  });

}
function getRandom(min, max) {
  let value = (Math.random() * (max - min + 1)) + min;
  return Number.parseFloat(value).toFixed(2);
}

function RedirectURL(){
    window.location= createDynamicURL();
}

function navBackToTeamData() {
  document.getElementById('sleeperData').innerHTML = `${htmlObject['teamData']}`
  document.getElementById('subHeaderText').innerHTML = `Sleeper.app League Info`
  teamDataTable.addEventListener("click", function(event){

    let target = event.target;
    let value = target.value.split(",");
    let leagueId = value[0];
    let leagueName = value[1];
  
      
    leagueUrlSubmission(document, leagueId, leagueName);
      
    event.preventDefault();
  });
}

function navBackToOwnerData() {
  document.getElementById('sleeperData').innerHTML = `${htmlObject['ownerData']}`
  document.getElementById('subHeaderText').innerHTML = `Sleeper.app League Info <button id="backButtonTeamData"">Back</button>`;
  document.getElementById('backButtonTeamData').addEventListener("click", function(event){
    navBackToTeamData()
  });
  ownerDataTable.addEventListener("click", function(event){
    let target = event.target;
    let leagueInfo = target.value.split(",");
  
    ownerSubmission(document, leagueInfo, sleeperData);
    event.preventDefault();
  });
}


export { userNameSubmission, userIdSubmission, leagueUrlSubmission, ownerSubmission };