import { userNameSubmission, userIdSubmission, leagueUrlSubmission, ownerSubmission } from './scriptHelper.js';
window.addEventListener("load", function (){

    let sleeperData = document.getElementById("sleeperData");
    sleeperData.style.display = 'none';
    const teamData = document.getElementById('teamData');
    const teamDataTable = document.getElementById('teamDataTable');
    const ownerData = document.getElementById('ownerData');
    const rosterData = document.getElementById('rosterData');
    const rosterDataTable = document.getElementById('rosterDataTable');
    const ownerDataTable = document.getElementById('ownerDataTable');
    rosterData.style.visibility = 'hidden';

    let form = document.querySelector("form");
    const leagueSubmit = document.getElementById('leagueSubmit');
    const userNameSubmit = document.getElementById('userNameSubmit');
    
    form.reset(); // reset form and clear values if page refreshed

    
    leagueSubmit.addEventListener("click", function(event){
     
        let leagueId = document.querySelector("input[name=leagueUrl]").value;
        
        leagueUrlSubmission(document, leagueId, sleeperData);
        
        event.preventDefault();

    });

    userNameSubmit.addEventListener("click", function(event){

        
        let userName = document.querySelector("input[name=userName]").value;
        
        

        
        userNameSubmission(document, userName, sleeperData);
        
        event.preventDefault();

    });

});