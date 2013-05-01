// Queued updates pending to be committed
var queuedUpdates = [];

function queueStateUpdate(keyToUpdate, newValue)
{
   // If key is already queued just update its value and bail out
   for (var i in queuedUpdates) {
      if (queuedUpdates[i].key == keyToUpdate) {
         queuedUpdates[i].value = newValue;
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
      for (var i in queuedUpdates) {
         updateObj[queuedUpdates[i].key] = queuedUpdates[i].value;
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

// Pull all game state from the server
function pullAllGameState()
{
   all_state = gapi.hangout.data.getState();
   for (var key in all_state) {
      print("Key: " + key);
   }
}



// Get the started variable
function getStarted()
{
   return gapi.hangout.data.getValue("started");
}

// Set started variable to 1
function setStarted()
{
   gapi.hangout.data.setValue("started", 1);
}


// Test code
//queueStateUpdate('abc', 'some state');
//queueStateUpdate('dfg', 'some state');
//queueStateUpdate('abc', 'different state');
//print(queuedUpdates);
//commitQueuedStateUpdates();
//pushAllGameState();
