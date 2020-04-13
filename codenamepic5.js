var numOfPics = 145;

function funcUpdatePageSize(isMainDivSizeUpdate) {
  pageHeight = document.documentElement.clientHeight;
  pageWidth = document.documentElement.clientWidth;
  mainDiv.style.backgroundSize = pageWidth + "px " + pageHeight + "px";
  mainDiv.style.height = pageHeight + "px";
  mainDiv.style.width = pageWidth + "px";

  if (pageHeight < pageWidth) {
    pageWidth = Math.min(pageWidth, pageHeight * 0.9 / 4 * 7);
  }
}

funcWidthPerHeight(0);
funcUpdatePageSize(true);
funcWidthPerHeight(0);
funcUpdatePageSize(true);
$(window).resize(function () {
  funcUpdatePageSize(true);
  funcDrawCodenameBoard();
});
var wordList = new Array();

for (var idx = 0; idx < numOfPics; idx++) {
  wordList[idx] = "url('img/codenamepictures/" + idx + ".png')";
}

var idxAssasin = null;
var idxReds = null;
var idxBlues = null;

function funcSetSeed(roomNumber) {
  idxReds = new Array();
  idxBlues = new Array();
  var seed = roomNumber + "_";
  var d = new Date();
  seed += d.getFullYear() + "_";

  if (d.getHours() >= 1 && d.getHours() < 24) {
    seed += d.getMonth() + "_" + d.getDate() + "_";
  }

  if (d.getMinutes() >= 5 && d.getMinutes() < 56) {
    seed += d.getHours() + "_";
  } //console.log(seed)


  MMath.seedrandom(seed);

  for (var _idx = 0; _idx < 1000 * wordList.length; _idx++) {
    var idx1 = MMath.getRandom(0, wordList.length - 1);
    var idx2 = MMath.getRandom(0, wordList.length - 1);
    var tempWord = wordList[idx1];
    wordList[idx1] = wordList[idx2];
    wordList[idx2] = tempWord;
  }

  var arrSelected = new Array();
  idxAssasin = MMath.getRandom(0, 19);
  arrSelected[idxAssasin] = true;

  for (var _idx2 = 0; _idx2 < 8; _idx2++) {
    var selectedIdx = MMath.getRandom(0, 19);

    while (arrSelected[selectedIdx] == true) {
      selectedIdx = MMath.getRandom(0, 19);
    }

    arrSelected[selectedIdx] = true;
    idxReds[_idx2] = selectedIdx;
  }

  for (var _idx3 = 0; _idx3 < 7; _idx3++) {
    var _selectedIdx = MMath.getRandom(0, 19);

    while (arrSelected[_selectedIdx] == true) {
      _selectedIdx = MMath.getRandom(0, 19);
    }

    arrSelected[_selectedIdx] = true;
    idxBlues[_idx3] = _selectedIdx;
  }

  console.log(idxAssasin, idxReds, idxBlues);
}

var change = true;
var gameStarted = false;
var allSee = false;

function funcDrawCodenameBoard() {
  if (pageWidth < pageHeight) {
    for (var _idx4 = 0; _idx4 < nameOfRelocatedElements.length; _idx4++) {
      document.getElementById(nameOfRelocatedElements[_idx4]).style.display = "none";
    }

    var _pWarning = funcInsertElement("pWarning", "p", "sltTrans", 0.1, 0.1, 0.9, 0.2);

    _pWarning.innerHTML = "가로 모드로 실행해 주세요";
    _pWarning.style.display = "inline";
    return;
  }

  for (var _idx5 = 0; _idx5 < nameOfRelocatedElements.length; _idx5++) {
    document.getElementById(nameOfRelocatedElements[_idx5]).style.display = "inline";
  }

  var pWarning = document.getElementById("pWarning");

  if (pWarning != null) {
    pWarning.style.display = "none";
  }

  var inputRoomName = funcInsertElement("inputRoomName", "button", "sltTrans", 0.01, 0.02, 0.25, 0.08);
  inputRoomName.innerHTML = "방번호";
  inputRoomName.onclick = startGame;
  var btnChange = funcInsertElement("btnChange", "button", "sltTrans", 0.26, 0.02, 0.50, 0.08);
  btnChange.innerHTML = "교체";

  btnChange.onclick = function () {
    if (change == true) {
      change = false;
      event.srcElement.style.opacity = 0.5;
    } else {
      change = true;
      event.srcElement.style.opacity = 1.0;
    }
  };

  var btnAllShow = funcInsertElement("btnAllShow", "button", "sltTrans", 0.51, 0.02, 0.75, 0.08);
  btnAllShow.innerHTML = "확인";

  btnAllShow.onclick = function () {
    if (idxReds == null || idxBlues == null || idxAssasin == null) {
      return;
    }

    if (allSee == false) {
      if (confirm("정말 전체 단어를 확인하겠습니까?") != true) {
        return;
      }
    }

    if (allSee == true) {
      allSee = false;
    } else {
      allSee = true;
    }

    if (change == true) {
      change = false;
      document.getElementById("btnChange").style.opacity = 0.5;
    }

    for (var _idx6 = 0; _idx6 < 5; _idx6++) {
      for (var idx2 = 0; idx2 < 4; idx2++) {
        var btnSymbol = funcInsertElement("btnSym" + _idx6 + "_" + idx2, "button", "sltTrans", 0.01 + _idx6 * 0.94 / 5 + 0.01 * _idx6, 0.09 + idx2 * 0.86 / 4 + 0.01 * idx2, 0.01 + _idx6 * 0.94 / 5 + 0.01 * _idx6 + 0.02, 0.09 + idx2 * 0.86 / 4 + 0.01 * idx2 + 0.03);
        btnSymbol.style.borderRadius = "30%";

        if (allSee == true) {
          var showThis = false;
          var thisIdx = _idx6 + idx2 * 5;

          if (thisIdx == idxAssasin) {
            btnSymbol.style.backgroundColor = "black";
            showThis = true;
            continue;
          }

          for (var i = 0; i < idxReds.length; i++) {
            if (idxReds[i] == thisIdx) {
              btnSymbol.style.backgroundColor = "red";
              showThis = true;
            }
          }

          for (var _i = 0; _i < idxBlues.length; _i++) {
            if (idxBlues[_i] == thisIdx) {
              btnSymbol.style.backgroundColor = "blue";
              showThis = true;
            }
          }

          if (showThis == false) {
            btnSymbol.style.backgroundColor = "transparent";
          }
        } else {
          btnSymbol.style.backgroundColor = "transparent";
        }
      }
    }
  };

  var btnFull = funcInsertElement("btnFull", "button", "sltTrans", 0.76, 0.02, 0.98, 0.08);
  btnFull.innerHTML = "전체화면";
  btnFull.onclick = funcFullScreen;

  if (gameStarted) {
    console.log("redraw");

    var _loop = function _loop(_idx7) {
      var _loop2 = function _loop2(idx2) {
        var btnWord = funcInsertElement("btnWord" + _idx7 + "_" + idx2, "button", "sltTrans", 0.01 + _idx7 * 0.94 / 5 + 0.01 * _idx7, 0.09 + idx2 * 0.86 / 4 + 0.01 * idx2, 0.01 + (_idx7 + 1) * 0.94 / 5 + 0.01 * _idx7, 0.09 + (idx2 + 1) * 0.86 / 4 + 0.01 * idx2); //btnWord.style.backgroundImage = "url('https://github.com/eettrrr/bg/blob/master/codename/img/codename.png?raw=true')"

        btnWord.style.borderRadius = "10%"; //btnWord.innerHTML = wordList[5 * idx + idx2]

        btnWord.style.fontFamily = "'Stylish', sans-serif";
        btnWord.style.fontSize = Number(btnWord.style.width.replace("px", "")) / 4 + "px"; //btnWord.style.paddingTop = Number(btnWord.style.height.replace("px", "")) / 7 + "px"

        btnWord.onclick = function () {
          funcSelectCard(_idx7, idx2);
        };

        var btnSymbol = funcInsertElement("btnSym" + _idx7 + "_" + idx2, "button", "sltTrans", 0.01 + _idx7 * 0.94 / 5 + 0.01 * _idx7, 0.09 + idx2 * 0.86 / 4 + 0.01 * idx2, 0.01 + _idx7 * 0.94 / 5 + 0.01 * _idx7 + 0.02, 0.09 + idx2 * 0.86 / 4 + 0.01 * idx2 + 0.03);
        btnSymbol.style.borderRadius = "30%";

        if (allSee == true) {
          var thisIdx = _idx7 + idx2 * 5;

          if (thisIdx == idxAssasin) {
            btnSymbol.style.backgroundColor = "black";
            return "continue";
          }

          for (var i = 0; i < idxReds.length; i++) {
            if (idxReds[i] == thisIdx) {
              btnSymbol.style.backgroundColor = "red";
            }
          }

          for (var _i2 = 0; _i2 < idxBlues.length; _i2++) {
            if (idxBlues[_i2] == thisIdx) {
              btnSymbol.style.backgroundColor = "blue";
            }
          }
        } else {
          btnSymbol.style.backgroundColor = "transparent";
        }
      };

      for (var idx2 = 0; idx2 < 4; idx2++) {
        var _ret = _loop2(idx2);

        if (_ret === "continue") continue;
      }
    };

    for (var _idx7 = 0; _idx7 < 5; _idx7++) {
      _loop(_idx7);
    }
  }
}

var arrWordChange = new Array();
funcDrawCodenameBoard();

function startGame() {
  allSee = false;
  gameStarted = true;
  var val = prompt("방번호를 입력해주세요."); //let val = null

  if (val == null || val.length == 0) {
    //MMath.seedrandom(0)
    val = MMath.getRandom(0, 9999);
  }

  document.getElementById("inputRoomName").innerHTML = val;
  funcSetSeed(val);

  var _loop3 = function _loop3(_idx8) {
    var _loop4 = function _loop4(idx2) {
      var btnWord = funcInsertElement("btnWord" + _idx8 + "_" + idx2, "button", "sltTrans", 0.01 + _idx8 * 0.94 / 5 + 0.01 * _idx8, 0.09 + idx2 * 0.86 / 4 + 0.01 * idx2, 0.01 + (_idx8 + 1) * 0.94 / 5 + 0.01 * _idx8, 0.09 + (idx2 + 1) * 0.86 / 4 + 0.01 * idx2); //btnWord.style.backgroundImage = "url('https://github.com/eettrrr/bg/blob/master/codename/img/codename.png?raw=true')"

      btnWord.style.borderRadius = "10%";
      btnWord.style.backgroundImage = wordList[_idx8 + idx2 * 5];
      btnWord.style.fontFamily = "'Stylish', sans-serif"; //btnWord.style.fontSize = Number(btnWord.style.width.replace("px", "")) / 4 + "px"
      //btnWord.style.paddingTop = Number(btnWord.style.height.replace("px", "")) / 7 + "px"

      btnWord.onclick = function () {
        funcSelectCard(_idx8, idx2);
      };

      var btnSymbol = document.getElementById("btnSym" + _idx8 + "_" + idx2);

      if (btnSymbol != null) {
        btnSymbol.style.backgroundColor = "transparent";
      }
    };

    for (var idx2 = 0; idx2 < 4; idx2++) {
      _loop4(idx2);
    }
  };

  for (var _idx8 = 0; _idx8 < 5; _idx8++) {
    _loop3(_idx8);
  }
} //startGame()


function funcSelectCard(idx, idx2) {
  console.log("function funcSelectCard(idx,idx2)");
  var thisIdx = idx + idx2 * 5;

  if (change == true) {
    if (arrWordChange[thisIdx] > 0) {
      arrWordChange[thisIdx]++;
    } else {
      arrWordChange[thisIdx] = 1;
    }

    document.getElementById("btnWord" + idx + "_" + idx2).style.backgroundImage = wordList[thisIdx + 20 * arrWordChange[thisIdx]];
    return;
  }

  var drawed = false;

  if (thisIdx == idxAssasin) {
    document.getElementById("btnWord" + idx + "_" + idx2).style.backgroundImage = "url('https://github.com/eettrrr/bg/blob/master/codename/img/assa.jpg?raw=true')";
    drawed = true;
  }

  for (var i = 0; i < idxReds.length; i++) {
    if (idxReds[i] == thisIdx) {
      document.getElementById("btnWord" + idx + "_" + idx2).style.backgroundImage = "url('https://github.com/eettrrr/bg/blob/master/codename/img/red" + i % 7 + ".jpg?raw=true')";
      drawed = true;
    }
  }

  for (var _i3 = 0; _i3 < idxBlues.length; _i3++) {
    if (idxBlues[_i3] == thisIdx) {
      document.getElementById("btnWord" + idx + "_" + idx2).style.backgroundImage = "url('https://github.com/eettrrr/bg/blob/master/codename/img/blue" + _i3 % 7 + ".jpg?raw=true')";
      drawed = true;
    }
  }

  if (drawed == false) {
    document.getElementById("btnWord" + idx + "_" + idx2).style.backgroundImage = "url('https://github.com/eettrrr/bg/blob/master/codename/img/ino" + MMath.getRandom(0, 3) + ".jpg?raw=true')";
  }

  if (document.getElementById("btnWord" + idx + "_" + idx2).style.color == "transparent") {
    document.getElementById("btnWord" + idx + "_" + idx2).style.color = "white";
  } else {
    document.getElementById("btnWord" + idx + "_" + idx2).style.color = "transparent";
  }
} //startGame()