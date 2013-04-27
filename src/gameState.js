// Global game state array
var gameState = [];

// Board definitions
var numSlotsPerBoard = 24;
var numBoards = 2;
var numPlayers = 4;
var numDice = 2;
var numTeams = 2;
var teamOnePieceStr = 'W';
var teamTwoPieceStr = 'B';

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
   gameState[getSlotKeyOnBoard(boardId, 0)] = teamOnePieceStr.repeat(2);
   gameState[getSlotKeyOnBoard(boardId, 5)] = teamTwoPieceStr.repeat(5);
   gameState[getSlotKeyOnBoard(boardId, 7)] = teamTwoPieceStr.repeat(3);
   gameState[getSlotKeyOnBoard(boardId, 11)] = teamOnePieceStr.repeat(5);
   gameState[getSlotKeyOnBoard(boardId, 12)] = teamTwoPieceStr.repeat(5);
   gameState[getSlotKeyOnBoard(boardId, 16)] = teamOnePieceStr.repeat(3);
   gameState[getSlotKeyOnBoard(boardId, 18)] = teamOnePieceStr.repeat(5);
   gameState[getSlotKeyOnBoard(boardId, 23)] = teamTwoPieceStr.repeat(2);
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

// Initialize the game state to default values
function initGameState()
{
   for (var board = 0; board < numBoards; board++) {
      clearBoard(board);
      addStandardPiecesToBoard(board);
   }

   clearPlayers();

   initDiceState();

   initTeamScores();
}

// Return a string corresponding to the game state
function gameStateToString()
{
   var returnStr = '';

   for (var i = 0; i < numBoards; i++) {
      for (var j = 0; j < numSlotsPerBoard; j++) {
         returnStr += getSlotKeyOnBoard(i, j) + ' = "' +
                      gameState[getSlotKeyOnBoard(i, j)] + '"\n';
      }

      for (var j = 0; j < numTeams; j++) {
         returnStr += getTeamCollectedKeyOnBoard(i,j) + ' = "' +
                      gameState[getTeamCollectedKeyOnBoard(i,j)] + '"\n';
         returnStr += getTeamHitKeyOnBoard(i,j) + ' = "' +
                      gameState[getTeamHitKeyOnBoard(i,j)] + '"\n';
      }
   }

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
