//let leagueId = 787027217543708672; // build function to pass League ID from form later
function addTeamInfo(document, owner, players){
  let sleeperData = document.getElementById("sleeperData");
  sleeperData.innerHTML =
    `<h2>Teams</h2>
    <ol>
        <li>owner: ${owner}</li>
        <li>players: ${players}</li>
    </ol>`
}
async function myFetch() {
  let leagueId = 787027217543708672;
  let teamsReturned;

  teamsReturned = await fetch(`https://api.sleeper.app/v1/league/787027217543708672/rosters`).then( function(response) {
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

  