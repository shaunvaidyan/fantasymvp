window.addEventListener("load", function (){

    let sleeperData = document.getElementById("sleeperData");
    sleeperData.style.visibility = 'hidden';

    let form = document.querySelector("form");
    form.reset(); // reset form and clear values if page refreshed
    form.addEventListener("submit", function(event){

        var leagueId = document.querySelector("input[name=leagueUrl]").value;
        console.log(leagueId);
        formSubmission(document, leagueId, sleeperData, teams);
        event.preventDefault();
    });
   let listedTeams;
   // Set listedTeamsResponse equal to the value returned by calling myFetch()
   let listedTeamsResponse = myFetch();
   listedTeamsResponse.then(function (result) {
        listedTeams = result;
        console.log(listedTeams);
   }).then(function () {
    console.log(listedTeams);
        
        let owner = listedTeams.map (o => o.owner_id);
        let players = listedTeams.map (o => o.players);
        addTeamInfo(document, owner, players);
   })

});