function history_add(msg)
{
   // first part of history is the timestamp
   var datetime = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + seconds;
   var currentdate = new Date();
   var seconds = currentdate.getSeconds();
   if (seconds == "0") {
      seconds = "00"
   }
   var hist = "[" + datetime + "]"

   // append user name
   hist += " " + gapi.hangout.getLocalParticipant().person.displayName;

   // finally the actual message
   hist += msg + "<br>";

   var global_hist = gapi.hangout.data.getValue("history");
   hist += global_hist;
   gapi.hangout.data.setValue("history", hist);
}
