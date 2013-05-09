// Global game state array
var gameState = [];

// Board definitions
var numSlotsPerBoard = 24;
var numBoards = 2;
var numPlayers = 4;
var numDice = 2;

// Team definitions
var team = [];
team[0] = {pieceChar : '0'};
team[1] = {pieceChar : '1'};
var numTeams = team.length;

// Return the state key for a piece on the given board with the given team
function getPieceKeyOnBoard(boardId, teamId, pieceId)
{
   return 'board' + boardId + '_team' + teamId + '_piece' _ pieceId;
}

// Return the state key for a given slot in the given board
function getSlotKeyOnBoard(boardId, slotId)
{
   return 'board' + boardId + '_slot' + slotId;
}

// Return the key for the collected pieces of a given team on the given board
function getTeamCollectedKeyOnBoard(boardId, teamId)
{
   return 'board' + boardId + '_team' + teamId + '_collected';
}

// Return the key for the currently "hit" pieces of a team on the given board
function getTeamHitKeyOnBoard(boardId, teamId)
{
   return 'board' + boardId + '_team' + teamId + '_hit';
}

// Initialize the given board to be empty
function clearBoard(boardId)
{
   for (var slot = 0; slot < numSlotsPerBoard; slot++) {
      gameState[getSlotKeyOnBoard(boardId, slot)] = '';
   }

   for (var team = 0; team < numTeams; team++) {
      gameState[getTeamCollectedKeyOnBoard(boardId, team)] = '';
      gameState[getTeamHitKeyOnBoard(boardId, team)] = '';
   }
}

// Repeat the given string multiple times
String.prototype.repeat = function(num)
{
    return new Array(num + 1).join(this);
}

// Add standard piece configuration to a board
function addStandardPiecesToBoard(boardId)
{
   gameState[getSlotKeyOnBoard(boardId, 0)] = team[0].pieceChar.repeat(2);
   gameState[getSlotKeyOnBoard(boardId, 5)] = team[1].pieceChar.repeat(5);
   gameState[getSlotKeyOnBoard(boardId, 7)] = team[1].pieceChar.repeat(3);
   gameState[getSlotKeyOnBoard(boardId, 11)] = team[0].pieceChar.repeat(5);
   gameState[getSlotKeyOnBoard(boardId, 12)] = team[1].pieceChar.repeat(5);
   gameState[getSlotKeyOnBoard(boardId, 16)] = team[0].pieceChar.repeat(3);
   gameState[getSlotKeyOnBoard(boardId, 18)] = team[0].pieceChar.repeat(5);
   gameState[getSlotKeyOnBoard(boardId, 23)] = team[1].pieceChar.repeat(2);
}

// Return state key for player name
function getPlayerNameKey(playerId)
{
   return 'player' + playerId + '_name';
}

// Clear player state
function clearPlayers()
{
   for (var i = 0; i < numPlayers; i++) {
      gameState[getPlayerNameKey(i)] = 'Player ' + (i + 1);
   }
}

// Return state key for dice value
function getDiceValueKey(diceId)
{
   return 'dice' + diceId + '_value';
}

// Initialize dice state
function initDiceState()
{
   gameState[getDiceValueKey(0)] = '6';
   gameState[getDiceValueKey(1)] = '6';
}

// Return state key for team score
function getTeamScoreKey(teamId)
{
   return 'team' + teamId + '_score';
}

// Initialize team scores
function initTeamScores()
{
   gameState[getTeamScoreKey(0)] = '0';
   gameState[getTeamScoreKey(1)] = '0';
}

// Push all game state to the server
function pushAllGameState()
{
   for (var key in gameState) {
      gapi.hangout.data.setValue(key, gameState[key]);
   }
}

// Pull all game state from the server
function pullAllGameState()
{
   var all_state = gapi.hangout.data.getState();
   for (var key in all_state) {
      if (key != "started") {
         gameState[key] = all_state[key];
      }
   }
}

// Get the started variable
function getStarted()
{
   return gapi.hangout.data.getValue("started");
}

// Set started variable to 1
function setStarted()
{
   gapi.hangout.data.setValue("started", "started");
}


// Reset the game state
function resetGameState()
{
   for (var board = 0; board < numBoards; board++) {
      clearBoard(board);
      addStandardPiecesToBoard(board);
   }

   clearPlayers();
   initDiceState();
   initTeamScores();
   pushAllGameState();
   gapi.hangout.data.setValue("history", "");
}

// Initialize the game state to default values
function initGameState()
{
   var started = getStarted();
   if (started != "started") {
      setStarted();
      resetGameState();
   } else {
      pullAllGameState();
   }
}

// Return a string corresponding to the game state
function gameStateToString()
{
   var returnStr = '';

   //for (var i = 0; i < numBoards; i++) {
      //for (var j = 0; j < numSlotsPerBoard; j++) {
         //returnStr += getSlotKeyOnBoard(i, j) + ' = "' +
                      //gameState[getSlotKeyOnBoard(i, j)] + '"\n';
      //}

      //for (var j = 0; j < numTeams; j++) {
         //returnStr += getTeamCollectedKeyOnBoard(i,j) + ' = "' +
                      //gameState[getTeamCollectedKeyOnBoard(i,j)] + '"\n';
         //returnStr += getTeamHitKeyOnBoard(i,j) + ' = "' +
                      //gameState[getTeamHitKeyOnBoard(i,j)] + '"\n';
      //}
   //}

   for (var i = 0; i < numPlayers; i++) {
      returnStr += getPlayerNameKey(i) + ' = "' +
                   gameState[getPlayerNameKey(i)] + '"\n';
   }

   for (var i = 0; i < numDice; i++) {
      returnStr += getDiceValueKey(i) + ' = "' +
                   gameState[getDiceValueKey(i)] + '"\n';
   }

   for (var i = 0; i < numDice; i++) {
      returnStr += getTeamScoreKey(i) + ' = "' +
                   gameState[getTeamScoreKey(i)] + '"\n';
   }

   return returnStr;
}

// Test code
//initGameState();
//print(gameStateToString());
