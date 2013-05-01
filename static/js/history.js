function history_add(msg)
{
   var hist = gapi.hangout.getLocalParticipant().person.displayName;
   hist += " " + msg + "<br>";
   var global_hist = gapi.hangout.data.getValue("history");
   hist += global_hist;
   gapi.hangout.data.setValue("history", hist);
}
