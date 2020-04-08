funcWidthPerHeight(2253 / 2064); //funcPrepareGetLocation()

funcUpdatePageSize(true);
var numOfFeeds = 0;
var arrPlant = new Array();
var arrChecked = new Array();

for (var idx = 0; idx < 6; idx++) {
  arrPlant[idx] = new Array();

  for (var idx2 = 0; idx2 < 3; idx2++) {
    arrPlant[idx][idx2] = 0;
  }
}

function funcCheckwithX() {
  var _id = event.srcElement.id; //console.log(_id)

  if (arrChecked[_id] == true) {
    arrChecked[_id] = false;
    event.srcElement.innerHTML = "";
  } else {
    arrChecked[_id] = true;
    event.srcElement.innerHTML = "X";
  }
}

function funcPlant(idx, idx2) {
  arrPlant[idx][idx2]++;

  if (arrPlant[idx][idx2] == 4) {
    arrPlant[idx][idx2] = 0;
  } //let btnFarm = document.getElementById("btnFarm" + idx + "_" + idx2)


  switch (arrPlant[idx][idx2]) {
    case 1:
      event.srcElement.style.backgroundImage = "url('img/harvestdice/carrot.png')"; // event.srcElement.backgroundSize = "100%"
      // event.srcElement.backgroundPositionX="0%"

      break;

    case 2:
      event.srcElement.style.backgroundImage = "url('img/harvestdice/lettuce.png')"; //  event.srcElement.backgroundSize = "85%"
      //  event.srcElement.backgroundPositionX="50%"

      break;

    case 3:
      event.srcElement.style.backgroundImage = "url('img/harvestdice/tomato.png')"; //  event.srcElement.backgroundSize = "85%"
      //  event.srcElement.backgroundPositionX="50%"

      break;

    case 0:
      event.srcElement.style.backgroundImage = "url('')";
      break;

    default:
      break;
  }
}

function funcDrawHarvestDice() {
  funcInsertFullScreenButton(0.8849, 0.0170, 0.9707, 0.0894, 29 / 20);
  var leftTic = 0.127;
  var topTic = 0.13;

  var _loop = function _loop(_idx) {
    var _loop3 = function _loop3(_idx9) {
      var btnFarm = funcInsertElement("btnFarm" + _idx + "_" + _idx9, "button", "btnTrans", 0.2310 + leftTic * (_idx - 1), 0.1588 + _idx9 * topTic, 0.3252 + leftTic * (_idx - 1), 0.2500 + _idx9 * topTic);
      btnFarm.style.transform = "rotate(" + (getRandom(61) - 30) + "deg)";
      var imgSrc = "lettuce";
      var ranN = getRandom(3);

      if (ranN == 0) {
        imgSrc = "carrot";
      } else if (ranN == 1) {
        imgSrc = "tomato";
      } //btnFarm.style.backgroundSize = "90%"
      //btnFarm.backgroundPositionX = "50%"


      btnFarm.onclick = function () {
        funcPlant(_idx, _idx9);
      };
    };

    for (var _idx9 = 0; _idx9 < 3; _idx9++) {
      _loop3(_idx9);
    }
  };

  for (var _idx = 0; _idx < 6; _idx++) {
    _loop(_idx);
  }

  leftTic = 0.0355;
  topTic = 0.0386;
  leftMod = 0.0005;
  var idxNumOfFeeds = 0;

  for (var _idx2 = 0; _idx2 < 7; _idx2++) {
    for (var _idx3 = 0; _idx3 < 6; _idx3++) {
      funcInsertElement("btnFeed" + idxNumOfFeeds++, "button", "btnCircle", 0.0777 + leftTic * _idx3 + _idx2 * leftMod, 0.650 + _idx2 * topTic, 0.1094 + leftTic * _idx3 + _idx2 * leftMod, 0.6802 + _idx2 * topTic);
    }
  }

  topTic = 0.0395;
  leftTic = 0.001;

  for (var _idx4 = 0; _idx4 < 7; _idx4++) {
    funcInsertElement("btnFeedDone" + _idx4, "button", "btnTrans", 0.3058 + leftTic * _idx4, 0.6435 + _idx4 * topTic, 0.3407 + leftTic * _idx4, 0.6782 + _idx4 * topTic).onclick = funcCheckwithX;
  }

  topTic = 0;
  leftTic = 0.105;

  for (var _idx5 = 0; _idx5 < 5; _idx5++) {
    funcInsertElement("btnScore" + _idx5, "button", "btnTrans", 0.4589 + leftTic * _idx5, 0.8439 + _idx5 * topTic, 0.5137 + leftTic * _idx5, 0.8960 + _idx5 * topTic);
  }

  document.getElementById("btnScore0").style.transform = "rotate(5deg)";
  document.getElementById("btnScore1").style.transform = "rotate(-5deg)";
  document.getElementById("btnScore2").style.transform = "rotate(5deg)";
  document.getElementById("btnScore3").style.transform = "rotate(-5deg)";
  document.getElementById("btnScore4").style.transform = "rotate(5deg)";
  funcInsertElement("btnScoreFinal", "button", "btnTrans", 0.6196, 0.9287, 0.7696, 0.9711).onclick = funcFinalScoreCal;
  topTic = 0.0385;
  vegMod = 0.172;
  leftTic = 0.04;
  leftMod = 0.001;

  for (var veg = 0; veg < 3; veg++) {
    for (var _idx6 = 0; _idx6 < 2; _idx6++) {
      for (var _idx7 = 0; _idx7 < 3; _idx7++) {
        funcInsertElement("btnVegitable" + veg + "_" + _idx6 + "_" + _idx7, "button", "btnCircle", veg * vegMod + 0.475 + leftTic * _idx6 + _idx7 * leftMod, 0.6773 + _idx7 * topTic, veg * vegMod + 0.5096 + leftTic * _idx6 + _idx7 * leftMod, 0.7081 + _idx7 * topTic).onclick = funcCheckwithX;
      }
    }
  }

  funcInsertElement("btnFScore0", "button", "btnCircle", 0.8508, 0.1734, 0.8985, 0.2235).onclick = funcCheckwithX;
  funcInsertElement("btnFScore1", "button", "btnCircle", 0.8599, 0.2909, 0.9040, 0.3391).onclick = funcCheckwithX;
  funcInsertElement("btnFScore2", "button", "btnCircle", 0.8667, 0.4181, 0.9143, 0.4701).onclick = funcCheckwithX;
  funcInsertElement("btnFScore3", "button", "btnCircle", 0.3437, 0.5647, 0.3896, 0.6167).onclick = funcCheckwithX;
  funcInsertElement("btnFScore4", "button", "btnCircle", 0.5578, 0.5453, 0.6107, 0.5992).onclick = funcCheckwithX;
  funcInsertElement("btnFScore5", "button", "btnCircle", 0.7308, 0.5491, 0.7749, 0.5973).onclick = funcCheckwithX;
  funcInsertElement("btnFScore6", "button", "btnCircle", 0.9022, 0.5454, 0.9481, 0.6013).onclick = funcCheckwithX;
  leftTic = 0.13;

  var _loop2 = function _loop2(_idx8) {
    funcInsertElement("btnDoFeed" + _idx8, "button", "btnTrans", 0.1024 + _idx8 * leftTic, 0.0443, 0.1712 + _idx8 * leftTic, 0.0963).onclick = function () {
      funcDoFeed(_idx8);
    };
  };

  for (var _idx8 = 0; _idx8 < 6; _idx8++) {
    _loop2(_idx8);
  }

  funcInsertElement("btnDecreaseFeed", "button", "btnTrans", 0.1228, 0.5298, 0.2281, 0.6383).onclick = function () {
    if (numOfFeeds == 0) {
      return;
    }

    {
      numOfFeeds--;
      document.getElementById("btnFeed" + numOfFeeds).innerHTML = "";
    }
  };
}

function funcDoFeed(feedVal) {
  for (var _idx10 = 0; _idx10 <= feedVal; _idx10++) {
    document.getElementById("btnFeed" + numOfFeeds).innerHTML = "X";
    numOfFeeds++;
  }
}

function funcFinalScoreCal() {
  var finalScore = 0;
  var numOfFScore = 0;

  for (var _idx11 = 0; _idx11 < 7; _idx11++) {
    if (arrChecked["btnFScore" + _idx11] == true) {
      numOfFScore++;
    }
  }

  finalScore += 5 * numOfFScore;
  document.getElementById("btnScore3").innerHTML = 5 * numOfFScore;
  var feedScore = Math.floor(numOfFeeds / 6);

  if (feedScore == 7) {
    feedScore++;
  }

  var vegiPerScore = new Array();
  var vegiCount = new Array();

  for (var veg = 0; veg < 3; veg++) {
    vegiPerScore[veg] = 0;
    vegiCount[veg] = 0;
  }

  for (var _idx12 = 0; _idx12 < 6; _idx12++) {
    for (var _idx13 = 0; _idx13 < 3; _idx13++) {
      if (arrPlant[_idx12][_idx13] > 0) {
        vegiCount[arrPlant[_idx12][_idx13] - 1]++;
      }
    }
  }

  for (var _veg = 0; _veg < 3; _veg++) {
    for (var _idx14 = 0; _idx14 < 2; _idx14++) {
      for (var _idx15 = 0; _idx15 < 3; _idx15++) {
        if (arrChecked["btnVegitable" + _veg + "_" + _idx14 + "_" + _idx15] == true) {
          vegiPerScore[_veg]++;
        }
      }
    }

    document.getElementById("btnScore" + _veg).innerHTML = vegiCount[_veg] * vegiPerScore[_veg];
    finalScore += vegiCount[_veg] * vegiPerScore[_veg];
  } //console.log(vegiPerScore)
  //console.log(vegiCount)


  document.getElementById("btnScore4").innerHTML = 2 * feedScore;
  finalScore += 2 * feedScore;
  event.srcElement.innerHTML = finalScore;
}

funcDrawHarvestDice();