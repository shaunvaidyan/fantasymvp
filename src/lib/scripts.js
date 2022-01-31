window.addEventListener("load", function (){

    let list = document.getElementById("teams");
    list.style.visibility = 'hidden';

    let form = document.querySelector("form");
    form.reset(); // reset form and clear values if page refreshed
    form.addEventListener("submit", function(event){

        let teams = document.querySelector("input[name=leagueUrl]").value;

        formSubmission(document, list, teams);
        event.preventDefault();
    });
   let listedTeams;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedTeamsResponse = myFetch();
   listedTeamsResponse.then(function (result) {
        listedTeams = result;
        console.log(listedTeams);
   }).then(function () {
    console.log(listedTeams);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        
        let owner = listedTeams.map (o => o.owner_id);
        let players = listedTeams.map (o => o.players);

        addTeamInfo(document, owner, players);
   })

});