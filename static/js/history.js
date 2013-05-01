function history_add(msg)
{
   var hist = gapi.hangout.getLocalParticipant().person.displayName;
   hist += " " + msg + "<br>";
   var global_hist = gapi.hangout.data.getValue("history");
   global_hist += hist;
   gapi.hangout.data.setValue("history", global_hist);
}
