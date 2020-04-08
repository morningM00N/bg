var WHITE_TEAM = 0;
var BLACK_TEAM = 1;
var curTeam = 0;
var teamName = new Array();
var hints = new Array();
var guesses = new Array();
var answers = new Array();
hints[0] = new Array();
hints[1] = new Array();
guesses[0] = new Array();
guesses[1] = new Array();
answers[0] = new Array();
answers[1] = new Array();
var summary = new Array();
summary[0] = new Array();
summary[1] = new Array();

for (var team = 0; team <= 1; team++) {
  teamName[team] = "팀이름";

  for (var idx = 0; idx < 4; idx++) {
    //summary[team][idx] = "aaa"
    summary[team][idx] = "";
  }

  for (var round = 0; round < 8; round++) {
    for (var numOfHints = 0; numOfHints < 3; numOfHints++) {
      hints[team][3 * round + numOfHints] = "";
    }
  }

  for (var _round = 0; _round < 8; _round++) {
    for (var _numOfHints = 0; _numOfHints < 3; _numOfHints++) {
      hints[team][3 * _round + _numOfHints] = "";
      guesses[team][3 * _round + _numOfHints] = Math.random() * 4 + 1;
      answers[team][3 * _round + _numOfHints] = Math.random() * 4 + 1;
      guesses[team][3 * _round + _numOfHints] = 0;
      answers[team][3 * _round + _numOfHints] = 0;
    }
  }
}

function funcChangeTeam() {
  teamName[curTeam] = document.getElementById("pName").innerHTML;

  for (var _idx = 0; _idx < 4; _idx++) {
    summary[curTeam][_idx] = document.getElementById("pHints_" + _idx).innerHTML;
  }

  for (var _round2 = 0; _round2 < 8; _round2++) {
    for (var _numOfHints2 = 0; _numOfHints2 < 3; _numOfHints2++) {
      var textInput = document.getElementById("txtHints_" + _round2 + "_" + _numOfHints2);
      hints[curTeam][3 * _round2 + _numOfHints2] = textInput.value;
      var sltGuess = document.getElementById("sltGuess_" + _round2 + "_" + _numOfHints2);
      guesses[curTeam][3 * _round2 + _numOfHints2] = sltGuess.selectedIndex;
      var sltAnswer = document.getElementById("sltAnswer_" + _round2 + "_" + _numOfHints2);
      answers[curTeam][3 * _round2 + _numOfHints2] = sltAnswer.selectedIndex;
    }
  }

  if (curTeam == 0) {
    document.getElementById("main").style.backgroundImage = 'url("img/decrypto_black.png")';
    curTeam = 1;
  } else {
    document.getElementById("main").style.backgroundImage = 'url("img/decrypto_white.png")';
    curTeam = 0;
  }

  document.getElementById("pName").innerHTML = teamName[curTeam];

  for (var _idx2 = 0; _idx2 < 4; _idx2++) {
    document.getElementById("pHints_" + _idx2).innerHTML = summary[curTeam][_idx2];
  }

  for (var _round3 = 0; _round3 < 8; _round3++) {
    for (var _numOfHints3 = 0; _numOfHints3 < 3; _numOfHints3++) {
      var textInput = document.getElementById("txtHints_" + _round3 + "_" + _numOfHints3);
      textInput.value = hints[curTeam][3 * _round3 + _numOfHints3];
      var sltGuess = document.getElementById("sltGuess_" + _round3 + "_" + _numOfHints3);
      sltGuess.selectedIndex = guesses[curTeam][3 * _round3 + _numOfHints3];
      var sltAnswer = document.getElementById("sltAnswer_" + _round3 + "_" + _numOfHints3);
      sltAnswer.selectedIndex = answers[curTeam][3 * _round3 + _numOfHints3];
    }
  }
}

function drawTile() {
  var pageWidth = document.documentElement.clientWidth;
  var pageHeight = document.documentElement.clientHeight;

  if (pageHeight > pageWidth) {
    var resize = confirm("원본 비율로 표시하겠습니까?\n(취소하는 경우 비율이 변경되어 글씨 크기가 매우 작을 수 있습니다.)");

    if (resize == true) {
      pageHeight = pageWidth / 529 * 756;
    }
  } else {
    pageHeight = pageWidth / 529 * 756;
  }

  var btnChange = document.getElementById("btnChange");
  btnChange.style.width = 0.4 * pageWidth + "px";
  btnChange.style.height = 0.05 * pageHeight + "px";
  btnChange.style.left = 0.04 * pageWidth + "px";
  btnChange.style.top = 0.01 * pageHeight + "px";
  var maindiv = document.getElementById("main");
  var mainbody = document.getElementById("body");
  maindiv.style.height = pageHeight + "px";
  maindiv.style.width = pageWidth + "px";
  maindiv.style.backgroundSize = "" + pageWidth + "px " + pageHeight + "px";
  var leftTxt = 0.05;
  var leftTxtTic = 0.485;
  var topTxtStart = 0.078;
  var topTxtNextGroupTic = 0.025;
  var topTxtNextHintsTic = 0.042;
  var topSltStart = 0.078;
  var topSltNextGroupTic = 0.024;
  var topSltNextHintsTic = 0.043;
  var txtFontSize = 0.05;
  var sltFontSize = 0.04;
  var txtWidth = 0.30;
  var sltWidth = 0.04;
  var txtHeight = 0.040;
  var txtPadding = 0.00;
  var sltLeftGuess = 0.40;
  var sltLeftAnswer = 0.445;
  var pName = document.getElementById("pName");
  pName.style.left = 0.55 * pageWidth + "px";
  pName.style.top = -0.025 * pageHeight + "px";
  pName.style.width = 0.3 * pageWidth + "px";
  pName.style.height = 0.035 * pageHeight + "px";
  pName.style.fontSize = txtFontSize * pageWidth + "px";
  var topTxtIter = topTxtStart;
  var topSltIter = topSltStart;

  var _loop = function _loop(_round4) {
    var _loop2 = function _loop2(_numOfHints4) {
      textInput = document.createElement("input");
      textInput.id = "txtHints_" + _round4 + "_" + _numOfHints4;
      textInput.value = "";
      maindiv.appendChild(textInput);
      textInput.className = "txtHints";
      textInput.style.left = leftTxt * pageWidth + "px";
      textInput.style.top = topTxtIter * pageHeight + "px";
      textInput.style.width = txtWidth * pageWidth + "px";
      textInput.style.height = txtHeight * pageHeight + "px";
      textInput.style.fontSize = txtFontSize * pageWidth + "px";
      textInput.style.padding = txtPadding * pageHeight + "px";
      {
        sltGuess = document.createElement("select");
        sltGuess.id = "sltGuess_" + _round4 + "_" + _numOfHints4;
        maindiv.appendChild(sltGuess);
        sltGuess.className = "sltGuess";
        sltGuess.innerHTML = "";
        sltGuess.style.left = sltLeftGuess * pageWidth + "px";
        sltGuess.style.top = topSltIter * pageHeight + "px";
        sltGuess.style.width = sltWidth * pageWidth + "px";
        sltGuess.style.height = txtHeight * pageHeight + "px";
        sltGuess.style.fontSize = sltWidth * pageWidth + "px";
        sltGuess.style.padding = "0px";

        for (var idx2 = 0; idx2 <= 4; idx2++) {
          opt = document.createElement("option");
          opt.style.fontsize = sltWidth * pageWidth + "px";
          opt.innerHTML = idx2;

          if (idx2 == 0) {
            opt.selected = true;
            opt.disabled = true;
            opt.hidden = true;
            opt.innerHTML = "";
          }

          sltGuess.appendChild(opt);
        }
      }
      {
        sltGuess = document.createElement("select");
        sltGuess.id = "sltAnswer_" + _round4 + "_" + _numOfHints4;
        maindiv.appendChild(sltGuess);
        sltGuess.className = "sltGuess";
        sltGuess.style.left = sltLeftAnswer * pageWidth + "px";
        sltGuess.style.top = topSltIter * pageHeight + "px";
        sltGuess.style.width = sltWidth * pageWidth + "px";
        sltGuess.style.height = txtHeight * pageHeight + "px";
        sltGuess.style.fontSize = sltWidth * pageWidth + "px";
        sltGuess.style.padding = "0px";

        sltGuess.onchange = function () {
          funcInputAnswer(_round4, _numOfHints4);
        };

        sltGuess.onclick = function () {
          funcClickCheck(_round4, _numOfHints4);
        };

        for (var _idx3 = 0; _idx3 <= 4; _idx3++) {
          opt = document.createElement("option");
          opt.style.fontsize = sltWidth * pageWidth + "px";
          opt.innerHTML = _idx3;

          if (_idx3 == 0) {
            opt.selected = true;
            opt.disabled = true;
            opt.hidden = true;
            opt.innerHTML = "";
          }

          sltGuess.appendChild(opt);
        }
      }
      topTxtIter += topTxtNextHintsTic;
      topSltIter += topSltNextHintsTic;
    };

    for (var _numOfHints4 = 0; _numOfHints4 < 3; _numOfHints4++) {
      _loop2(_numOfHints4);
    }

    topTxtIter += topTxtNextGroupTic;
    topSltIter += topSltNextGroupTic;

    if (_round4 == 3) {
      leftTxt += leftTxtTic;
      sltLeftAnswer += leftTxtTic;
      sltLeftGuess += leftTxtTic;
      topTxtIter = topTxtStart;
      topSltIter = topSltStart;
    }
  };

  for (var _round4 = 0; _round4 < 8; _round4++) {
    var textInput;
    var sltGuess;
    var opt;
    var sltGuess;
    var opt;

    _loop(_round4);
  }

  var leftTxt = 0.03;
  var leftTxtTic = 0.24;
  var topTxt = 0.65;
  var txtFontSize = 0.05;
  var txtWidth = 0.20;
  var txtHeight = 0.28;

  for (var answer = 0; answer < 4; answer++) {
    var pAnswer = document.createElement("p");
    pAnswer.id = "pHints_" + answer;
    maindiv.appendChild(pAnswer);
    pAnswer.className = "txtHints";
    pAnswer.style.left = leftTxt * pageWidth + "px";
    pAnswer.style.top = topTxt * pageHeight + "px";
    pAnswer.style.width = txtWidth * pageWidth + "px";
    pAnswer.style.height = txtHeight * pageHeight + "px";
    pAnswer.style.fontSize = txtFontSize * pageWidth + "px";
    leftTxt += leftTxtTic;
  }
}

function funcClickCheck(thisRound, thisNumOfHints) {
  for (var _round5 = 0; _round5 < thisRound; _round5++) {
    for (var _numOfHints5 = 0; _numOfHints5 < 3; _numOfHints5++) {
      var sltAnswer = document.getElementById("sltAnswer_" + _round5 + "_" + _numOfHints5); //console.log(sltAnswer.selectedIndex)

      if (sltAnswer.selectedIndex == 0) {
        alert("앞의 라운드부터 진행해 주세요.");
        return;
      }
    }
  }
}

function funcInputAnswer(thisRound, thisNumOfHints) {
  var hints = new Array();
  hints[0] = "";
  hints[1] = "";
  hints[2] = "";
  hints[3] = "";

  for (var _round6 = 0; _round6 <= thisRound; _round6++) {
    for (var _numOfHints6 = 0; _numOfHints6 < 3; _numOfHints6++) {
      var sltAnswer = document.getElementById("sltAnswer_" + _round6 + "_" + _numOfHints6);
      var txtHints = document.getElementById("txtHints_" + _round6 + "_" + _numOfHints6);

      if (txtHints.value == "") {
        continue;
      }

      if (hints[sltAnswer.selectedIndex - 1] == "") {
        hints[sltAnswer.selectedIndex - 1] = txtHints.value;
      } else {
        hints[sltAnswer.selectedIndex - 1] = hints[sltAnswer.selectedIndex - 1] + "<br>" + txtHints.value;
      }
    }
  }

  for (var _idx4 = 0; _idx4 < 4; _idx4++) {
    var pAnswer = document.getElementById("pHints_" + _idx4);
    pAnswer.innerHTML = hints[_idx4];
  } //console.log("" + 0 + ":" + hints[0])
  //console.log("" + 1 + ":" + hints[1])
  //console.log("" + 2 + ":" + hints[2])
  //console.log("" + 3 + ":" + hints[3])

}

function setName() {
  var pName = document.getElementById("pName");
  var name = prompt("이름을 입력해 주세요.");

  if (name != null) {
    pName.innerHTML = name;
  }
}