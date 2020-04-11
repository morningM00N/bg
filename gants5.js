var pageHeight;
var pageWidth;
var widthPerHeight = 421 / 600;
var maindiv = document.getElementById("main");
var mainDiv = document.getElementById("main");
var mainBody = document.getElementById("body");

function funcUpdatePageSize(isMainDivSizeUpdate) {
  pageHeight = document.documentElement.clientHeight;
  pageWidth = document.documentElement.clientWidth;

  if (widthPerHeight != 0) {
    if (pageWidth > pageHeight * widthPerHeight) {
      pageWidth = pageHeight * widthPerHeight;
    } else {
      pageHeight = pageWidth / widthPerHeight;
    }
  }

  if (isMainDivSizeUpdate == true) {
    mainDiv.style.height = pageHeight + "px";
    mainDiv.style.width = pageWidth + "px";
    mainDiv.style.backgroundSize = pageWidth + "px " + pageHeight + "px";
  }
}

funcUpdatePageSize(true);

function funcCal() {
  var scoreY = 0;
  var scoreB = 0;
  var scoreO = 0;
  var scoreP = 0;
  var scoreG = 0;

  for (var idx = 0; idx <= 3; idx++) {
    var inc = 0;

    switch (idx) {
      case 0:
        inc = 10;
        break;

      case 1:
        inc = 14;
        break;

      case 2:
        inc = 16;
        break;

      case 3:
        inc = 20;
        break;

      default:
        break;
    }

    for (var idx2 = 0; idx2 <= 3; idx2++) {
      if (arrYellow[idx2][idx] == false) {
        inc = 0;
      }
    }

    scoreY += inc;
  }

  var numOfBlue = 0;

  for (var _idx = 0; _idx <= 2; _idx++) {
    for (var _idx2 = 0; _idx2 <= 3; _idx2++) {
      if (arrBlue[_idx][_idx2] == true) {
        ++numOfBlue;
      }
    }
  }

  --numOfBlue;

  if (numOfBlue > 0) {
    scoreB = 1;
  }

  for (var _idx3 = 0; _idx3 < numOfBlue; _idx3++) {
    scoreB += _idx3;
  }

  var numOfGreen = 0;

  for (var _idx4 = 0; _idx4 < 11; _idx4++) {
    if (arrGreen[_idx4] == true) {
      ++numOfGreen;
    }
  }

  for (var _idx5 = 1; _idx5 <= numOfGreen; _idx5++) {
    scoreG += _idx5;
  }

  for (var _idx6 = 0; _idx6 < 11; _idx6++) {
    scoreO += arrOrange[_idx6];

    if (_idx6 == 3 || _idx6 == 6 || _idx6 == 8) {
      scoreO += arrOrange[_idx6];
    } else if (_idx6 == 10) {
      scoreO += 2 * arrOrange[_idx6];
    }
  }

  for (var _idx7 = 0; _idx7 < 11; _idx7++) {
    scoreP += arrPurple[_idx7];
  }

  console.log("" + scoreY + "," + scoreB + "," + scoreG + "," + scoreO + "," + scoreP + "," + numOfFox);
  document.getElementById("spanY").innerHTML = scoreY;
  document.getElementById("spanB").innerHTML = "+ " + scoreB;
  document.getElementById("spanG").innerHTML = "+ " + scoreG;
  document.getElementById("spanO").innerHTML = "+ " + scoreO;
  document.getElementById("spanP").innerHTML = "+ " + scoreP;
  var minScore = scoreY;

  if (minScore > scoreB) {
    minScore = scoreB;
  }

  if (minScore > scoreG) {
    minScore = scoreG;
  }

  if (minScore > scoreO) {
    minScore = scoreO;
  }

  if (minScore > scoreP) {
    minScore = scoreP;
  }

  document.getElementById("spanPlain").innerHTML = "+ <span style='color:red'>" + numOfFox + "</span> x " + minScore + " = " + Number(scoreY + scoreB + scoreG + scoreO + scoreP + minScore * numOfFox);
}

function funcReroll(a) {
  var button = document.getElementById("btnReroll" + a);

  if (arrReroll[a] == false) {
    alert("획득한 아이템을 사용해 주세요.");
    return;
  } else if (arrUseReroll[a] == false) {
    ++numOfUsedReroll;

    while (a - 1 >= 0 && arrUseReroll[a - 1] == false) {
      a -= 1;
    }

    button = document.getElementById("btnReroll" + a);
    arrUseReroll[a] = true;
    button.value = "x";
  } else {
    while (a + 1 < numOfReroll && arrUseReroll[a + 1] == true) {
      a += 1;
    }

    button = document.getElementById("btnReroll" + a);
    button.value = "";
    --numOfUsedReroll;
    arrUseReroll[a] = false;
  }
}

function funcPlus(a) {
  var button = document.getElementById("btnPlus" + a);

  if (arrPlus[a] == false) {
    alert("획득한 아이템을 사용해 주세요.");
    return;
  } else if (arrUsePlus[a] == false) {
    ++numOfUsedPlus;

    while (a - 1 >= 0 && arrUsePlus[a - 1] == false) {
      a -= 1;
    }

    button = document.getElementById("btnPlus" + a);
    arrUsePlus[a] = true;
    button.value = "x";
  } else {
    while (a + 1 < numOfPlus && arrUsePlus[a + 1] == true) {
      a += 1;
    }

    button = document.getElementById("btnPlus" + a);
    button.value = "";
    --numOfUsedPlus;
    arrUsePlus[a] = false;
  }
}

function gainReroll() {
  if (numOfReroll == 7) {
    return;
  }

  arrReroll[numOfReroll] = true;
  var button = document.getElementById("btnReroll" + numOfReroll);
  ++numOfReroll;
  button.style.border = "5px solid black";
}

function gainPlus() {
  if (numOfPlus == 7) {
    return;
  }

  arrPlus[numOfPlus] = true;
  var button = document.getElementById("btnPlus" + numOfPlus);
  ++numOfPlus;
  button.style.border = "5px solid black";
}

function canBeLooseReroll() {
  if (numOfReroll == numOfUsedReroll) {
    return false;
  }

  return true;
}

function canBeLoosePlus() {
  if (numOfPlus == numOfUsedPlus) {
    return false;
  }

  return true;
}

function looseReroll() {
  --numOfReroll;
  var button = document.getElementById("btnReroll" + numOfReroll);
  arrReroll[numOfReroll] = false;
  button.style.border = "0px solid black";
}

function loosePlus() {
  --numOfPlus;
  var button = document.getElementById("btnPlus" + numOfPlus);
  arrPlus[numOfPlus] = false;
  button.style.border = "0px solid black";
}

function funcYellow(a, b) {
  if (a == 0 && b == 3) {
    return;
  }

  if (a == 1 && b == 2) {
    return;
  }

  if (a == 2 && b == 1) {
    return;
  }

  if (a == 3 && b == 0) {
    return;
  }

  var button = document.getElementById("btnYellow_" + a + "_" + b);

  if (arrYellow[a][b] == false) {
    button.value = "x";
    arrYellow[a][b] = true;

    if (a == 3 && arrYellow[3][1] == true && arrYellow[3][2] == true && arrYellow[3][3] == true) {
      ++numOfFox;
    }

    if (a == b) {
      if (arrYellow[0][0] == true && arrYellow[1][1] == true && arrYellow[2][2] == true && arrYellow[3][3] == true) {
        gainPlus();
      }
    }
  } else {
    if (a == b) {
      if (arrYellow[0][0] == true && arrYellow[1][1] == true && arrYellow[2][2] == true && arrYellow[3][3] == true) {
        if (canBeLoosePlus() == false) {
          alert("아이템을 사용하였으므로 수정할 수 없습니다.");
          return;
        }

        loosePlus();
      }
    }

    if (a == 3 && arrYellow[3][1] == true && arrYellow[3][2] == true && arrYellow[3][3] == true) {
      --numOfFox;
    }

    button.value = "";
    arrYellow[a][b] = false;
  }
}

function funcBlue(a, b) {
  if (a == 0 && b == 0) {
    return;
  }

  var button = document.getElementById("btnBlue_" + a + "_" + b);

  if (arrBlue[a][b] == false) {
    button.value = "x";
    arrBlue[a][b] = true;

    if (a == 2 && arrBlue[a][0] == true && arrBlue[a][1] == true && arrBlue[a][2] == true && arrBlue[a][3] == true) {
      ++numOfFox;
    }

    if (b == 0) {
      if (arrBlue[2][0] == true && arrBlue[1][0] == true) {
        gainReroll();
      }
    } else if (b == 3) {
      if (arrBlue[2][3] == true && arrBlue[1][3] == true && arrBlue[0][3] == true) {
        gainPlus();
      }
    }
  } else {
    if (b == 0) {
      if (arrBlue[2][0] == true && arrBlue[1][0] == true) {
        if (canBeLooseReroll() == false) {
          alert("아이템을 사용하였으므로 수정할 수 없습니다.");
          return;
        }

        looseReroll();
      }
    } else if (b == 3) {
      if (arrBlue[2][3] == true && arrBlue[1][3] == true && arrBlue[0][3] == true) {
        if (canBeLoosePlus() == false) {
          alert("아이템을 사용하였으므로 수정할 수 없습니다.");
          return;
        }

        loosePlus();
      }
    }

    if (a == 2 && arrBlue[a][0] == true && arrBlue[a][1] == true && arrBlue[a][2] == true && arrBlue[a][3] == true) {
      --numOfFox;
    }

    button.value = "";
    arrBlue[a][b] = false;
  }
}

function funcGreen(a) {
  var button = document.getElementById("btnGreen_" + a);

  if (arrGreen[a] == false) {
    for (var index = 0; index < a; index++) {
      if (arrGreen[index] == false) {
        alert("왼쪽칸부터 채워주십시오.");
        return;
      }
    }

    if (a == 6) {
      ++numOfFox;
    }

    if (a == 3) {
      gainPlus();
    }

    if (a == 9) {
      gainReroll();
    }

    button.value = "x";
    arrGreen[a] = true;
  } else {
    for (var _index = a + 1; _index <= 10; _index++) {
      if (arrGreen[_index] == true) {
        alert("오른쪽칸부터 수정해주십시오.");
        return;
      }
    }

    if (a == 3) {
      if (canBeLoosePlus() == false) {
        alert("아이템을 사용하였으므로 수정할 수 없습니다.");
        return;
      }

      loosePlus();
    }

    if (a == 9) {
      if (canBeLooseReroll() == false) {
        alert("아이템을 사용하였으므로 수정할 수 없습니다.");
        return;
      }

      looseReroll();
    }

    if (a == 6) {
      --numOfFox;
    }

    button.value = "";
    arrGreen[a] = false;
  }
}

function funcOrange(a) {
  for (var index = 0; index < a; index++) {
    if (arrOrange[index] == 0) {
      alert("왼쪽칸부터 채워주십시오.");
      return;
    }
  }

  for (var _index2 = a + 1; _index2 <= 10; _index2++) {
    if (arrOrange[_index2] != 0) {
      alert("오른쪽칸부터 수정해주십시오.");
      return;
    }
  }

  var button = document.getElementById("btnOrange_" + a);
  arrOrange[a] += 1;
  var gainThisTime = true;

  if (arrOrange[a] == 7) {
    arrOrange[a] = 0;

    if (a == 5) {
      if (canBeLoosePlus() == false) {
        alert("아이템을 사용하였으므로 취소할 수 없습니다.");
        gainThisTime = false;
        arrOrange[a] = 1;
      }
    }

    if (a == 2) {
      if (canBeLooseReroll() == false) {
        alert("아이템을 사용하였으므로 취소할 수 없습니다.");
        gainThisTime = false;
        arrOrange[a] = 1;
      }
    }
  }

  if (arrOrange[a] == 0) {
    button.value = "";

    if (a == 5) {
      loosePlus();
    }

    if (a == 2) {
      looseReroll();
    }

    if (a == 7) {
      --numOfFox;
    }
  } else {
    if (arrOrange[a] == 1 && gainThisTime == true) {
      if (a == 5) {
        gainPlus();
      }

      if (a == 2) {
        gainReroll();
      }

      if (a == 7) {
        ++numOfFox;
      }
    }

    button.value = arrOrange[a];
  }
}

function funcPurple(a) {
  for (var index = 0; index < a; index++) {
    if (arrPurple[index] == 0) {
      alert("왼쪽칸부터 채워주십시오.");
      return;
    }
  }

  for (var _index3 = a + 1; _index3 <= 10; _index3++) {
    if (arrPurple[_index3] != 0) {
      alert("오른쪽칸부터 수정해주십시오.");
      return;
    }
  }

  var button = document.getElementById("btnPurple_" + a);
  arrPurple[a] += 1;

  if (a > 0 && arrPurple[a - 1] != 6) {
    while (arrPurple[a] <= arrPurple[a - 1]) {
      arrPurple[a] += 1;
    }
  }

  var gainThisTime = true;

  if (arrPurple[a] == 7) {
    if (a == 4 || a == 10) {
      if (canBeLoosePlus() == false) {
        alert("아이템을 사용하였으므로 취소할 수 없습니다.");
        gainThisTime = false;
        arrPurple[a] = arrPurple[a - 1] + 1;

        if (arrPurple[a] == 7) {
          arrPurple[a] = 1;
        }
      } else {
        arrPurple[a] = 0;
      }
    } else if (a == 2 || a == 7) {
      if (canBeLooseReroll() == false) {
        alert("아이템을 사용하였으므로 취소할 수 없습니다.");
        gainThisTime = false;
        arrPurple[a] = arrPurple[a - 1] + 1;

        if (arrPurple[a] == 7) {
          arrPurple[a] = 1;
        }
      } else {
        arrPurple[a] = 0;
      }
    } else {
      arrPurple[a] = 0;
    }
  }

  if (arrPurple[a] == 0) {
    if (a == 4 || a == 10) {
      loosePlus();
    }

    if (a == 2 || a == 7) {
      looseReroll();
    }

    if (a == 6) {
      --numOfFox;
    }

    button.value = "";
  } else {
    if (gainThisTime && (arrPurple[a] == arrPurple[a - 1] + 1 || arrPurple[a] == 1)) {
      if (a == 4 || a == 10) {
        gainPlus();
      } else if (a == 2 || a == 7) {
        gainReroll();
      } else if (a == 6) {
        ++numOfFox;
      }
    }

    button.value = arrPurple[a];
  }
}

function funcRound(a) {
  var button = document.getElementById("btnRound" + a);

  if (arrRound[a] == false) {
    for (var idx = 0; idx < a; idx++) {
      if (arrRound[idx] == false) {
        alert("" + (idx + 1) + " 라운드부터 시작해 주십시오.");
        return;
      }
    }

    arrRound[a] = true;
    button.value = "x";

    if (a == 0 || a == 2) {
      gainReroll();
    }

    if (a == 1) {
      gainPlus();
    }
  } else {
    for (var _idx8 = 5; _idx8 > a; _idx8--) {
      if (arrRound[_idx8] == true) {
        alert("" + (_idx8 + 1) + " 라운드부터 취소해 주십시오.");
        return;
      }
    }

    if (a == 0 || a == 2) {
      if (canBeLooseReroll() == false) {
        alert("아이템을 사용했으므로 수정할 수 없습니다.");
        return;
      }

      looseReroll();
    }

    if (a == 1) {
      if (canBeLoosePlus() == false) {
        alert("아이템을 사용했으므로 수정할 수 없습니다.");
        return;
      }

      loosePlus();
    }

    arrRound[a] = false;
    button.value = "";
  }
}

function drawTile() {
  var btnCal = document.getElementById("btnCalculate");
  btnCal.style.left = pageWidth * 5 / 360 + "px";
  btnCal.style.top = pageWidth * 520 / 360 + "px";
  btnCal.style.fontSize = pageWidth * 20 / 360 + "px";
  btnCal.style.padding = pageWidth * 8 / 360 + "px";
  var ratio = 46 / 360;

  var _loop = function _loop(index) {
    button = document.createElement("input");
    button.type = "button";
    button.id = "btnPurple_" + index;
    maindiv.appendChild(button);
    button.className = "btnRound"; //var button = document.getElementById(btnID)

    button.style.left = pageWidth * ratio + "px";
    button.style.width = button.style.height = pageWidth * 25 / 360 + "px";
    button.style.top = pageWidth * 462 / 360 + "px";
    button.style.fontSize = pageWidth * 15 / 360 + "px";

    button.onclick = function () {
      funcPurple(index);
    };

    ratio += 272 / 3600;
    button.value = "";
    button.style.borderColor = "Transparent";
  };

  for (var index = 0; index <= 10; index++) {
    var button;

    _loop(index);
  }

  var ratio = 46 / 360;

  var _loop2 = function _loop2(_index4) {
    button = document.createElement("input");
    button.type = "button";
    button.id = "btnOrange_" + _index4;
    button.className = "btnRound";
    maindiv.appendChild(button);
    button.style.left = pageWidth * ratio + "px";
    button.style.width = button.style.height = pageWidth * 25 / 360 + "px";
    button.style.top = pageWidth * 411 / 360 + "px";
    button.style.fontSize = pageWidth * 15 / 360 + "px";
    button.value = "";
    button.style.border = "0px";

    button.onclick = function () {
      funcOrange(_index4);
    };

    ratio += 272 / 3600;
  };

  for (var _index4 = 0; _index4 <= 10; _index4++) {
    var button;

    _loop2(_index4);
  }

  var ratio = 46 / 360;

  var _loop3 = function _loop3(_index5) {
    button = document.createElement("input");
    button.type = "button";
    button.id = "btnGreen_" + _index5;
    button.className = "btnRound";
    maindiv.appendChild(button);
    button.style.left = pageWidth * ratio + "px";
    button.style.width = button.style.height = pageWidth * 25 / 360 + "px";
    button.style.top = pageWidth * 360 / 360 + "px";
    button.style.fontSize = pageWidth * 15 / 360 + "px";
    button.style.border = "0px";

    button.onclick = function () {
      funcGreen(_index5);
    };

    ratio += 272 / 3600;
    button.value = "";
  };

  for (var _index5 = 0; _index5 <= 10; _index5++) {
    var button;

    _loop3(_index5);
  }

  var ratio = 71 / 360;

  var _loop4 = function _loop4(_index6) {
    button = document.createElement("input");
    button.type = "button";
    button.id = "btnRound" + _index6;
    button.className = "btnRound";
    maindiv.appendChild(button);
    button.style.left = pageWidth * ratio + "px";
    button.style.width = button.style.height = pageWidth * 25 / 360 + "px";
    button.style.top = pageWidth * 13 / 360 + "px";
    button.style.fontSize = pageWidth * 15 / 360 + "px";
    button.style.border = "0px";

    button.onclick = function () {
      funcRound(_index6);
    };

    ratio += 50 / 360;
    button.value = "";
  };

  for (var _index6 = 0; _index6 <= 5; _index6++) {
    var button;

    _loop4(_index6);
  }

  ratio = 115 / 375;

  var _loop5 = function _loop5(_index7) {
    button = document.createElement("input");
    button.type = "button";
    button.id = "btnReroll" + _index7;
    button.className = "btnItem";
    maindiv.appendChild(button);
    button.style.left = pageWidth * ratio + "px";
    button.style.width = button.style.height = pageWidth * 25 / 375 + "px";
    button.style.top = pageWidth * 80 / 375 + "px";
    button.style.fontSize = pageWidth * 15 / 375 + "px";
    button.style.border = "0px";

    button.onclick = function () {
      funcReroll(_index7);
    };

    ratio += 355 / 3750;
    button.value = "";
  };

  for (var _index7 = 0; _index7 <= 6; _index7++) {
    var button;

    _loop5(_index7);
  }

  ratio = 115 / 375;

  var _loop6 = function _loop6(_index8) {
    button = document.createElement("input");
    button.type = "button";
    button.id = "btnPlus" + _index8;
    button.className = "btnItem";
    maindiv.appendChild(button);
    button.style.left = pageWidth * ratio + "px";
    button.style.width = button.style.height = pageWidth * 25 / 375 + "px";
    button.style.top = pageWidth * 138 / 375 + "px";
    button.style.fontSize = pageWidth * 15 / 375 + "px";
    button.style.border = "0px";

    button.onclick = function () {
      funcPlus(_index8);
    };

    ratio += 355 / 3750;
    button.value = "";
  };

  for (var _index8 = 0; _index8 <= 6; _index8++) {
    var button;

    _loop6(_index8);
  }

  var topratio = 183 / 360;

  var _loop7 = function _loop7(_x) {
    leftratio = 19 / 360;

    var _loop9 = function _loop9(_y) {
      button = document.createElement("input");
      button.type = "button";
      button.id = "btnYellow_" + _x + "_" + _y;
      button.className = "btnRound";
      maindiv.appendChild(button);
      button.style.left = pageWidth * leftratio + "px";
      button.style.width = button.style.height = pageWidth * 25 / 360 + "px";
      button.style.top = pageWidth * topratio + "px";
      button.style.fontSize = pageWidth * 15 / 360 + "px";
      button.style.border = "0px";

      button.onclick = function () {
        funcYellow(_x, _y);
      };

      leftratio += 31 / 360;
      button.value = "";
    };

    for (var _y = 0; _y <= 3; _y++) {
      _loop9(_y);
    }

    topratio += 295 / 3600;
  };

  for (var _x = 0; _x <= 3; _x++) {
    var leftratio;
    var button;

    _loop7(_x);
  }

  topratio = 216 / 360;
  var yy = 0.0857;
  var xx = 0.058;

  var _loop8 = function _loop8(_x2) {
    leftratio = 194 / 360;

    var _loop10 = function _loop10(_y) {
      button = document.createElement("input");
      button.type = "button";
      button.id = "btnBlue_" + _x2 + "_" + _y;
      button.className = "btnRound";
      maindiv.appendChild(button);
      button.style.left = pageWidth * leftratio + "px";
      button.style.width = button.style.height = pageWidth * 25 / 360 + "px";
      button.style.top = pageWidth * topratio + "px";
      button.style.fontSize = pageWidth * 15 / 360 + "px";
      button.style.border = "2px solid red";
      button.value = "";
      leftratio += 31 / 360;
      funcInsertElement(button.id, "button", "btnRound", 0.538 + _y * yy, 0.422 + _x2 * xx, 0.61 + _y * yy, 0.47 + _x2 * xx);

      button.onclick = function () {
        funcBlue(_x2, _y);
      };
    };

    for (var _y = 0; _y <= 3; _y++) {
      _loop10(_y);
    }

    topratio += 295 / 3600;
  };

  for (var _x2 = 0; _x2 <= 2; _x2++) {
    var leftratio;
    var button;

    _loop8(_x2);
  }
} //funcPrepareGetLocation()