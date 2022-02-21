window.addEventListener("load", function (){

    let sleeperData = document.getElementById("sleeperData");
    sleeperData.style.visibility = 'hidden';

    let form = document.querySelector("form");
    const leagueSubmit = document.getElementById('leagueSubmit');
    const userNameSubmit = document.getElementById('userNameSubmit');
    form.reset(); // reset form and clear values if page refreshed

    //form.addEventListener("submit", function(event){
    leagueSubmit.addEventListener("click", function(event){
        //form.reset();
        let leagueId = document.querySelector("input[name=leagueUrl]").value;
        //let userName = document.querySelector("input[name=userName]").value;
        
        //console.log(leagueId);
        //console.log(userName);
        
        leagueUrlSubmission(document, form, leagueId, sleeperData, teams);
        
        event.preventDefault();

    });

    userNameSubmit.addEventListener("click", function(event){
        //form.reset();
        
        let userName = document.querySelector("input[name=userName]").value;
        
        
        //console.log(userName);
        
        userNameSubmission(document, form, userName, sleeperData, teams);
        
        event.preventDefault();

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