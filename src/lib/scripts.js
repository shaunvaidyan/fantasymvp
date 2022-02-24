import { userNameSubmission, userIdSubmission, leagueUrlSubmission, ownerSubmission } from './scriptHelper.js';
window.addEventListener("load", function (){

    let sleeperData = document.getElementById("sleeperData");
    sleeperData.style.display = 'none';
    const teamData = document.getElementById('teamData');
    
    const ownerData = document.getElementById('ownerData');
    const rosterData = document.getElementById('rosterData');
    rosterData.style.visibility = 'hidden';

    let form = document.querySelector("form");
    const leagueSubmit = document.getElementById('leagueSubmit');
    const userNameSubmit = document.getElementById('userNameSubmit');
    
    form.reset(); // reset form and clear values if page refreshed

    
    leagueSubmit.addEventListener("click", function(event){
     
        let leagueId = document.querySelector("input[name=leagueUrl]").value;
    
        leagueUrlSubmission(document, form, leagueId, sleeperData, teamData, teams);
        
        event.preventDefault();

    });

    userNameSubmit.addEventListener("click", function(event){

        
        let userName = document.querySelector("input[name=userName]").value;
        
        

        
        userNameSubmission(document, form, userName, sleeperData, teamData, teams);
        
        event.preventDefault();

    });

    teamData.addEventListener("click", function(event){

        let target = event.target
        let leagueId = target.value;

        
        leagueUrlSubmission(document, form, leagueId, sleeperData, teamData, teams);
        
        event.preventDefault();

    });

    ownerData.addEventListener("click", function(event){
   
        let target = event.target;
        let leagueInfo = target.value.split(",");

        ownerSubmission(document, form, leagueInfo, sleeperData, teamData, teams);
    
        event.preventDefault();

    });

});