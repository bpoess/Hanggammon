function movePiece(boardId, teamId, fromSlot, toSlot)
{
   var fromSlotKey = getSlotKeyOnBoard(boardId, fromSlot);
   var toSlotKey = getSlotKeyOnBoard(boardId, toSlot);

   // Make sure teamId has at least one piece in fromSlot
   var pieceIndex = gameState[fromSlotKey].search(team[teamId].pieceChar);
   if (pieceIndex == -1) {
      //XXX: throw exception?
      return;
   }

   // Create new value of fromSlot
   var oldFromSlotValue = gameState[fromSlotKey];
   var oldFromSlotLen = oldFromSlotValue.length;
   var newFromSlotValue = '';

   /*
    * First part of the result is from 0 until pieceIndex. Skip this if
    * we're removing the first piece.
    */
   if (pieceIndex != 0) {
      newFromSlotValue += oldFromSlotValue.substring(0, pieceIndex);
   }

   /*
    * Second part of the result is from pieceIndex + 1 until oldFromSlotLen.
    * Skip this if we're removing the last piece.
    */
   if (pieceIndex != oldFromSlotLen - 1) {
      newFromSlotValue += oldFromSlotValue.substring(pieceIndex + 1,
                                                     oldFromSlotLen);
   }

   // Queue update to remove a piece from fromSlot
   queueStateUpdate(fromSlotKey, newFromSlotValue);

   // Queue update to add a piece to toSlot
   queueStateUpdate(toSlotKey, gameState[toSlotKey] + team[teamId].pieceChar);

   // send state update to the server
   commitQueuedStateUpdates();

   history_add("board " + boardId + " team " + teamId + " from " + fromSlot + " to " + toSlot);
}

function rollDice() {
   var MAX_DICE_VALUE = 6;

   // The following code will give us a value between 0 and MAX_DICE_VALUE (non-inclusive)
   // Need to add one for 1 through MAX_DICE_VALUE (inclusive)
   var diceOne = Math.floor(Math.random() * MAX_DICE_VALUE) + 1;
   var diceTwo = Math.floor(Math.random() * MAX_DICE_VALUE) + 1;

   // Grab the key values for dice 1 and 2
   var diceOneKey = getDiceValueKey(0);
   var diceTwoKey = getDiceValueKey(1);

   // Queue update to dice1
   queueStateUpdate(diceOneKey, diceOne.toString());

   // Queue update to dice2
   queueStateUpdate(diceTwoKey, diceTwo.toString());

   // send state update to the server
   commitQueuedStateUpdates();
}
