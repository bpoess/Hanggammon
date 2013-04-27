// Keys queued for updating
var queuedKeysToUpdate = [];

function queueStateUpdate(key)
{
   // If key is already queued just bail out
   for (var i in queuedKeysToUpdate) {
      if (queuedKeysToUpdate[i].match(key)) {
         return;
      }
   }

   queuedKeysToUpdate.push(key);
}

// Commit queued updates to the server
function commitQueuedStateUpdates()
{
   if (queuedKeysToUpdate.length == 0) {
      return;
   }

   // Use setValue() if there's a single update
   if (queuedKeysToUpdate.length == 1) {
      gapi.hangout.data.setValue({queuedKeysToUpdate[i],
                                  gameState[queuedKeysToUpdate[i]]});
   } else {
      var updateObj = {};

      // Push key/value pairs for each queued key
      for (var i in queuedKeysToUpdate) {
         updateObj[queuedKeysToUpdate[i]] = gameState[queuedKeysToUpdate[i]];
      }

      gapi.hangout.data.submitDelta(updateObj, []);
   }

   // Clear queued keys
   queuedKeysToUpdate = [];
}

// Push all game state to the server
function pushAllGameState()
{
   gapi.hangout.data.submitDelta(gameState, []);
}

// Sync state update coming from the server
function onStateChanged(changeEvent)
{
   /*
    * For now, lets just overwrite gameState with the received state. Its
    * possible to do better than this by checking timestamps if necessary.
    */
   gameState = changeEvent.state;

   //XXX: Call method to update display state
}

// Test code
//var gameState = [];
//gameState['abc'] = 'some state';
//gameState['dfg'] = 'more state';
//queueStateUpdate('abc');
//queueStateUpdate('dfg');
//queueStateUpdate('abc');
//print(queuedKeysToUpdate);
//commitQueuedStateUpdates();
//pushAllGameState();
