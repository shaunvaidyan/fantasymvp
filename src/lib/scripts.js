import { userNameSubmission, userIdSubmission, leagueUrlSubmission, ownerSubmission } from './scriptHelper.js';
window.addEventListener("load", function (){

    let sleeperData = document.getElementById("sleeperData");
    sleeperData.style.visibility = 'hidden';
    const teamData = document.getElementById('teamData');
    
    const ownerData = document.getElementById('ownerData');
    const rosterData = document.getElementById('rosterData');
    rosterData.style.visibility = 'hidden';

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
        
        leagueUrlSubmission(document, form, leagueId, sleeperData, teamData, teams);
        
        event.preventDefault();

    });

    userNameSubmit.addEventListener("click", function(event){
        //form.reset();
        
        let userName = document.querySelector("input[name=userName]").value;
        
        
        //console.log(userName);
        
        userNameSubmission(document, form, userName, sleeperData, teamData, teams);
        
        event.preventDefault();

    });

    teamData.addEventListener("click", function(event){
        //form.reset();
        //const leagueSelectors = document.getElementsByClassName('leagueSelectors');
        let target = event.target
        let leagueId = target.value;
        //let userName = document.querySelector("input[name=userName]").value;
        
        // console.log(leagueId);
        //console.log(userName);
        
        leagueUrlSubmission(document, form, leagueId, sleeperData, teamData, teams);
        
        event.preventDefault();

    });

    ownerData.addEventListener("click", function(event){
        //form.reset();
        //const leagueSelectors = document.getElementsByClassName('leagueSelectors');
        let target = event.target;
        let leagueInfo = target.value.split(",");
        //let userName = document.querySelector("input[name=userName]").value;
        
        //console.log(leagueInfo);
        //console.log(userName);
        
        ownerSubmission(document, form, leagueInfo, sleeperData, teamData, teams);
        
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