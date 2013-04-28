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
   var newFromSlotValue;
   if (pieceIndex < oldFromSlotLen - 2) {
      // Make a hole at pieceIndex
      newFromSlotValue = oldFromSlotValue.substring(0, pieceIndex) +
                         oldFromSlotValue.substring(pieceIndex + 1,
                                                    oldFromSlotLen - 1);
   } else {
      // Clip until pieceIndex
      newFromSlotValue = oldFromSlotValue.substring(0, pieceIndex);
   }

   // Queue update to remove a piece from fromSlot
   queueStateUpdate(fromSlotKey, newFromSlotValue);

   // Queue update to add a piece to toSlot
   queueStateUpdate(toSlotKey, gameState[toSlotKey] + team[teamId].pieceChar);

   // send state update to the server
   commitQueuedStateUpdates();
}
