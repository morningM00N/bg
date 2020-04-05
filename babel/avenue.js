"use strict";

funcWidthPerHeight(2224 / 1642);
funcUpdatePageSize(true);
var tileNumber = 0;

function funcSetTile(idx) {
  tileNumber = idx;
}

var isMapDrew = new Array();

for (var idx = 0; idx < 6; idx++) {
  isMapDrew[idx] = new Array();
}

function funcDrawTile(idxX, idxY) {
  if (isMapDrew[idxY][idxX] >= 0) // already draw --> erase
    {
      event.srcElement.style.backgroundImage = "url('')";
      isMapDrew[idxY][idxX] = -1;
    } else {
    isMapDrew[idxY][idxX] = tileNumber;

    if (tileNumber < 4) {
      event.srcElement.style.backgroundImage = "url('img/avenue/curvedpath.png')";
    } else {
      event.srcElement.style.backgroundImage = "url('img/avenue/straightpath.png')";
    }

    switch (tileNumber) {
      case 0:
        event.srcElement.style.transform = "rotate(0deg)";
        break;

      case 1:
        event.srcElement.style.transform = "rotate(90deg)";
        break;

      case 2:
        event.srcElement.style.transform = "rotate(180deg)";
        break;

      case 3:
        event.srcElement.style.transform = "rotate(270deg)";
        break;

      case 4:
        event.srcElement.style.transform = "rotate(0deg)";
        break;

      case 5:
        event.srcElement.style.transform = "rotate(90deg)";
        break;

      default:
        break;
    }
  }
}

var numberOfFlowers = new Array();
numberOfFlowers[0] = new Array(0, 0, 2, 0, 0, 1, 1);
numberOfFlowers[1] = new Array(0, 2, 0, 2, 0, 0, 1);
numberOfFlowers[2] = new Array(1, 0, 0, 0, 2, 0, 0);
numberOfFlowers[3] = new Array(0, 2, 1, 0, 0, 1, 0);
numberOfFlowers[4] = new Array(0, 0, 1, 2, 0, 1, 0);
numberOfFlowers[5] = new Array(3, 0, 1, 0, 0, 0, 0);
var numberOfWorm = new Array();
numberOfWorm[0] = new Array(0, 0, 0, 0, 1, 0, 3);
numberOfWorm[1] = new Array(1, 1, 0, 0, 0, 2, 0);
numberOfWorm[2] = new Array(0, 1, 0, 2, 1, 1, 0);
numberOfWorm[3] = new Array(0, 0, 0, 0, 0, 0, 2);
numberOfWorm[4] = new Array(0, 1, 2, 0, 1, 2, 0);
numberOfWorm[5] = new Array(1, 0, 0, 0, 2, 0, 0);
var locSanctuary = new Array();
locSanctuary[1] = new Array(2, 6); // A

locSanctuary[2] = new Array(3, 4); // B

locSanctuary[3] = new Array(0, 3); // C

locSanctuary[4] = new Array(5, 3);
locSanctuary[5] = new Array(2, 2);
locSanctuary[6] = new Array(3, 0);
var scoretype = 0; // 0:all , 1:worm, 2:flower

var roundScore = new Array();

function funcCalSanctuary(idx) {
  var sltSanctuary = document.getElementById("sltSanctuary" + idx);

  if (sltSanctuary.selectedIndex == 0) {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }

    alert("안식처 카드를 설정해 주세요!");
    return;
  }

  scoretype = 0;
  var score = funcCalculateSanctuary(locSanctuary[sltSanctuary.selectedIndex]);
  var previousScore = -1;

  if (idx > 0) {
    previousScore = roundScore[idx - 1];
  }

  if (score <= previousScore) {
    score = 0;
  }

  event.srcElement.innerHTML = score;
  roundScore[idx] = score;
}

function funcCalculateSanctuary(loc, direction // 0: left, 1: right, 2: top, 3: bottom
) {
  if (loc[0] < 0 || loc[0] > 5 || loc[1] < 0 || loc[1] > 6) {
    return 0;
  }

  var curTileScore = numberOfFlowers[loc[0]][loc[1]] + numberOfWorm[loc[0]][loc[1]];

  if (scoretype == 1) {
    curTileScore = numberOfWorm[loc[0]][loc[1]];
  } else if (scoretype == 2) {
    curTileScore = numberOfFlowers[loc[0]][loc[1]];
  }

  if (direction == 0) {
    if (isMapDrew[loc[0]][loc[1]] == 0) {
      return curTileScore + funcCalculateSanctuary(new Array(loc[0] - 1, loc[1]), 3);
    } else if (isMapDrew[loc[0]][loc[1]] == 3) {
      return curTileScore + funcCalculateSanctuary(new Array(loc[0] + 1, loc[1]), 2);
    } else if (isMapDrew[loc[0]][loc[1]] == 4) {
      return curTileScore + funcCalculateSanctuary(new Array(loc[0], loc[1] + 1), 0);
    } else {
      return 0;
    }
  } else if (direction == 1) {
    if (isMapDrew[loc[0]][loc[1]] == 1) {
      return curTileScore + funcCalculateSanctuary(new Array(loc[0] - 1, loc[1]), 3);
    } else if (isMapDrew[loc[0]][loc[1]] == 2) {
      return curTileScore + funcCalculateSanctuary(new Array(loc[0] + 1, loc[1]), 2);
    } else if (isMapDrew[loc[0]][loc[1]] == 4) {
      return curTileScore + funcCalculateSanctuary(new Array(loc[0], loc[1] - 1), 1);
    } else {
      return 0;
    }
  } else if (direction == 2) {
    if (isMapDrew[loc[0]][loc[1]] == 0) {
      return curTileScore + funcCalculateSanctuary(new Array(loc[0], loc[1] - 1), 1);
    } else if (isMapDrew[loc[0]][loc[1]] == 1) {
      return curTileScore + funcCalculateSanctuary(new Array(loc[0], loc[1] + 1), 0);
    } else if (isMapDrew[loc[0]][loc[1]] == 5) {
      return curTileScore + funcCalculateSanctuary(new Array(loc[0] + 1, loc[1]), 2);
    } else {
      return 0;
    }
  } else if (direction == 3) {
    if (isMapDrew[loc[0]][loc[1]] == 3) {
      return curTileScore + funcCalculateSanctuary(new Array(loc[0], loc[1] - 1), 1);
    } else if (isMapDrew[loc[0]][loc[1]] == 2) {
      return curTileScore + funcCalculateSanctuary(new Array(loc[0], loc[1] + 1), 0);
    } else if (isMapDrew[loc[0]][loc[1]] == 5) {
      return curTileScore + funcCalculateSanctuary(new Array(loc[0] - 1, loc[1]), 3);
    } else {
      return 0;
    }
  }

  var scoreToLeft = 0;
  var scoreToRight = 0;
  var scoreToTop = 0;
  var scoreToBottom = 0;

  if (isMapDrew[loc[0]][loc[1]] == 0 || isMapDrew[loc[0]][loc[1]] == 3 || isMapDrew[loc[0]][loc[1]] == 4) {
    scoreToLeft = funcCalculateSanctuary(new Array(loc[0], loc[1] - 1), 1);
  }

  if (isMapDrew[loc[0]][loc[1]] == 1 || isMapDrew[loc[0]][loc[1]] == 2 || isMapDrew[loc[0]][loc[1]] == 4) {
    scoreToRight = funcCalculateSanctuary(new Array(loc[0], loc[1] + 1), 0);
  }

  if (isMapDrew[loc[0]][loc[1]] == 0 || isMapDrew[loc[0]][loc[1]] == 1 || isMapDrew[loc[0]][loc[1]] == 5) {
    scoreToTop = funcCalculateSanctuary(new Array(loc[0] - 1, loc[1]), 3);
  }

  if (isMapDrew[loc[0]][loc[1]] == 2 || isMapDrew[loc[0]][loc[1]] == 3 || isMapDrew[loc[0]][loc[1]] == 5) {
    scoreToBottom = funcCalculateSanctuary(new Array(loc[0] - 1, loc[1]), 2);
  }

  return scoreToBottom + scoreToTop + scoreToLeft + scoreToRight;
}

var locLady = new Array(0, 0);
var locLion = new Array(5, 6);

function funcScoreEX(idx) {
  if (idx == 0) {
    scoretype = 1;
    event.srcElement.innerHTML = funcCalculateSanctuary(locLady);
  } else if (idx == 1) {
    scoretype = 2;
    event.srcElement.innerHTML = funcCalculateSanctuary(locLion);
  }
}

function funcDrawAvenue() {
  var btnFull = funcInsertElement("btnFull", "button", "btnTrans", 0.0452, 0.9070, 0.1135, 0.9755); //btnFull.style.border = "1px solid black"

  btnFull.style.backgroundColor = "red";
  btnFull.onclick = funcFullScreen;
  btnFull.style.backgroundImage = "url('img/fullscreen.png')";
  btnFull.style.borderRadius = "10%";

  var _loop = function _loop(_idx) {
    sltSantuary = funcInsertElement("sltSanctuary" + _idx, "select", "sltTrans", 0.7852, 0.0251 + 0.078 * _idx, 0.8491, 0.0900 + 0.078 * _idx);

    for (var idx2 = 0; idx2 < 7; idx2++) {
      opt = document.createElement("option");

      if (idx2 == 0) {
        opt.innerHTML = "";
      } else {
        switch (idx2) {
          case 1:
            opt.innerHTML = "A";
            break;

          case 2:
            opt.innerHTML = "B";
            break;

          case 3:
            opt.innerHTML = "C";
            break;

          case 4:
            opt.innerHTML = "D";
            break;

          case 5:
            opt.innerHTML = "E";
            break;

          case 6:
            opt.innerHTML = "F";
            break;

          default:
            break;
        }
      }

      sltSantuary.appendChild(opt);
    }

    sltSantuary.selectedIndex = 0;

    funcInsertElement("btnScore" + _idx, "button", "btnTrans", 0.8657, 0.0251 + 0.078 * _idx, 0.9509, 0.0900 + 0.078 * _idx).onclick = function () {
      funcCalSanctuary(_idx);
    };
  };

  for (var _idx = 0; _idx <= 4; _idx++) {
    var sltSantuary;
    var opt;

    _loop(_idx);
  }

  var leftTic = 0.1030;
  var leftStart = 0.0455;
  var topTic = 0.1380;
  var topStart = 0.0364;

  var _loop2 = function _loop2(idx1) {
    var _loop5 = function _loop5(idx2) {
      btnMap = funcInsertElement("btnMap" + idx1 + "_" + idx2, "button", "btnTrans", leftStart + leftTic * idx1, topStart + topTic * idx2, leftStart + leftTic * (idx1 + 1), topStart + topTic * (idx2 + 1));

      btnMap.onclick = function () {
        funcDrawTile(idx1, idx2);
      };

      btnMap.style.opacity = 0.5;
      btnMap.style.backgroundRepeat = "no-repeat";
    };

    for (var idx2 = 0; idx2 < 6; idx2++) {
      _loop5(idx2);
    }
  };

  for (var idx1 = 0; idx1 < 7; idx1++) {
    var btnMap;

    _loop2(idx1);
  }

  leftTic = 0.082;

  var _loop3 = function _loop3(_idx2) {
    btnTile = funcInsertElement("btnTile" + _idx2, "button", "btnTrans", 0.2009 + _idx2 * leftTic, 0.8816, 0.2769 + _idx2 * leftTic, 0.9820);

    btnTile.onclick = function () {
      funcSetTile(_idx2);
    };
  };

  for (var _idx2 = 0; _idx2 < 6; _idx2++) {
    var btnTile;

    _loop3(_idx2);
  }

  topTic = 0.075;

  var _loop4 = function _loop4(_idx3) {
    if (_idx3 == 2) {
      funcInsertElement("btnEXScore" + _idx3, "input", "btnTrans", 0.8843, 0.4214 + topTic * _idx3, 0.9481, 0.4778 + topTic * _idx3);
    } else {
      funcInsertElement("btnEXScore" + _idx3, "button", "btnTrans", 0.8843, 0.4214 + topTic * _idx3, 0.9481, 0.4778 + topTic * _idx3).onclick = function () {
        funcScoreEX(_idx3);
      };
    }
  };

  for (var _idx3 = 0; _idx3 < 3; _idx3++) {
    _loop4(_idx3);
  }

  funcInsertElement("btnPartialSum", "button", "btnTrans", 0.8667, 0.6875, 0.9491, 0.7462);
  funcInsertElement("btnMinus", "button", "btnTrans", 0.8667, 0.7635, 0.9491, 0.8240);

  funcInsertElement("btnSum", "button", "btnTrans", 0.8389, 0.8804, 0.9481, 0.9744).onclick = function () {
    funcCalFinalScore();
  };
}

function funcCalFinalScore() {
  var finalScore = 0;
  var partialSum = 0;
  var numOfMinus = 0;

  for (var _idx4 = 0; _idx4 < 5; _idx4++) {
    if (roundScore[_idx4] >= 0) {
      partialSum += Number(roundScore[_idx4]);
    }

    if (roundScore[_idx4] == 0) {
      numOfMinus++;
    }
  }

  partialSum += Number(document.getElementById("btnEXScore0").innerHTML);
  partialSum += Number(document.getElementById("btnEXScore1").innerHTML);
  document.getElementById("btnPartialSum").innerHTML = partialSum;
  document.getElementById("btnMinus").innerHTML = -5 * numOfMinus;
  finalScore = partialSum - 5 * numOfMinus;
  event.srcElement.innerHTML = finalScore;
}

funcDrawAvenue();