let input = import readline-sync;
const leagueID = input.question("Enter League ID")

fetch(`https://api.sleeper.app/v1/league/${leagueID}`)
  .then(function() {
    // handle the response
  })
  .catch(function() {
    // handle the error
  });
