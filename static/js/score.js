// Function to update the score for the given team
function updateScore(teamId, increment)
   var scoreKey = getTeamScoreKey(teamId);

   var newScore = gameState[scoreKey] + increment;

   // Commit score update
   queueStateUpdate(scoreKey, newScore);
   commitQueuedStateUpdates();
}

// Increment the score of a team
function incScore(teamId)
{
   return updateScore(teamId, 1);
}

// Decrement the score of a team
function decScore(teamId)
{
   return updateScore(teamId, -1);
}
