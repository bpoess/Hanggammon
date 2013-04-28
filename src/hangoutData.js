// Queued updates pending to be committed
var queuedUpdates = [];

function queueStateUpdate(keyToUpdate, newValue)
{
   // If key is already queued just bail out
   for (var update in queuedUpdates) {
      if (update.key.match(keyToUpdate)) {
         return;
      }
   }

   queuedUpdates.push({key: keyToUpdate, value: newValue});
}

// Commit queued updates to the server
function commitQueuedStateUpdates()
{
   if (queuedUpdates.length == 0) {
      return;
   }

   // Use setValue() if there's a single update
   if (queuedUpdates.length == 1) {
      gapi.hangout.data.setValue(queuedUpdates[0].key,
                                 queuedUpdates[0].value);
   } else {
      var updateObj = {};

      // Push key/value pairs for each queued update
      for (var update in queuedUpdates) {
         updateObj[update.key] = update.value;
      }

      gapi.hangout.data.submitDelta(updateObj, []);
   }

   // Clear queued updates
   queuedUpdates = [];
}

// Push all game state to the server
function pushAllGameState()
{
   gapi.hangout.data.submitDelta(gameState, []);
}

// Test code
//queueStateUpdate('abc', 'some state');
//queueStateUpdate('dfg', 'some state');
//queueStateUpdate('abc', 'different state');
//print(queuedUpdates);
//commitQueuedStateUpdates();
//pushAllGameState();
