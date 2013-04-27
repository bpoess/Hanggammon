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
   var updateArray = [];

   // Push key/value pairs for each queued key
   for (var i in queuedKeysToUpdate) {
      updateArray.push({key:queuedKeysToUpdate[i],
                        value:gameState[queuedKeysToUpdate[i]]});
   }

   if (updateArray.length > 1) {
      gapi.hangout.data.submitDelta(updateArray, []);
   } else {
      // Use setValue() if there's a single update
      gapi.hangout.data.setValue(updateArray[0].key, updateArray[0].value);
   }

   // Clear queued keys
   queuedKeysToUpdate = [];
}

// Push all game state to the server
function pushAllGameState()
{
   var updateArray = [];

   // Push key/value pairs for all gameState elements
   for (var stateKey in gameState) {
      updateArray.push({key:stateKey,
                        value:gameState[stateKey]});
   }

   gapi.hangout.data.submitDelta(updateArray, []);
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
