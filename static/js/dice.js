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

   // add to both boards' history
   history_add("0", "rolled " + diceOne.toString() + " " + diceTwo.toString());
   history_add("1", "rolled " + diceOne.toString() + " " + diceTwo.toString());
}
