function board0TakeTopSeat()
{
   var curPlayer = gapi.hangout.getLocalParticipant().person.displayName;

   if (!boardFlipped) {
      queueStateUpdate(getPlayerNameKey(0, 0), curPlayer);
   } else {
      queueStateUpdate(getPlayerNameKey(1, 0), curPlayer);
   }

   commitQueuedStateUpdates();
}

function board0TakeBottomSeat()
{
   var curPlayer = gapi.hangout.getLocalParticipant().person.displayName;

   if (!boardFlipped) {
      queueStateUpdate(getPlayerNameKey(1, 0), curPlayer);
   } else {
      queueStateUpdate(getPlayerNameKey(0, 0), curPlayer);
   }

   commitQueuedStateUpdates();
}

function board1TakeTopSeat()
{
   var curPlayer = gapi.hangout.getLocalParticipant().person.displayName;

   if (!boardFlipped) {
      queueStateUpdate(getPlayerNameKey(0, 1), curPlayer);
   } else {
      queueStateUpdate(getPlayerNameKey(1, 1), curPlayer);
   }

   commitQueuedStateUpdates();
}

function board1TakeBottomSeat()
{
   var curPlayer = gapi.hangout.getLocalParticipant().person.displayName;

   if (!boardFlipped) {
      queueStateUpdate(getPlayerNameKey(1, 1), curPlayer);
   } else {
      queueStateUpdate(getPlayerNameKey(0, 1), curPlayer);
   }

   commitQueuedStateUpdates();
}

function playerStateToDisplay()
{
   var board0TopDiv = document.getElementById('board0TopSeatName');
   var board0BottomDiv = document.getElementById('board0BottomSeatName');
   var board1TopDiv = document.getElementById('board1TopSeatName');
   var board1BottomDiv = document.getElementById('board1BottomSeatName');

   if (!boardFlipped) {
      board0TopDiv.innerHTML = gameState[getPlayerNameKey(0, 0)];
      board0BottomDiv.innerHTML = gameState[getPlayerNameKey(1, 0)];
      board1TopDiv.innerHTML = gameState[getPlayerNameKey(0, 1)];
      board1BottomDiv.innerHTML = gameState[getPlayerNameKey(1, 1)];
   } else {
      board0TopDiv.innerHTML = gameState[getPlayerNameKey(1, 0)];
      board0BottomDiv.innerHTML = gameState[getPlayerNameKey(0, 0)];
      board1TopDiv.innerHTML = gameState[getPlayerNameKey(1, 1)];
      board1BottomDiv.innerHTML = gameState[getPlayerNameKey(0, 1)];
   }
}
