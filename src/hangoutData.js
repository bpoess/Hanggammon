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

   //XXX: debug stuff -----------------------------------------
   for (var i = 0; i < updateArray.length; i++) {
      print('Update key: ' + updateArray[i].key + ' value: ' +
            updateArray[i].value);
   }
   //XXX: end of debug stuff ----------------------------------
   // gapi.hangout.data.submitDelta(updateArray, []);

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

   //XXX: debug stuff -----------------------------------------
   for (var i = 0; i < updateArray.length; i++) {
      print('Update key: ' + updateArray[i].key + ' value: ' +
            updateArray[i].value);
   }
   //XXX: end of debug stuff ----------------------------------
   // gapi.hangout.data.submitDelta(updateArray, []);
}

// Test code
var gameState = [];
gameState['abc'] = 'some state';
gameState['dfg'] = 'more state';
queueStateUpdate('abc');
queueStateUpdate('dfg');
queueStateUpdate('abc');
print(queuedKeysToUpdate);
commitQueuedStateUpdates();
pushAllGameState();
