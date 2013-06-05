function histdiv_add(board, msg)
{
   var histDiv = document.getElementById('historyDiv' + board);

   // prepend msg
   msg += histDiv.innerHTML;

   histDiv.innerHTML = msg;
}


function history_add(board, msg)
{
   // first part of history is the timestamp
   var currentdate = new Date();

   var hours = currentdate.getHours();
   if (hours < 10) {
      hours = "0" + hours;
   }

   var seconds = currentdate.getSeconds();
   if (seconds < 10) {
      seconds = "0" + seconds;
   }

   var minutes = currentdate.getMinutes();
   if (minutes < 10) {
      minutes = "0" + minutes;
   }

   var datetime = hours + ":" + minutes + ":" + seconds;
   var hist = "[" + datetime + "]";

   // append user name
   hist += " " + gapi.hangout.getLocalParticipant().person.displayName;

   // finally the actual message
   hist += " " + msg + "<br>";

   histdiv_add(board, hist);

   gapi.hangout.data.sendMessage(board + hist);
}
