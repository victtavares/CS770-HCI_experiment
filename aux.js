
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


function generateData() {
  var min = 30;
  var max = 91;
  var returnArray = [];
  var numberOfSpikes = 4;


  for (var i =0; i < 35; i++) {
    var value = Math.floor(Math.random() * (max - min)) + min;
    var xAndY = {x:i,y:value};
    returnArray.push(xAndY);
  }
  //console.log(JSON.stringify(returnArray));
}

generateData();

function selectNext() {
   allViews = JSON.parse(localStorage["remainViews"]);
   console.log("allViews" + allViews);
   if (allViews.length != 0) {
    returnHTML = allViews[0] + ".html";
    allViews.splice(0, 1);
    localStorage.setItem("remainViews",JSON.stringify(allViews));
    return returnHTML;
   } else {
    return "main.html";
   }
}


