var maxReactionTime = 3000;
var spikeWasClicked = false;
var lastSpikes = {};


function generateGraph(data,graphName,isInteractionController) {


    //#----------------------------------- Graph Code -------------------------------------
    var dps = data.slice(0,5);
    var chart = new CanvasJS.Chart(graphName,{
      title :{
        text: graphName
      },  
      axisY:{
      minimum: 0,
      maximum: 250,
      stripLines: [{
        value:150
    }]
     },   
      data: [{
        type: "line",
        dataPoints: dps 
      }]
    });


    var updateInterval = 1000;
    var dataLength = 4; // number of dataPoints visible at any point


    //#----------------------------------- Graph Generation -------------------------------------
    var j = dataLength +1;
    var timer = setInterval(function(){updateChart()}, updateInterval);


    chart.render();
    var updateChart = function () {
      if (j != data.length) {
        dps.push({
          x:data[j].x,
          y:data[j].y
        });
        //Getting the last Spike!
        if (data[j].y >= 150) {
          lastSpikes[graphName] = [new Date().getTime(),false];
        }
        j++;

        if (dps.length > dataLength) {
          dps.shift();        
        }
        chart.render();

      //Finish Graph interaction
      } else {
        clearInterval(timer);
        if (isInteractionController) {
          console.log("Foi:" + JSON.stringify(lastSpikes));
          setTimeout(function(){window.location = selectNext();}, 3000);
          document.getElementById("alert").innerHTML = "<h3>You will be redirected in 3 seconds!</h3>";
          //window.location = selectNext();
        }
        
      }
    }
  
}

function generateTwoGraphs(data1,data2,graphName,isInteractionController) {


  //#----------------------------------- Graph Data -------------------------------------
    var dps1 = data1.slice(0,5);
    var dps2 = data2.slice(0,5);
    var chart = new CanvasJS.Chart(graphName,
    {

      title:{
        text: graphName
      },                     
           axisY:{
      minimum: 0,
      maximum: 250,
      stripLines: [{
        value:150
    }]
     },
      data: [
      {        
        type: "line",
        showInLegend: true,
        name: "Real Data",
        markerType: "square",
        color: "#20B2AA",
        dataPoints: dps1
      },
      {        
        type: "line",
        showInLegend: true,
        name: "Distraction Data",
        color: "#F08080",
        dataPoints: dps2
      }
      ],
    });

    var updateInterval = 1000;
    var dataLength = 4; // number of dataPoints visible at any point

    //#----------------------------------- Graph Generation -------------------------------------
    var j = dataLength +1;
    var z = dataLength +1;
    var timer = setInterval(function(){updateChart()}, updateInterval);


    chart.render();
    var updateChart = function () {
      if (j != data1.length) {
        dps1.push({
          x:data1[j].x,
          y:data1[j].y
        });

        if (z != data2.length) {
          dps2.push({
            x:data2[z].x,
            y:data2[z].y
        });
        }
        //Getting the last Spike!
        if (data1[j].y >= 150) {
          lastSpikes[graphName] = [new Date().getTime(),false];
        }
        j++;
        z++;
        if (dps1.length > dataLength) {
          dps1.shift();        
        }

        if (dps2.length > dataLength) {
          dps2.shift();        
        }

        chart.render();

      //Finish Graph interaction
      } else {
        clearInterval(timer);
        if (isInteractionController) {
          console.log("Foi:" + JSON.stringify(lastSpikes));
          setTimeout(function(){window.location = selectNext();}, 3000);
          document.getElementById("alert").innerHTML = "<h3>You will be redirected in 3 seconds!</h3>";
          //window.location = selectNext();
        }
        
      }
    }
  //chart.render();
}


function addSpike(graphName,filename) {
  var now = new Date().getTime();
  var status = "Not Ok"
  var reactionTime = now - lastSpikes[graphName][0]; // now - lastSpikeTime
  if ((reactionTime <= maxReactionTime) && (!lastSpikes[graphName][1])) { //lastSpike[graphName][1] = spikeWasClicked
    lastSpikes[graphName][1] = true;
    console.log("Ok" + reactionTime);
    status = "Ok"
  } else {
    console.log("Not Ok" + reactionTime);
    status = "Not Ok";
  }
  actualParticipant = localStorage['actualParticipant'];
  arrayOfData = JSON.parse(localStorage[actualParticipant]);
  arrayOfData[arrayOfData.length] = {filename:filename, graphName:graphName,reactionTime:reactionTime,status:status};
  localStorage.setItem(actualParticipant, JSON.stringify(arrayOfData));
  
}
