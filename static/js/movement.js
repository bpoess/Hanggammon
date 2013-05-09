function movePiece(boardId, teamId, fromSlot, toSlot)
{
   var movePiece = '';

   // Search gameState to see if teamId has a piece in fromSlot
   for (piece = 0; piece < numPiecesPerBoard; piece++) {
      var state = gameState[getPieceKeyOnBoard(boardId, teamId, piece)];
      if (state === fromSlot) {
         movePiece = piece;
         break;
      }
   }

   if (movePiece === '') {
      // No piece found XXX: throw exception?
      return;
   }

   // Queue update the move the piece to its new location
   queueStateUpdate(getPieceKeyOnBoard(boardId, teamId, parseInt(movePiece)),
                    toSlot);

   // send state update to the server
   commitQueuedStateUpdates();

   history_add("board " + boardId + " team " + teamId + " from " + fromSlot + " to " + toSlot);
}
