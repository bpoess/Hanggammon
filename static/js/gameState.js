// Global game state array
var gameState = [];

// Board definitions
var numPiecesPerBoard = 15;
var numBoards = 2;
var numPlayers = 4;
var numDice = 2;

// Team definitions
var numTeams = 2;

// State definitions
pieceState = {
   IN_SLOT_0  : 0,
   IN_SLOT_1  : 1,
   IN_SLOT_2  : 2,
   IN_SLOT_3  : 3,
   IN_SLOT_4  : 4,
   IN_SLOT_5  : 5,
   IN_SLOT_6  : 6,
   IN_SLOT_7  : 7,
   IN_SLOT_8  : 8,
   IN_SLOT_9  : 9,
   IN_SLOT_10 : 10,
   IN_SLOT_11 : 11,
   IN_SLOT_12 : 12,
   IN_SLOT_13 : 13,
   IN_SLOT_14 : 14,
   IN_SLOT_15 : 15,
   IN_SLOT_16 : 16,
   IN_SLOT_17 : 17,
   IN_SLOT_18 : 18,
   IN_SLOT_19 : 19,
   IN_SLOT_20 : 20,
   IN_SLOT_21 : 21,
   IN_SLOT_22 : 22,
   IN_SLOT_23 : 23,
   MOVING     : 24,
   HIT        : 25,
   PICKED_UP  : 26
}

// Return the state key for a piece on the given board with the given team
function getPieceKeyOnBoard(boardId, teamId, pieceId)
{
   return 'board' + boardId + '_team' + teamId + '_piece' + pieceId;
}

// Initialize the given board to be empty
function clearBoard(boardId)
{
   for (var team = 0; team < numTeams; team++) {
      for (var piece = 0; piece < numPiecesPerBoard; piece++) {
         gameState[getPieceKeyOnBoard(boardId, team, piece)] = '';
      }
   }
}

// Add standard piece configuration to a board
function movePiecesToStandardLocations(boardId)
{
   // Team 0
   gameState[getPieceKeyOnBoard(boardId, 0, 0)] = IN_SLOT_0.toString();
   gameState[getPieceKeyOnBoard(boardId, 0, 1)] = IN_SLOT_0.toString();
   gameState[getPieceKeyOnBoard(boardId, 0, 2)] = IN_SLOT_11.toString();
   gameState[getPieceKeyOnBoard(boardId, 0, 3)] = IN_SLOT_11.toString();
   gameState[getPieceKeyOnBoard(boardId, 0, 4)] = IN_SLOT_11.toString();
   gameState[getPieceKeyOnBoard(boardId, 0, 5)] = IN_SLOT_11.toString();
   gameState[getPieceKeyOnBoard(boardId, 0, 6)] = IN_SLOT_11.toString();
   gameState[getPieceKeyOnBoard(boardId, 0, 7)] = IN_SLOT_16.toString();
   gameState[getPieceKeyOnBoard(boardId, 0, 8)] = IN_SLOT_16.toString();
   gameState[getPieceKeyOnBoard(boardId, 0, 9)] = IN_SLOT_16.toString();
   gameState[getPieceKeyOnBoard(boardId, 0, 10)] = IN_SLOT_18.toString();
   gameState[getPieceKeyOnBoard(boardId, 0, 11)] = IN_SLOT_18.toString();
   gameState[getPieceKeyOnBoard(boardId, 0, 12)] = IN_SLOT_18.toString();
   gameState[getPieceKeyOnBoard(boardId, 0, 13)] = IN_SLOT_18.toString();
   gameState[getPieceKeyOnBoard(boardId, 0, 14)] = IN_SLOT_18.toString();
   gameState[getPieceKeyOnBoard(boardId, 0, 15)] = IN_SLOT_18.toString();

   // Team 1
   gameState[getPieceKeyOnBoard(boardId, 1, 0)] = IN_SLOT_23.toString();
   gameState[getPieceKeyOnBoard(boardId, 1, 1)] = IN_SLOT_23.toString();
   gameState[getPieceKeyOnBoard(boardId, 1, 2)] = IN_SLOT_12.toString();
   gameState[getPieceKeyOnBoard(boardId, 1, 3)] = IN_SLOT_12.toString();
   gameState[getPieceKeyOnBoard(boardId, 1, 4)] = IN_SLOT_12.toString();
   gameState[getPieceKeyOnBoard(boardId, 1, 5)] = IN_SLOT_12.toString();
   gameState[getPieceKeyOnBoard(boardId, 1, 6)] = IN_SLOT_12.toString();
   gameState[getPieceKeyOnBoard(boardId, 1, 7)] = IN_SLOT_7.toString();
   gameState[getPieceKeyOnBoard(boardId, 1, 8)] = IN_SLOT_7.toString();
   gameState[getPieceKeyOnBoard(boardId, 1, 9)] = IN_SLOT_7.toString();
   gameState[getPieceKeyOnBoard(boardId, 1, 10)] = IN_SLOT_5.toString();
   gameState[getPieceKeyOnBoard(boardId, 1, 11)] = IN_SLOT_5.toString();
   gameState[getPieceKeyOnBoard(boardId, 1, 12)] = IN_SLOT_5.toString();
   gameState[getPieceKeyOnBoard(boardId, 1, 13)] = IN_SLOT_5.toString();
   gameState[getPieceKeyOnBoard(boardId, 1, 14)] = IN_SLOT_5.toString();
   gameState[getPieceKeyOnBoard(boardId, 1, 15)] = IN_SLOT_5.toString();
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
      movePiecesToStandardLocations(board);
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

   for (var board = 0; board < numBoards; board++) {
      for (var team = 0; team < numTeams; team++) {
         for (var piece = 0; piece < numPiecesPerBoard; piece++) {
            returnStr += getPieceKeyOnBoard(board, team, piece) + ' = "' +
                         gameState[getPieceKeyOnBoard(board, team, piece)] +
                         '"\n';
         }
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
