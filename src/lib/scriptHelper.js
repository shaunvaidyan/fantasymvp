//let leagueId = 787027217543708672; // build function to pass League ID from form later


function formSubmission(document, leagueId, sleeperData, teams) {

  //let leagueId = leagueUrl.value;

  //reset visual elements of form
  sleeperData.style.visibility = "visible";
  //console.log(teams)
}

function addTeamInfo(document, owner, players){
  let sleeperData = document.getElementById("sleeperData");
  let ownerData = document.getElementById("ownerData");
  for (let i=0; owner.length > i; i++){
    ownerData.innerHTML +=
    `<td>${owner[i]}</td>`
    }
     
  // sleeperData.innerHTML =
  //   `<h2>Teams</h2>
  //   <ol>
  //       <li>Owners: ${owner}</li>
  //       <li>Players: ${players}</li>
  //   </ol>`
}
async function myFetch() {
  let leagueId = "787027217543708672";
  teamsReturned = await fetch(`https://api.sleeper.app/v1/league/${leagueId}/rosters`).then( function(response) {
      return response.json();
  });
  return teamsReturned;
}

// fetch(`https://api.sleeper.app/v1/league/${leagueID}`)
//   .then(function() {
//     // handle the response
//   })
//   .catch(function() {
//     // handle the error
//   });

  