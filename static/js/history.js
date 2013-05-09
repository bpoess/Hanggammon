function history_add(msg)
{
   var hist = gapi.hangout.getLocalParticipant().person.displayName;
   var currentdate = new Date();
   var datetime = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
   hist += "[" + datetime + "] " + msg + "<br>";
   var global_hist = gapi.hangout.data.getValue("history");
   hist += global_hist;
   gapi.hangout.data.setValue("history", hist);
}
