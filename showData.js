window.onload = function() {
  var subString = "participant";
  for (var key in localStorage) {
    if (key.indexOf(subString) > -1) {
      document.getElementById("mainData").innerHTML += "<h3>" + key + "<h3>";
      allParticipantData = JSON.parse(localStorage[key]);
      console.log(allParticipantData);
      for (var i = 0; i < allParticipantData.length; i++) {
        html = allParticipantData[i].filename + ", " + allParticipantData[i].graphName + ", " + allParticipantData[i].reactionTime + ", " + allParticipantData[i].status + "</br>";
        document.getElementById("mainData").innerHTML += html;
      };
    }
  }

}





