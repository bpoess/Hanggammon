// Global game state array
var gameState = [];

// Board definitions
var numSlotsPerBoard = 24;
var numBoards = 2;
var numPlayers = 4;
var teamOnePieceStr = 'W';
var teamTwoPieceStr = 'B';

// Return the state key for a given slot in the given board
function getSlotKeyOnBoard(boardId, slotId)
{
   return 'board' + boardId + '_slot' + slotId;
}

// Initialize the given board to be empty
function clearBoard(boardId)
{
   for (var slot = 0; slot < numSlotsPerBoard; slot++) {
      gameState[getSlotKeyOnBoard(boardId, slot)] = '';
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

// Initialize the game state to default values
function initGameState()
{
   for (var board = 0; board < numBoards; board++) {
      clearBoard(board);
      addStandardPiecesToBoard(board);
   }

   clearPlayers();
}

// Test code
initGameState();

for (var i = 0; i < numBoards; i++) {
   for (var j = 0; j < numSlotsPerBoard; j++) {
      print(getSlotKeyOnBoard(i, j) + ' = "' +
            gameState[getSlotKeyOnBoard(i, j)] + '"');
   }
}

for (var i = 0; i < numPlayers; i++) {
   print(getPlayerNameKey(i) + ' = "' + gameState[getPlayerNameKey(i)] + '"');
}
