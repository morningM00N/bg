var pageHeight;
var pageWidth;
var widthPerHeight = 580 / 838;
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

mainDiv.style.backgroundImage = "url('img/gantsmod.png')";
funcUpdatePageSize(true);
var arrYellow = new Array();

for (var index = 0; index <= 3; index++) {
  arrYellow[index] = new Array();

  for (var idx2 = 0; idx2 <= 3; idx2++) {
    arrYellow[index][idx2] = false;
  }
}

arrYellow[0][3] = arrYellow[1][2] = arrYellow[2][1] = arrYellow[3][0] = true;
var arrBlue = new Array();

for (var _index = 0; _index <= 2; _index++) {
  arrBlue[_index] = new Array();

  for (var _idx = 0; _idx <= 3; _idx++) {
    arrBlue[_index][_idx] = false;
  }
}

arrBlue[0][0] = true;
var arrGreen = new Array();
var arrOrange = new Array();
var arrPurple = new Array();

for (var _index2 = 0; _index2 <= 10; _index2++) {
  arrGreen[_index2] = false;
  arrOrange[_index2] = arrPurple[_index2] = 0;
}

var numOfReroll = 0;
var numOfUsedReroll = 0;
var numOfPlus = 0;
var numOfUsedPlus = 0;
var numOfFox = 0;
var arrReroll = new Array();
var arrPlus = new Array();
var arrUseReroll = new Array();
var arrUsePlus = new Array();
var arrRound = new Array();

for (var idx = 0; idx < 6; idx++) {
  arrRound[idx] = false;
}

for (var _index3 = 0; _index3 < 7; _index3++) {
  arrReroll[_index3] = arrPlus[_index3] = arrUsePlus[_index3] = arrUseReroll[_index3] = false;
}

drawTile();

function funcCal() {
  var scoreY = 0;
  var scoreB = 0;
  var scoreO = 0;
  var scoreP = 0;
  var scoreG = 0;

  for (var _idx2 = 0; _idx2 <= 3; _idx2++) {
    var inc = 0;

    switch (_idx2) {
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

    for (var _idx3 = 0; _idx3 <= 3; _idx3++) {
      if (arrYellow[_idx3][_idx2] == false) {
        inc = 0;
      }
    }

    scoreY += inc;
  }

  var numOfBlue = 0;

  for (var _idx4 = 0; _idx4 <= 2; _idx4++) {
    for (var _idx5 = 0; _idx5 <= 3; _idx5++) {
      if (arrBlue[_idx4][_idx5] == true) {
        ++numOfBlue;
      }
    }
  }

  --numOfBlue;

  if (numOfBlue > 0) {
    scoreB = 1;
  }

  for (var _idx6 = 0; _idx6 < numOfBlue; _idx6++) {
    scoreB += _idx6;
  }

  var numOfGreen = 0;

  for (var _idx7 = 0; _idx7 < 11; _idx7++) {
    if (arrGreen[_idx7] == true) {
      ++numOfGreen;
    }
  }

  for (var _idx8 = 1; _idx8 <= numOfGreen; _idx8++) {
    scoreG += _idx8;
  }

  for (var _idx9 = 0; _idx9 < 11; _idx9++) {
    scoreO += arrOrange[_idx9];

    if (_idx9 == 3 || _idx9 == 6 || _idx9 == 8) {
      scoreO += arrOrange[_idx9];
    } else if (_idx9 == 10) {
      scoreO += 2 * arrOrange[_idx9];
    }
  }

  for (var _idx10 = 0; _idx10 < 11; _idx10++) {
    scoreP += arrPurple[_idx10];
  }

  console.log("" + scoreY + "," + scoreB + "," + scoreG + "," + scoreO + "," + scoreP + "," + numOfFox);
  document.getElementById("spanY").innerHTML = scoreY;
  document.getElementById("spanB").innerHTML = scoreB;
  document.getElementById("spanG").innerHTML = scoreG;
  document.getElementById("spanO").innerHTML = scoreO;
  document.getElementById("spanP").innerHTML = scoreP;
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

  document.getElementById("spanF").innerHTML = numOfFox * minScore;
  event.srcElement.innerHTML = Number(scoreY + scoreB + scoreG + scoreO + scoreP + minScore * numOfFox);
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
    button.innerHTML = "x";
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
    button.innerHTML = "";
    arrBlue[a][b] = false;
  }
}

function funcGreen(a) {
  var button = document.getElementById("btnGreen_" + a);

  if (arrGreen[a] == false) {
    for (var _index4 = 0; _index4 < a; _index4++) {
      if (arrGreen[_index4] == false) {
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
    for (var _index5 = a + 1; _index5 <= 10; _index5++) {
      if (arrGreen[_index5] == true) {
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
  for (var _index6 = 0; _index6 < a; _index6++) {
    if (arrOrange[_index6] == 0) {
      alert("왼쪽칸부터 채워주십시오.");
      return;
    }
  }

  for (var _index7 = a + 1; _index7 <= 10; _index7++) {
    if (arrOrange[_index7] != 0) {
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
  for (var _index8 = 0; _index8 < a; _index8++) {
    if (arrPurple[_index8] == 0) {
      alert("왼쪽칸부터 채워주십시오.");
      return;
    }
  }

  for (var _index9 = a + 1; _index9 <= 10; _index9++) {
    if (arrPurple[_index9] != 0) {
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
    for (var _idx11 = 0; _idx11 < a; _idx11++) {
      if (arrRound[_idx11] == false) {
        alert("" + (_idx11 + 1) + " 라운드부터 시작해 주십시오.");
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
    for (var _idx12 = 5; _idx12 > a; _idx12--) {
      if (arrRound[_idx12] == true) {
        alert("" + (_idx12 + 1) + " 라운드부터 취소해 주십시오.");
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
  document.getElementById("spanY").style.left = pageWidth * 7 / 360 + "px";
  document.getElementById("spanY").style.top = pageWidth * 480 / 360 + "px";
  document.getElementById("spanY").style.fontSize = pageWidth * 25 / 360 + "px"; //document.getElementById("spanY").innerHTML="10"

  document.getElementById("spanY").style.width = 0.1 * pageWidth + "px";
  document.getElementById("spanY").style.textAlign = "center";
  document.getElementById("spanB").style.left = pageWidth * 57 / 360 + "px";
  document.getElementById("spanB").style.top = pageWidth * 480 / 360 + "px";
  document.getElementById("spanB").style.fontSize = pageWidth * 25 / 360 + "px"; //document.getElementById("spanB").innerHTML="20"

  document.getElementById("spanB").style.width = 0.1 * pageWidth + "px";
  document.getElementById("spanB").style.textAlign = "center";
  document.getElementById("spanG").style.left = pageWidth * 106 / 360 + "px";
  document.getElementById("spanG").style.top = pageWidth * 480 / 360 + "px";
  document.getElementById("spanG").style.fontSize = pageWidth * 25 / 360 + "px"; //document.getElementById("spanG").innerHTML="30"

  document.getElementById("spanG").style.width = 0.1 * pageWidth + "px";
  document.getElementById("spanG").style.textAlign = "center";
  document.getElementById("spanO").style.left = pageWidth * 155 / 360 + "px";
  document.getElementById("spanO").style.top = pageWidth * 480 / 360 + "px";
  document.getElementById("spanO").style.fontSize = pageWidth * 25 / 360 + "px"; //document.getElementById("spanO").innerHTML="40"

  document.getElementById("spanO").style.width = 0.1 * pageWidth + "px";
  document.getElementById("spanO").style.textAlign = "center";
  document.getElementById("spanP").style.left = pageWidth * 205 / 360 + "px";
  document.getElementById("spanP").style.top = pageWidth * 480 / 360 + "px";
  document.getElementById("spanP").style.fontSize = pageWidth * 25 / 360 + "px"; //document.getElementById("spanP").innerHTML="40"

  document.getElementById("spanP").style.width = 0.1 * pageWidth + "px";
  document.getElementById("spanP").style.textAlign = "center";
  document.getElementById("spanF").style.left = pageWidth * 253 / 360 + "px";
  document.getElementById("spanF").style.top = pageWidth * 480 / 360 + "px";
  document.getElementById("spanF").style.fontSize = pageWidth * 25 / 360 + "px";
  document.getElementById("spanF").style.width = 0.1 * pageWidth + "px"; //document.getElementById("spanF").innerHTML="70"
  //document.getElementById("spanF").style.border="1px dotted red"

  document.getElementById("spanF").style.textAlign = "center";
  document.getElementById("spanScore").style.left = pageWidth * 313 / 360 + "px";
  document.getElementById("spanScore").style.top = pageWidth * 480 / 360 + "px";
  document.getElementById("spanScore").style.fontSize = pageWidth * 25 / 360 + "px";
  document.getElementById("spanScore").style.width = 0.1 * pageWidth + "px";
  document.getElementById("spanScore").style.height = 0.08 * pageWidth + "px"; //document.getElementById("spanScore").style.backgroundColor="black"
  //document.getElementById("spanScore").innerHTML="80"
  //document.getElementById("spanScore").style.border="1px dotted red"

  document.getElementById("spanScore").style.textAlign = "center";
  var ratio = 43 / 360;

  var _loop = function _loop(_index10) {
    button = document.createElement("input");
    button.type = "button";
    button.id = "btnPurple_" + _index10;
    maindiv.appendChild(button);
    button.className = "btnRound"; //var button = document.getElementById(btnID)

    button.style.left = pageWidth * ratio + "px";
    button.style.width = button.style.height = pageWidth * 25 / 360 + "px";
    button.style.top = pageWidth * 426 / 360 + "px";
    button.style.fontSize = pageWidth * 15 / 360 + "px";

    button.onclick = function () {
      funcPurple(_index10);
    };

    ratio += 276 / 3600;
    button.value = "";
    button.style.borderColor = "Transparent"; //button.style.border = "2px dotted red"
  };

  for (var _index10 = 0; _index10 <= 10; _index10++) {
    var button;

    _loop(_index10);
  }

  var ratio = 43 / 360;

  var _loop2 = function _loop2(_index11) {
    button = document.createElement("input");
    button.type = "button";
    button.id = "btnOrange_" + _index11;
    button.className = "btnRound";
    maindiv.appendChild(button);
    button.style.left = pageWidth * ratio + "px";
    button.style.width = button.style.height = pageWidth * 25 / 360 + "px";
    button.style.top = pageWidth * 378 / 360 + "px";
    button.style.fontSize = pageWidth * 15 / 360 + "px";
    button.value = "";
    button.style.border = "0px"; //button.style.border = "2px dotted red"

    button.onclick = function () {
      funcOrange(_index11);
    };

    ratio += 276 / 3600;
  };

  for (var _index11 = 0; _index11 <= 10; _index11++) {
    var button;

    _loop2(_index11);
  }

  var ratio = 43 / 360;

  var _loop3 = function _loop3(_index12) {
    button = document.createElement("input");
    button.type = "button";
    button.id = "btnGreen_" + _index12;
    button.className = "btnRound";
    maindiv.appendChild(button);
    button.style.left = pageWidth * ratio + "px";
    button.style.width = button.style.height = pageWidth * 25 / 360 + "px";
    button.style.top = pageWidth * 330 / 360 + "px";
    button.style.fontSize = pageWidth * 15 / 360 + "px";
    button.style.border = "0px"; //button.style.border = "2px dotted red"

    button.onclick = function () {
      funcGreen(_index12);
    };

    ratio += 276 / 3600;
    button.value = "";
  };

  for (var _index12 = 0; _index12 <= 10; _index12++) {
    var button;

    _loop3(_index12);
  }

  var ratio = 70 / 360;

  var _loop4 = function _loop4(_index13) {
    button = document.createElement("input");
    button.type = "button";
    button.id = "btnRound" + _index13;
    button.className = "btnRound";
    maindiv.appendChild(button);
    button.style.left = pageWidth * ratio + "px";
    button.style.width = button.style.height = pageWidth * 25 / 360 + "px";
    button.style.top = pageWidth * 9 / 360 + "px";
    button.style.fontSize = pageWidth * 15 / 360 + "px";
    button.style.border = "0px"; //button.style.border = "2px dotted red"

    button.onclick = function () {
      funcRound(_index13);
    };

    ratio += 50.3 / 360;
    button.value = "";
  };

  for (var _index13 = 0; _index13 <= 5; _index13++) {
    var button;

    _loop4(_index13);
  }

  ratio = 113 / 375;

  var _loop5 = function _loop5(_index14) {
    button = document.createElement("input");
    button.type = "button";
    button.id = "btnReroll" + _index14;
    button.className = "btnItem";
    maindiv.appendChild(button);
    button.style.left = pageWidth * ratio + "px";
    button.style.width = button.style.height = pageWidth * 25 / 375 + "px";
    button.style.top = pageWidth * 72 / 375 + "px";
    button.style.fontSize = pageWidth * 15 / 375 + "px";
    button.style.border = "0px"; //button.style.border = "2px dotted red"

    button.onclick = function () {
      funcReroll(_index14);
    };

    ratio += 359 / 3750;
    button.value = "";
  };

  for (var _index14 = 0; _index14 <= 6; _index14++) {
    var button;

    _loop5(_index14);
  }

  ratio = 113 / 375;

  var _loop6 = function _loop6(_index15) {
    button = document.createElement("input");
    button.type = "button";
    button.id = "btnPlus" + _index15;
    button.className = "btnItem";
    maindiv.appendChild(button);
    button.style.left = pageWidth * ratio + "px";
    button.style.width = button.style.height = pageWidth * 26 / 375 + "px";
    button.style.top = pageWidth * 124 / 375 + "px";
    button.style.fontSize = pageWidth * 15 / 375 + "px";
    button.style.border = "0px"; //button.style.border = "2px dotted red"

    button.onclick = function () {
      funcPlus(_index15);
    };

    ratio += 359 / 3750;
    button.value = "";
  };

  for (var _index15 = 0; _index15 <= 6; _index15++) {
    var button;

    _loop6(_index15);
  }

  var topratio = 167 / 360;

  var _loop7 = function _loop7(_x) {
    leftratio = 17 / 360;

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
      button.style.border = "0px"; //button.style.border = "2px dotted red"

      button.onclick = function () {
        funcYellow(_x, _y);
      };

      leftratio += 31 / 360;
      button.value = "";
    };

    for (var _y = 0; _y <= 3; _y++) {
      _loop9(_y);
    }

    topratio += 270 / 3600;
  };

  for (var _x = 0; _x <= 3; _x++) {
    var leftratio;
    var button;

    _loop7(_x);
  }

  0.6247, 0.4227, 0.6917, 0.4668;
  topratio = 216 / 360;
  var xtic = 0.052;
  var ytic = 0.087;

  var _loop8 = function _loop8(_x2) {
    leftratio = 194 / 360;

    var _loop10 = function _loop10(_y) {
      // var button = document.createElement("input")
      // button.type = "button"
      // button.id = "btnBlue_" + _x + "_" + _y
      // button.className = "btnRound"
      // maindiv.appendChild(button)
      // button.style.left = pageWidth * leftratio + "px"
      // button.style.width = button.style.height = pageWidth * 25 / 360 + "px"
      // button.style.top = pageWidth * topratio + "px"
      // button.style.fontSize = pageWidth * 15 / 360 + "px"
      // button.style.border = "0px"
      button = funcInsertElement("btnBlue_" + _x2 + "_" + _y, "button", "btnRound", 0.538 + _y * ytic, 0.380 + _x2 * xtic, 0.606 + _y * ytic, 0.428 + _x2 * xtic); //button.style.border = "1px solid black"

      button.style.border = "0px";
      button.value = "";
      button.innerHTML = "";
      button.style.fontSize = pageWidth * 15 / 360 + "px";

      button.onclick = function () {
        funcBlue(_x2, _y);
      };

      leftratio += 31 / 360; //button.style.border = "2px dotted red"
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