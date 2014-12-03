

function startExperiment() {
  var ppNumber = document.getElementById('ppNumber').value;
  console.log(ppNumber);
  //var allViews = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
  if (localStorage.getItem("participant"+ppNumber) !== null) {
    alert("This participant number was already used");
  } else {
    localStorage.setItem("actualParticipant","participant"+ppNumber);
    localStorage.setItem("participant"+ppNumber,JSON.stringify([]));
    var allViews = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    localStorage.setItem("remainViews", JSON.stringify(shuffle(allViews)));
    window.location = selectNext();
  }

}

function simulation() {
  selectNext();
}
