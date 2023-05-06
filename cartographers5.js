var pageHeight = document.documentElement.clientHeight;
var pageWidth = document.documentElement.clientWidth; //funcPrepareGetLocation()

pageHeight = pageWidth * 1113 / 783;
var mainDiv = document.getElementById("main");
var body = document.getElementById("body");
mainDiv.style.height = pageHeight + "px";
mainDiv.style.width = pageWidth + "px";
var seed = Math.floor(Math.random() * 100000);

function getRandom(bound) {
  var x = Math.sin(seed++) * 100000;
  return Math.floor((x - Math.floor(x)) * bound);
}

function appendElement(_type, _id, _className, _left, _top, _width, _height, _fontSize) {
  var newElement = document.createElement(_type);
  newElement.id = _id;
  newElement.className = _className;
  newElement.style.left = _left * pageWidth + "px";
  newElement.style.top = _top * pageHeight + "px";
  newElement.style.width = _width * pageWidth + "px";
  newElement.style.height = _height * pageHeight + "px";
  newElement.style.fontSize = _fontSize * pageWidth + "px";
  newElement.style.lineHeight = _height * pageHeight + "px";
  mainDiv.appendChild(newElement);
  return newElement;
}

function fucnDrawBound() {
  curTile++;
  var thisLineWidth = 0.005 * pageWidth;

  for (var idxX = 0; idxX < 11; idxX++) {
    for (var idxY = 0; idxY < 11; idxY++) {
      if (tileSet[idxX][idxY] > 0) {
        var clickedTile = document.getElementById("btnTile" + idxX + "_" + idxY);

        if (idxX == 0) {
          clickedTile.style.borderTop = thisLineWidth + "px solid black";
          clickedTile.style.backgroundPositionY = "-" + thisLineWidth + "px";
        } else if (tileSet[idxX][idxY] != tileSet[idxX - 1][idxY]) {
          if (tileSet[idxX - 1][idxY] == 0) {
            var tempClickedTile = document.getElementById("btnTile" + (idxX - 1) + "_" + idxY);
            tempClickedTile.style.borderBottom = thisLineWidth + "px solid black";
          }

          clickedTile.style.borderTop = thisLineWidth + "px solid black";
          clickedTile.style.backgroundPositionY = "-" + thisLineWidth + "px";
        }

        if (idxX == 10 || idxX + 1 < 11 && tileSet[idxX][idxY] != tileSet[idxX + 1][idxY]) {
          if (idxX != 10 && tileSet[idxX + 1][idxY] > 0) {
            thisLineWidth = lineWidth / 2;
          }

          clickedTile.style.borderBottom = thisLineWidth + "px solid black";
        }

        if (idxY == 0 || idxY - 1 >= 0 && tileSet[idxX][idxY] != tileSet[idxX][idxY - 1]) {
          if (idxY != 0 && tileSet[idxX][idxY - 1] > 0) {
            thisLineWidth = lineWidth / 2;
          }

          clickedTile.style.borderLeft = thisLineWidth + "px solid black";
          clickedTile.style.backgroundPositionX = "-" + thisLineWidth + "px";
        }

        if (idxY == 10 || idxY + 1 < 11 && tileSet[idxX][idxY] != tileSet[idxX][idxY + 1]) {
          if (idxY != 10 && tileSet[idxX][idxY + 1] > 0) {
            thisLineWidth = lineWidth / 2;
          }

          clickedTile.style.borderRight = thisLineWidth + "px solid black";
        }
      }
    }
  }
}

var curTile = 1;

function drawCartographers() {
  var btnDrawDone = appendElement("button", "buttonDrawDone", "mapTiles", 0.4600, 0.1420, 0.5400 - 0.4600, 0.2154 - 0.1477);

  btnDrawDone.onclick = function () {
    fucnDrawBound();
  };

  var leftIter = 0.15;
  var leftStart = 0.11;
  var leftTic = 0.0708;
  var topIter = 0.212;
  var topTic = 0.0498;

  var _loop = function _loop(idxX) {
    leftIter = leftStart;

    var _loop5 = function _loop5(idxY) {
      tile = appendElement("button", "btnTile" + idxX + "_" + idxY, "mapTiles", leftIter, topIter, leftTic, topTic, 0.1);

      tile.onclick = function () {
        funcTileClick(idxX, idxY);
      };

      leftIter += leftTic;
    };

    for (var idxY = 0; idxY < 11; idxY++) {
      _loop5(idxY);
    }

    topIter += topTic;
  };

  for (var idxX = 0; idxX < 11; idxX++) {
    var tile;

    _loop(idxX);
  }

  leftIter = 0.195;

  var _loop2 = function _loop2(idx) {
    coin = appendElement("button", "btnCoin" + idx, "mapTiles", leftIter, 0.820, 0.03, 0.022, 0.04);
    coin.style.color = "red";
    coin.style.lineHeight = coin.style.height;

    coin.onclick = function () {
      funcClickCoin(idx);
    };

    coin.style.borderRadius = "100%";
    leftIter += 0.0505;
  };

  for (var idx = 0; idx < 14; idx++) {
    var coin;

    _loop2(idx);
  }

  leftIter = 0.66;
  topIter = 0.06;

  var _loop3 = function _loop3(_idx) {
    tile = appendElement("button", "btnType" + _idx, "mapTiles", leftIter, topIter, 0.0708, 0.0498, 0.1); //tile.style.border = "1px dotted black"

    tile.style.backgroundImage = "url('img/cartographers/" + arrImg[_idx] + ".png')";
    tile.style.opacity = "0.5";
    tile.style.backgroundSize = tile.style.width + " " + tile.style.height;

    tile.onclick = function () {
      funcSelectType(_idx);
    };

    leftIter += 0.09;

    if (_idx == 3) {
      leftIter = 0.66;
      topIter = 0.13;
    }
  };

  for (var _idx = 1; _idx <= 6; _idx++) {
    var tile;

    _loop3(_idx);
  }

  var step = 0;

  var _loop4 = function _loop4(round) {
    leftIter = 0.065;
    topIter = 0.875;

    for (var _idx2 = 0; _idx2 < 4; _idx2++) {
      score = appendElement("input", "textScore" + _idx2 + "_" + round, "textScore", step + leftIter, topIter, 0.05, 0.028, 0.035);
      leftIter += 0.05;

      if (_idx2 == 1) {
        leftIter = 0.065;
        topIter = topIter += 0.028;
      }

      score.onchange = function () {
        funcCalSeason(round);
      };
    }

    sumScore = appendElement("p", "pSumScore" + round, "textScore", step + leftIter, 0.875, 0.05, 0.056, 0.035);
    step += 0.1865;
  };

  for (var round = 0; round < 4; round++) {
    var score;
    var sumScore;

    _loop4(round);
  }

  var pName = appendElement("input", "textName", "textScore", 0.095, 0.084, 0.22, 0.027, 0.027);
  var pTitle = appendElement("input", "textTitle", "textScore", 0.095, 0.148, 0.165, 0.027, 0.027);
  pName.style.fontFamily = pTitle.style.fontFamily = "'Nanum Pen Script', cursive";
  var finalScore = appendElement("button", "pFinalScore", "textScore", 0.84, 0.869, 0.055, 0.047, 0.035);
  finalScore.onclick = funcCalFinal; //finalScore.style.backgroundColor="red"
}

function funcCalFinal() {
  var score = new Array();
  var finalScore = 0;

  for (var idx = 0; idx < 4; idx++) {
    score[idx] = document.getElementById("pSumScore" + idx).innerHTML;

    if (!(score[idx] == null || score[idx].length == 0 || score[idx] == "")) {
      finalScore += Number(score[idx]);
    }
  }

  document.getElementById("pFinalScore").innerHTML = finalScore;
}

function funcCalSeason(round) {
  var score = new Array();

  for (var idx = 0; idx < 4; idx++) {
    score[idx] = document.getElementById("textScore" + idx + "_" + round).value;

    if (score[idx] == null || score[idx].length == 0 || score[idx] == "" || isNaN(score[idx])) {
      score[idx] = 0;
    } else {
      score[idx] = Number(score[idx]);
    }
  }

  document.getElementById("pSumScore" + round).innerHTML = Number(score[0] + score[1] + score[2] - Math.abs(score[3]));
}

var arrCoins = new Array();

for (var idx = 0; idx < 14; idx++) {
  arrCoins[idx] = 0;
}

function funcClickCoin(idx) {
  var coin = document.getElementById("btnCoin" + idx);

  if (arrCoins[idx] == 0) {
    arrCoins[idx] = 1;
    coin.style.backgroundColor = "black";
    coin.style.opacity = "0.5";
  } else if (arrCoins[idx] == 2) {
    coin.style.backgroundColor = "transparent";
    arrCoins[idx] = 0;
    coin.innerHTML = "";
  } else {
    arrCoins[idx] = 2;
    coin.innerHTML = "X";
  }
}

var arrImg = new Array("par", "forest", "village", "farm", "water", "monster", "mountain");
var selectedImgIdx = 0;

function funcSelectType(idx) {
  var tile = document.getElementById("btnType" + idx);

  if (selectedImgIdx == idx) {
    tile.style.opacity = "0.5";
    selectedImgIdx = 0;
    return;
  }

  if (selectedImgIdx > 0) {
    var prevTile = document.getElementById("btnType" + selectedImgIdx);
    prevTile.style.opacity = "0.5";
  }

  selectedImgIdx = idx;
  tile.style.opacity = "1.0";
}

var tileSet = new Array();

for (var _idx3 = 0; _idx3 < 11; _idx3++) {
  tileSet[_idx3] = new Array();
}

var locRuin = new Array();

for (var _idx4 = 0; _idx4 < 11; _idx4++) {
  locRuin[_idx4] = new Array();
}

var locMountain = new Array();

for (var _idx5 = 0; _idx5 < 11; _idx5++) {
  locMountain[_idx5] = new Array();
}

locRuin[1][5] = locRuin[2][1] = locRuin[2][9] = locRuin[8][1] = locRuin[9][5] = locRuin[8][9] = true;
locMountain[1][3] = locMountain[2][8] = locMountain[5][5] = locMountain[8][2] = locMountain[9][7] = true;

function funcTileClick(idxX, idxY) {
  if (locMountain[idxX][idxY] == true) {
    alert("산이 있는 칸입니다!");
    return;
  }

  if (selectedImgIdx > 0 && tileSet[idxX][idxY] > 0) {
    alert("수정할거면 먼저 지워주세요!");
    return;
  }

  tileSet[idxX][idxY] = curTile;
  var clickedTile = document.getElementById("btnTile" + idxX + "_" + idxY);

  if (selectedImgIdx == 0) {
    tileSet[idxX][idxY] = 0;
    clickedTile.style.border = "0px";
  } //console.log(idxX,idxY)


  clickedTile.style.backgroundImage = "url('img/cartographers/" + arrImg[selectedImgIdx] + ".png')";
  clickedTile.style.backgroundSize = clickedTile.style.width + " " + clickedTile.style.height;

  if (locRuin[idxX][idxY] == true) {
    clickedTile.style.opacity = "0.4";
  } //clickedTile.style.backgroundColor="red"

}

drawCartographers();