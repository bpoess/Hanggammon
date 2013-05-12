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

   /*
    * Auto hit detection. Count the number of opposing pieces in toSlot
    * and if there's only one hit it.
    */
   var opposingTeam = 1 - parseInt(teamId);
   var numOpposingPieces = 0;
   var pieceToHit = -1;
   for (var opposingPiece = 0; opposingPiece < numPiecesPerBoard;
        opposingPiece++) {
      state = gameState[getPieceKeyOnBoard(boardId, opposingTeam,
                                           opposingPiece)];
      if (state === toSlot) {
         numOpposingPieces++;
         pieceToHit = opposingPiece;
      }
   }

   if (numOpposingPieces == 1) {
      // Hit the piece
      queueStateUpdate(getPieceKeyOnBoard(boardId, opposingTeam,
                                          parseInt(opposingPiece)),
                       pieceState.HIT.toString());
   }

   // send state update to the server
   commitQueuedStateUpdates();

   if (numOpposingPieces == 1) {
      history_add("board " + boardId + " team " + teamId + " from " + fromSlot +
                  " to " + toSlot + " (HIT)");
   } else {
      history_add("board " + boardId + " team " + teamId + " from " + fromSlot +
                  " to " + toSlot);
   }
}
