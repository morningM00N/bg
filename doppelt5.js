var arrYellow = new Array();

for (var idx = 0; idx < 10; idx++) {
  arrYellow[idx] = 0;
}

var arrBlue = new Array();
var arrGreen = new Array();
var arrPink = new Array();

for (var index = 0; index <= 12; index++) {
  arrBlue[index] = arrPink[index] = arrGreen[index] = 0;
}

var arrGray = new Array();

for (var _idx = 0; _idx < 4; _idx++) {
  arrGray[_idx] = new Array();

  for (var idx2 = 0; idx2 < 6; idx2++) {
    arrGray[_idx][idx2] = false;
  }
}

var numOfReroll = 0;
var numOfUsedReroll = 0;
var numOfPlus = 0;
var numOfUsedPlus = 0;
var numOfReturn = 0;
var numOfUsedReturn = 0;
var numOfFox = 0;
var arrReroll = new Array();
var arrPlus = new Array();
var arrReturn = new Array();
var arrUseReroll = new Array();
var arrUsePlus = new Array();
var arrUseReturn = new Array();
var arrRound = new Array();

for (var _idx2 = 0; _idx2 < 6; _idx2++) {
  arrRound[_idx2] = false;
}

for (var _index = 0; _index < 7; _index++) {
  arrReturn[_index] = arrUseReturn[_index] = arrReroll[_index] = arrPlus[_index] = arrUsePlus[_index] = arrUseReroll[_index] = false;
}

var pageHeight = document.documentElement.clientHeight;
var pageWidth = document.documentElement.clientWidth;
pageHeight = pageWidth / 567 * 681;

function funcCal() {
  var scoreGray = 0;
  var scoreYellow = 0;
  var scoreBlue = 0;
  var scoreGreen = 0;
  var scorePink = 0;
  var numOfGray = 0;

  for (var _idx3 = 0; _idx3 < 6; _idx3++) {
    var check = true;

    for (var _idx4 = 0; _idx4 < 4; _idx4++) {
      if (arrGray[_idx4][_idx3] == false) {
        check = false;
        break;
      }
    }

    if (check == true) {
      switch (_idx3) {
        case 0:
          scoreGray += 2;
          break;

        case 1:
          scoreGray += 4;
          break;

        case 2:
          scoreGray += 7;
          break;

        case 3:
          scoreGray += 11;
          break;

        case 4:
          scoreGray += 16;
          break;

        case 5:
          scoreGray += 22;
          break;

        default:
          break;
      }
    }
  }

  var numOfYellow = 0;

  for (var _idx5 = 0; _idx5 < 10; _idx5++) {
    if (arrYellow[_idx5] == 2) {
      ++numOfYellow;
    }
  }

  tic = 3;

  for (var _idx6 = 0; _idx6 < numOfYellow; _idx6++) {
    scoreYellow += tic;
    tic += 1;

    if (_idx6 < 4) {
      tic += 3;
    }
  }

  var tic = 1;

  for (var _idx7 = 0; _idx7 < 12; _idx7++) {
    if (arrBlue[_idx7] > 0) {
      scoreBlue += tic;
    } else {
      break;
    }

    tic += 1;
  }

  var multiGreen = new Array(2, 2, 2, 1, 3, 3, 3, 2, 3, 1, 4, 1);

  for (var _idx8 = 0; _idx8 < 6; _idx8++) {
    if (arrGreen[2 * _idx8 + 1] > 0) {
      scoreGreen += multiGreen[2 * _idx8] * arrGreen[2 * _idx8] - multiGreen[2 * _idx8 + 1] * arrGreen[2 * _idx8 + 1];
    }
  }

  for (var _idx9 = 0; _idx9 < 12; _idx9++) {
    scorePink += arrPink[_idx9];
  }

  console.log("" + scoreGray + "," + scoreYellow + "," + scoreBlue + "," + scoreGreen + "," + scorePink + "," + numOfFox);
  var minScore = scoreGray;

  if (minScore > scoreYellow) {
    minScore = scoreYellow;
  }

  if (minScore > scoreBlue) {
    minScore = scoreBlue;
  }

  if (minScore > scoreGreen) {
    minScore = scoreGreen;
  }

  if (minScore > scorePink) {
    minScore = scorePink;
  }

  document.getElementById("p0").innerHTML = scoreGray;
  document.getElementById("p1").innerHTML = scoreYellow;
  document.getElementById("p2").innerHTML = scoreBlue;
  document.getElementById("p3").innerHTML = scoreGreen;
  document.getElementById("p4").innerHTML = scorePink;
  document.getElementById("p5").innerHTML = minScore * numOfFox;
  document.getElementById("p6").innerHTML = scoreGray + scoreYellow + scoreBlue + scoreGreen + scorePink + minScore * numOfFox;
}

function funcReturn(a) {
  var button = document.getElementById("btnReturn" + a);

  if (arrReturn[a] == false) {
    alert("획득한 아이템을 사용해 주세요.");
    return;
  } else if (arrUseReturn[a] == false) {
    ++numOfUsedReturn;

    while (a - 1 >= 0 && arrUseReturn[a - 1] == false) {
      a -= 1;
    }

    button = document.getElementById("btnReturn" + a);
    arrUseReturn[a] = true;
    button.innerHTML = "x";
  } else {
    while (a + 1 < numOfReturn && arrUseReturn[a + 1] == true) {
      a += 1;
    }

    button = document.getElementById("btnReturn" + a);
    button.innerHTML = "";
    --numOfUsedReturn;
    arrUseReturn[a] = false;
  }
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
    button.innerHTML = "x";
  } else {
    while (a + 1 < numOfReroll && arrUseReroll[a + 1] == true) {
      a += 1;
    }

    button = document.getElementById("btnReroll" + a);
    button.innerHTML = "";
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
    button.innerHTML = "x";
  } else {
    while (a + 1 < numOfPlus && arrUsePlus[a + 1] == true) {
      a += 1;
    }

    button = document.getElementById("btnPlus" + a);
    button.innerHTML = "";
    --numOfUsedPlus;
    arrUsePlus[a] = false;
  }
}

function gainReroll() {
  if (numOfReroll == 6) {
    return;
  }

  arrReroll[numOfReroll] = true;

  if (numOfReroll == 5) {
    ++numOfFox;
  }

  var button = document.getElementById("btnReroll" + numOfReroll);
  ++numOfReroll;
  button.style.border = pageWidth / 200 + "px solid black";
}

function gainPlus() {
  if (numOfPlus == 6) {
    return;
  }

  arrPlus[numOfPlus] = true;
  var button = document.getElementById("btnPlus" + numOfPlus);
  ++numOfPlus;
  button.style.border = pageWidth / 200 + "px solid black";
}

function gainReturn() {
  if (numOfReturn == 6) {
    return;
  }

  arrReturn[numOfReturn] = true;
  var button = document.getElementById("btnReturn" + numOfReturn);
  ++numOfReturn;
  button.style.border = pageWidth / 200 + "px solid black";
}

function canBeLooseReroll() {
  if (numOfReroll == numOfUsedReroll) {
    return false;
  }

  return true;
}

function canBeLooseReturn() {
  if (numOfReturn == numOfUsedReturn) {
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
  if (numOfReroll == 6) {
    --numOfFox;
  }

  --numOfReroll;
  var button = document.getElementById("btnReroll" + numOfReroll);
  arrReroll[numOfReroll] = false;
  button.style.border = "0px solid black";
}

function looseReturn() {
  --numOfReturn;
  var button = document.getElementById("btnReturn" + numOfReturn);
  arrReturn[numOfReturn] = false;
  button.style.border = "0px solid black";
}

function loosePlus() {
  --numOfPlus;
  var button = document.getElementById("btnPlus" + numOfPlus);
  arrPlus[numOfPlus] = false;
  button.style.border = "0px solid black";
}

function funcYellow(a) {
  var button = document.getElementById("btnYellow" + a);

  if (arrYellow[a] == 0) {
    button.style.border = pageWidth / 200 + "px solid black";
    arrYellow[a] = 1;

    if (a == 0) {
      if (arrYellow[1] > 0) {
        gainReroll();
      }

      if (arrYellow[5] > 0) {
        gainReturn();
      }
    }

    if (a == 1) {
      if (arrYellow[0] > 0) {
        gainReroll();
      }
    }

    if (a == 2 || a == 3 || a == 4) {
      if (arrYellow[2] > 0 && arrYellow[3] > 0 && arrYellow[4] > 0) {
        gainPlus();
      }
    }

    if (a == 5) {
      if (arrYellow[0] > 0) {
        gainReturn();
      }
    }

    if (a == 7 || a == 8 || a == 9) {
      if (arrYellow[7] > 0 && arrYellow[8] > 0 && arrYellow[9] > 0) {
        {
          ++numOfFox;
        }
      }
    }
  } else if (arrYellow[a] == 2) {
    if (a == 0) {
      if (arrYellow[1] > 0) {
        if (canBeLooseReroll() == false) {
          alert("아이템을 사용하였으므로 수정할 수 없습니다.");
          return;
        }
      }

      if (arrYellow[5] > 0) {
        if (canBeLooseReturn() == false) {
          alert("아이템을 사용하였으므로 수정할 수 없습니다.");
          return;
        }

        looseReturn();
      }

      if (arrYellow[1] > 0) {
        looseReroll();
      }
    }

    if (a == 1) {
      if (arrYellow[0] > 0) {
        if (canBeLooseReroll() == false) {
          alert("아이템을 사용하였으므로 수정할 수 없습니다.");
          return;
        }

        looseReroll();
      }
    }

    if (a == 2 || a == 3 || a == 4) {
      if (arrYellow[2] > 0 && arrYellow[3] > 0 && arrYellow[4] > 0) {
        if (canBeLoosePlus() == false) {
          alert("아이템을 사용하였으므로 수정할 수 없습니다.");
          return;
        }

        loosePlus();
      }
    }

    if (a == 5) {
      if (arrYellow[0] > 0) {
        if (canBeLooseReturn() == false) {
          alert("아이템을 사용하였으므로 수정할 수 없습니다.");
          return;
        }

        looseReturn();
      }
    }

    if (a == 7 || a == 8 || a == 9) {
      if (arrYellow[7] > 0 && arrYellow[8] > 0 && arrYellow[9] > 0) {
        {
          --numOfFox;
        }
      }
    }

    button.innerHTML = "";
    button.style.border = "0px";
    arrYellow[a] = 0;
  } else {
    arrYellow[a] = 2;
    button.innerHTML = "x";
  }
}

function funcGray(a, b) {
  var button = document.getElementById("btnGray" + a + "_" + b);

  if (arrGray[a][b] == false) {
    button.innerHTML = "x";
    arrGray[a][b] = true;

    if (b == 0 && arrGray[0][0] == true && arrGray[1][0] == true && arrGray[2][0] == true && arrGray[3][0] == true) {
      gainPlus();
    }

    if (b == 2 && arrGray[0][b] == true && arrGray[1][b] == true && arrGray[2][b] == true && arrGray[3][b] == true) {
      ++numOfFox;
    }
  } else {
    if (b == 0) {
      if (arrGray[0][0] == true && arrGray[1][0] == true && arrGray[2][0] == true && arrGray[3][0] == true) {
        if (canBeLoosePlus() == false) {
          alert("아이템을 사용하였으므로 수정할 수 없습니다.");
          return;
        }

        loosePlus();
      }
    }

    if (b == 2 && arrGray[0][b] == true && arrGray[1][b] == true && arrGray[2][b] == true && arrGray[3][b] == true) {
      --numOfFox;
    }

    button.innerHTML = "";
    arrGray[a][b] = false;
  }
}

function funcBlue(idx) {
  var slt = document.getElementById("btnBlue" + idx);
  console.log(slt.selectedIndex);

  if (idx > 0 && arrBlue[idx - 1] == 0) {
    alert("왼쪽 칸부터 입력해주세요.");
    slt.selectedIndex = 0;
    return;
  }

  if (idx > 0 && slt.selectedIndex > arrBlue[idx - 1]) {
    alert("앞의 칸보다 큰 수를 입력할 수 없습니다.");
    slt.selectedIndex = 0;
    return;
  }

  arrBlue[idx] = slt.selectedIndex;
  var btn = document.getElementById("btnRemoveBlue" + idx);
  btn.style.display = "inline";

  if (arrBlue[idx] > 0) {
    if (idx == 1 || idx == 9) {
      gainReturn();
    }

    if (idx == 4) {
      gainPlus();
    }

    if (idx == 5) {
      gainReroll();
    }
  }
}

function funcGreen(idx) {
  var slt = document.getElementById("btnGreen" + idx);

  if (idx > 0 && arrGreen[idx - 1] == 0) {
    alert("왼쪽 칸부터 입력해주세요.");
    slt.selectedIndex = 0;
    return;
  }

  arrGreen[idx] = slt.selectedIndex;
  var btn = document.getElementById("btnRemoveGreen" + idx);
  btn.style.display = "inline";

  if (arrGreen[idx] > 0) {
    if (idx == 1) {
      gainReroll();
    }

    if (idx == 4) {
      gainReturn();
    }

    if (idx == 8) {
      gainPlus();
    }

    if (idx == 6) {
      ++numOfFox;
    }
  }
}

var thresPink = new Array(1, 1, 2, 3, 4, 5, 6, 2, 3, 4, 5, 6);

function funcPink(idx) {
  var slt = document.getElementById("btnPink" + idx);

  if (idx > 0 && arrPink[idx - 1] == 0) {
    alert("왼쪽 칸부터 입력해주세요.");
    slt.selectedIndex = 0;
    return;
  }

  if (slt.selectedIndex > 0 && slt.selectedIndex < thresPink[idx]) {
    alert("조건을 만족하지 않았습니다.");
    slt.selectedIndex = 0;
    return;
  }

  arrPink[idx] = slt.selectedIndex;
  var btn = document.getElementById("btnRemovePink" + idx);
  btn.style.display = "inline";

  if (arrPink[idx] > 0) {
    if (idx == 4) {
      gainPlus();
    }

    if (idx == 3) {
      gainReturn();
    }

    if (idx == 2 || idx == 9) {
      gainReroll();
    }

    if (idx == 7) {
      ++numOfFox;
    }
  }
}

function funcRound(a) {
  var button = document.getElementById("btnRound" + a);

  if (arrRound[a] == false) {
    for (var _idx10 = 0; _idx10 < a; _idx10++) {
      if (arrRound[_idx10] == false) {
        alert("" + (_idx10 + 1) + " 라운드부터 시작해 주십시오.");
        return;
      }
    }

    arrRound[a] = true;
    button.innerHTML = "x";

    if (a == 0) {
      gainReroll();
    }

    if (a == 1) {
      gainPlus();
    }

    if (a == 2) {
      gainReturn();
    }
  } else {
    for (var _idx11 = 5; _idx11 > a; _idx11--) {
      if (arrRound[_idx11] == true) {
        alert("" + (_idx11 + 1) + " 라운드부터 취소해 주십시오.");
        return;
      }
    }

    if (a == 0) {
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

    if (a == 2) {
      if (canBeLooseReturn() == false) {
        alert("아이템을 사용했으므로 수정할 수 없습니다.");
        return;
      }

      looseReturn();
    }

    arrRound[a] = false;
    button.innerHTML = "";
  }
}

function drawTile() {
  var maindiv = document.getElementById("main");
  var mainbody = document.getElementById("body");
  var roundLeft = 0.85;
  var roundTop = 0.035;
  var roundTip = 0.138;
  var roundWidth = 0.1;
  var roundHeight = 0.1;

  for (var _idx12 = 0; _idx12 < 7; _idx12++) {
    var pScore = document.createElement("p");
    pScore.id = "p" + _idx12;
    pScore.className = "btnRound";
    pScore.style.left = roundLeft * pageWidth + "px";
    pScore.style.textAlign = "center";
    pScore.style.lineHeight = roundHeight * pageHeight + "px";
    pScore.style.top = roundTop * pageHeight + "px";
    pScore.style.width = roundWidth * pageWidth + "px";
    pScore.style.height = roundHeight * pageHeight + "px";
    pScore.style.margin = "0px";
    pScore.style.fontSize = 0.06 * pageWidth + "px";
    pScore.onclick = funcCal;
    maindiv.appendChild(pScore);
    roundTop += roundTip;
  }

  maindiv.style.height = pageHeight + "px";
  maindiv.style.width = pageWidth + "px";
  mainbody.style.height = pageHeight + "px";
  mainbody.style.width = pageWidth + "px";
  var roundLeftStart = 0.19;
  var roundLeftTic = 0.1074;
  var roundTop = 0.025;
  var roundWidth = 0.052;
  var roundHeight = 0.045;
  var fontSize = 0.05;

  var _loop = function _loop(round) {
    btnRound = document.createElement("button");
    btnRound.id = "btnRound" + round;
    btnRound.className = "btnRound";
    btnRound.style.left = roundLeftStart * pageWidth + "px";
    btnRound.style.top = roundTop * pageHeight + "px";
    btnRound.style.width = roundWidth * pageWidth + "px";
    btnRound.style.height = roundHeight * pageHeight + "px";
    btnRound.style.fontSize = fontSize * pageWidth + "px";

    btnRound.onclick = function () {
      funcRound(round);
    };

    maindiv.append(btnRound);
    roundLeftStart += roundLeftTic;
  };

  for (var round = 0; round < 6; round++) {
    var btnRound;

    _loop(round);
  }

  var roundLeftStart = 0.273;
  var roundLeftTic = 0.09;
  var roundTop = 0.137;
  var roundTopTic = 0.082;
  var roundWidth = 0.047;
  var roundHeight = 0.039;

  var _loop2 = function _loop2(_round) {
    {
      btnRound = document.createElement("button");
      btnRound.id = "btnReroll" + _round;
      btnRound.className = "btnItem";
      btnRound.style.left = roundLeftStart * pageWidth + "px";
      btnRound.style.top = roundTop * pageHeight + "px";
      btnRound.style.width = roundWidth * pageWidth + "px";
      btnRound.style.height = roundHeight * pageHeight + "px";
      btnRound.style.fontSize = 0.8 * fontSize * pageWidth + "px";

      btnRound.onclick = function () {
        funcReroll(_round);
      };

      maindiv.append(btnRound);
    }
    {
      btnRound = document.createElement("button");
      btnRound.id = "btnReturn" + _round;
      btnRound.className = "btnItem";
      btnRound.style.left = roundLeftStart * pageWidth + "px";
      btnRound.style.top = (roundTop + roundTopTic) * pageHeight + "px";
      btnRound.style.width = roundWidth * pageWidth + "px";
      btnRound.style.height = roundHeight * pageHeight + "px";
      btnRound.style.fontSize = 0.8 * fontSize * pageWidth + "px";

      btnRound.onclick = function () {
        funcReturn(_round);
      };

      maindiv.append(btnRound);
    }
    {
      btnRound = document.createElement("button");
      btnRound.id = "btnPlus" + _round;
      btnRound.className = "btnItem";
      btnRound.style.left = roundLeftStart * pageWidth + "px";
      btnRound.style.top = (roundTop + 2 * roundTopTic) * pageHeight + "px";
      btnRound.style.width = roundWidth * pageWidth + "px";
      btnRound.style.height = roundHeight * pageHeight + "px";
      btnRound.style.fontSize = 0.8 * fontSize * pageWidth + "px";

      btnRound.onclick = function () {
        funcPlus(_round);
      };

      maindiv.append(btnRound);
    }
    roundLeftStart += roundLeftTic;
  };

  for (var _round = 0; _round < 6; _round++) {
    var btnRound;
    var btnRound;
    var btnRound;

    _loop2(_round);
  }

  var roundLeftStart = 0.039;
  var roundLeftTic = 0.06;
  var roundTopStart = 0.438;
  var roundTopTic = 0.048;
  var roundWidth = 0.052;
  var roundHeight = 0.043;
  var roundLeftIter = roundLeftStart;
  var roundTopIter = roundTopStart;

  var _loop3 = function _loop3(_idx13) {
    var _loop8 = function _loop8(_idx18) {
      btnRound = document.createElement("button");
      btnRound.id = "btnGray" + _idx13 + "_" + _idx18;
      btnRound.className = "btnRound";
      btnRound.style.left = roundLeftIter * pageWidth + "px";
      btnRound.style.top = roundTopIter * pageHeight + "px";
      btnRound.style.width = roundWidth * pageWidth + "px";
      btnRound.style.height = roundHeight * pageHeight + "px";
      btnRound.style.fontSize = fontSize * pageWidth + "px";

      btnRound.onclick = function () {
        funcGray(_idx13, _idx18);
      };

      maindiv.append(btnRound);
      roundLeftIter += roundLeftTic;
    };

    for (var _idx18 = 0; _idx18 < 6; _idx18++) {
      _loop8(_idx18);
    }

    roundLeftIter = roundLeftStart;
    roundTopIter += roundTopTic;
  };

  for (var _idx13 = 0; _idx13 < 4; _idx13++) {
    var btnRound;

    _loop3(_idx13);
  }

  var roundLeft = 0.465;
  var roundLeftTic = 0.064;
  var roundTopStart = 0.47;
  var roundTopStart2 = 0.439;
  var roundTopTic = 0.063;
  var roundTopIter = roundTopStart;

  var _loop4 = function _loop4(_idx14) {
    {
      btnRound = document.createElement("button");
      btnRound.id = "btnYellow" + _idx14;
      btnRound.className = "btnRound";
      btnRound.style.left = roundLeft * pageWidth + "px";
      btnRound.style.top = roundTopIter * pageHeight + "px";
      btnRound.style.width = roundWidth * pageWidth + "px";
      btnRound.style.height = roundHeight * pageHeight + "px";
      btnRound.style.fontSize = 0.8 * fontSize * pageWidth + "px";
      btnRound.style.textAlign = "center";

      btnRound.onclick = function () {
        funcYellow(_idx14);
      };

      maindiv.append(btnRound);

      if (_idx14 == 1 || _idx14 == 4 || _idx14 == 6) {
        roundLeft += roundLeftTic;

        if (_idx14 == 4) {
          roundTopIter = roundTopStart;
        } else {
          roundTopIter = roundTopStart2;
        }
      } else {
        roundTopIter += roundTopTic;
      }
    }
  };

  for (var _idx14 = 0; _idx14 < 10; _idx14++) {
    var btnRound;

    _loop4(_idx14);
  }

  var roundLeft = 0.08;
  var roundLeftTic = 0.0583;
  var roundTop = 0.714;
  var roundTopTic = 0.0975;
  var roundLeftIter = roundLeft;

  var _loop5 = function _loop5(_idx15) {
    {
      btnRound = document.createElement("select");
      btnRound2 = document.createElement("button");
      btnRound.id = "btnBlue" + _idx15;
      btnRound.className = "sltRound";
      btnRound.style.left = roundLeftIter * pageWidth + "px";
      btnRound.style.top = roundTop * pageHeight + "px";
      btnRound.style.width = roundWidth * pageWidth + "px";
      btnRound.style.height = roundHeight * pageHeight + "px";
      btnRound.style.fontSize = fontSize * pageWidth + "px";
      btnRound2.id = "btnRemoveBlue" + _idx15;
      btnRound2.className = "sltRound";
      btnRound2.style.left = roundLeftIter * pageWidth + "px";
      btnRound2.style.top = roundTop * pageHeight + "px";
      btnRound2.style.width = roundWidth * pageWidth + "px";
      btnRound2.style.height = roundHeight * pageHeight + "px";
      btnRound2.style.fontSize = fontSize * pageWidth + "px";
      btnRound2.style.display = "none";

      btnRound.onchange = function () {
        funcBlue(_idx15);
      };

      btnRound2.onclick = function () {
        funcClickBlue(_idx15);
      };

      maindiv.append(btnRound);
      maindiv.append(btnRound2);
      roundLeftIter += roundLeftTic;

      for (var _idx19 = 0; _idx19 <= 12; _idx19++) {
        opt = document.createElement("option");
        opt.innerHTML = _idx19;

        if (_idx19 == 0) {
          opt.selected = true;
          opt.innerHTML = "";
        }

        btnRound.appendChild(opt);
      }
    }
  };

  for (var _idx15 = 0; _idx15 < 12; _idx15++) {
    var btnRound;
    var btnRound2;
    var opt;

    _loop5(_idx15);
  }

  roundTop += roundTopTic;
  var roundLeftIter = roundLeft;

  var _loop6 = function _loop6(_idx16) {
    {
      btnRound2 = document.createElement("button");
      btnRound = document.createElement("select");
      btnRound.id = "btnGreen" + _idx16;
      btnRound.className = "sltRound";
      btnRound.style.left = roundLeftIter * pageWidth + "px";
      btnRound.style.top = roundTop * pageHeight + "px";
      btnRound.style.width = roundWidth * pageWidth + "px";
      btnRound.style.height = roundHeight * pageHeight + "px";
      btnRound.style.fontSize = fontSize * pageWidth + "px";
      btnRound2.id = "btnRemoveGreen" + _idx16;
      btnRound2.className = "sltRound";
      btnRound2.style.display = "none";
      btnRound2.style.left = roundLeftIter * pageWidth + "px";
      btnRound2.style.top = roundTop * pageHeight + "px";
      btnRound2.style.width = roundWidth * pageWidth + "px";
      btnRound2.style.height = roundHeight * pageHeight + "px";
      btnRound2.style.fontSize = fontSize * pageWidth + "px";

      btnRound.onchange = function () {
        funcGreen(_idx16);
      };

      btnRound2.onclick = function () {
        funcClickGreen(_idx16);
      };

      maindiv.append(btnRound);
      maindiv.append(btnRound2);
      roundLeftIter += roundLeftTic;

      for (var _idx20 = 0; _idx20 <= 6; _idx20++) {
        opt = document.createElement("option");
        opt.innerHTML = _idx20;

        if (_idx20 == 0) {
          opt.selected = true;
          opt.innerHTML = "";
        }

        btnRound.appendChild(opt);
      }
    }
  };

  for (var _idx16 = 0; _idx16 < 12; _idx16++) {
    var btnRound2;
    var btnRound;
    var opt;

    _loop6(_idx16);
  }

  roundTop += roundTopTic;
  var roundLeftIter = roundLeft;

  var _loop7 = function _loop7(_idx17) {
    {
      btnRound = document.createElement("select");
      btnRound2 = document.createElement("button");
      btnRound.id = "btnPink" + _idx17;
      btnRound.className = "sltRound";
      btnRound.style.left = roundLeftIter * pageWidth + "px";
      btnRound.style.top = roundTop * pageHeight + "px";
      btnRound.style.width = roundWidth * pageWidth + "px";
      btnRound.style.height = roundHeight * pageHeight + "px";
      btnRound.style.fontSize = fontSize * pageWidth + "px";
      btnRound.style.textAlign = "center";
      btnRound2.id = "btnRemovePink" + _idx17;
      btnRound2.className = "sltRound";
      btnRound2.style.display = "none";
      btnRound2.style.left = roundLeftIter * pageWidth + "px";
      btnRound2.style.top = roundTop * pageHeight + "px";
      btnRound2.style.width = roundWidth * pageWidth + "px";
      btnRound2.style.height = roundHeight * pageHeight + "px";
      btnRound2.style.fontSize = fontSize * pageWidth + "px";
      btnRound2.style.textAlign = "center";

      btnRound.onchange = function () {
        funcPink(_idx17);
      };

      btnRound2.onclick = function () {
        funcClickPink(_idx17);
      };

      for (var _idx21 = 0; _idx21 <= 6; _idx21++) {
        opt = document.createElement("option");
        opt.innerHTML = _idx21;

        if (_idx21 == 0) {
          opt.selected = true;
          opt.innerHTML = "";
        }

        btnRound.appendChild(opt);
      }

      maindiv.append(btnRound);
      maindiv.append(btnRound2);
      roundLeftIter += roundLeftTic;
    }
  };

  for (var _idx17 = 0; _idx17 < 12; _idx17++) {
    var btnRound;
    var btnRound2;
    var opt;

    _loop7(_idx17);
  }
}

function funcClickBlue(idx) {
  if (arrBlue[idx + 1] != 0) {
    alert("오른쪽칸부터 수정해 주십시오.");
  }

  if (idx > 0 && arrBlue[idx - 1] == 0) {
    alert("왼쪽칸부터 입력해 주십시오.");
  }

  var btn = document.getElementById("btnRemoveBlue" + idx);
  var btnval = document.getElementById("btnBlue" + idx);

  if (idx == 1 || idx == 9) {
    if (canBeLooseReturn() == false) {
      alert("아이템을 사용하였으므로 수정할 수 없습니다.");
      return;
    }
  }

  if (idx == 4) {
    if (canBeLoosePlus() == false) {
      alert("아이템을 사용하였으므로 수정할 수 없습니다.");
      return;
    }
  }

  if (idx == 5) {
    if (canBeLooseReturn() == false) {
      alert("아이템을 사용하였으므로 수정할 수 없습니다.");
      return;
    }
  }

  var userRes = confirm("취소하시겠습니까?");

  if (userRes == true) {
    btn.style.display = "none";
    btnval.selectedIndex = 0;

    if (idx == 1 || idx == 9) {
      looseReturn();
    }

    if (idx == 4) {
      loosePlus();
    }

    if (idx == 5) {
      looseReroll();
    }

    if (idx == 8) {
      --numOfFox;
    }
  }
}

function funcClickGreen(idx) {
  if (arrGreen[idx + 1] != 0) {
    alert("오른쪽칸부터 수정해 주십시오.");
  }

  if (idx > 0 && arrGreen[idx - 1] == 0) {
    alert("왼쪽칸부터 입력해 주십시오.");
  }

  var btn = document.getElementById("btnRemoveGreen" + idx);
  var btnval = document.getElementById("btnGreen" + idx);

  if (idx == 1) {
    if (canBeLooseReroll() == false) {
      alert("아이템을 사용하였으므로 수정할 수 없습니다.");
      return;
    }
  }

  if (idx == 4) {
    if (canBeLooseReturn() == false) {
      alert("아이템을 사용하였으므로 수정할 수 없습니다.");
      return;
    }
  }

  if (idx == 8) {
    if (canBeLoosePlus() == false) {
      alert("아이템을 사용하였으므로 수정할 수 없습니다.");
      return;
    }
  }

  var userRes = confirm("취소하시겠습니까?");

  if (userRes == true) {
    btn.style.display = "none";
    btnval.selectedIndex = 0;

    if (idx == 4) {
      looseReturn();
    }

    if (idx == 8) {
      loosePlus();
    }

    if (idx == 1) {
      looseReroll();
    }

    if (idx == 6) {
      --numOfFox;
    }
  }
}

function funcClickPink(idx) {
  if (arrPink[idx + 1] != 0) {
    alert("오른쪽칸부터 수정해 주십시오.");
  }

  if (idx > 0 && arrPink[idx - 1] == 0) {
    alert("왼쪽칸부터 입력해 주십시오.");
  }

  var btn = document.getElementById("btnRemovePink" + idx);
  var btnval = document.getElementById("btnPink" + idx);

  if (idx == 4) {
    if (canBeLoosePlus() == false) {
      alert("아이템을 사용하였으므로 수정할 수 없습니다.");
      return;
    }
  }

  if (idx == 3) {
    if (canBeLooseReturn() == false) {
      alert("아이템을 사용하였으므로 수정할 수 없습니다.");
      return;
    }
  }

  if (idx == 2 || idx == 9) {
    if (canBeLooseReroll() == false) {
      alert("아이템을 사용하였으므로 수정할 수 없습니다.");
      return;
    }
  }

  var userRes = confirm("취소하시겠습니까?");

  if (userRes == true) {
    btn.style.display = "none";
    btnval.selectedIndex = 0;

    if (idx == 3) {
      looseReturn();
    }

    if (idx == 4) {
      loosePlus();
    }

    if (idx == 2 || idx == 9) {
      looseReroll();
    }

    if (idx == 7) {
      --numOfFox;
    }
  }
}

drawTile();