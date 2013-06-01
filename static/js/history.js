function histdiv_add(msg)
{
   var histDiv0 = document.getElementById('historyDiv0');
   var histDiv1 = document.getElementById('historyDiv1');

   // prepend msg; just use histDiv0 for now until history is properly split
   msg += histDiv0.innerHTML;

   // both history boxes the same until history is properly split
   histDiv1.innerHTML = histDiv0.innerHTML = msg;
}


function history_add(msg)
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

   histdiv_add(hist);

   gapi.hangout.data.sendMessage(hist);
}
