window.addEventListener("load", function (){

    let sleeperData = document.getElementById("sleeperData");
    sleeperData.style.visibility = 'hidden';

    let form = document.querySelector("form");
    form.reset(); // reset form and clear values if page refreshed
    form.addEventListener("submit", function(event){
        //form.reset();
        let leagueId = document.querySelector("input[name=leagueUrl]").value;
        //console.log(leagueId);
        formLeagueIdSubmission(document, leagueId, sleeperData, teams);
        event.preventDefault();
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
    });

    // let button = document.querySelector("button");
    // button.addEventListener("click", function(event){
    //     let rosterId;
        
    //     buttonSubmission(document, rosterId, sleeperData, teams);
    //     console.log(rosterId);
    //     event.preventDefault();
    //     let listedPlayers;
    //     let listedPlayersResponse = myFetchPlayers();
    //     listedPlayersResponse.then(function (result){
    //         listedPlayers = result;
    //     }).then(function () {
    //     console.log(listedPlayers);

    //     let playerOnRoster = listedPlayers.map (o => o.full_name);
    //     addRosterInfo(document, playerOnRoster);
    //     })
    // })


});