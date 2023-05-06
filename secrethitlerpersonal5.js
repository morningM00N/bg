"use strict";

//funcPrepareGetLocation()
funcWidthPerHeight(0);
funcUpdatePageSize(true);
$(window).resize(function () {
  funcUpdatePageSize(true);
  funcDrawSHPersonal();
});
var playerNameList = new Array();
var rawFile = new XMLHttpRequest();
rawFile.open("GET", "playername.txt", false);
rawFile.setRequestHeader('Content-Type', 'text/html;charset=utf-8');

rawFile.onreadystatechange = function () {
  if (rawFile.readyState === 4) {
    if (rawFile.status === 200 || rawFile.status == 0) {
      var allText = rawFile.responseText;
      playerNameList = allText.split(/\n|\t| /);
    }
  }
};

rawFile.send(null);
playerNameList[playerNameList.length - 1] = playerNameList[0];
playerNameList[0] = "이름";

for (var idx = playerNameList.length - 1; idx >= 0; idx--) {
  if (playerNameList[idx] == "") {
    playerNameList.splice(idx, 1);
  }
}

var roomNumber = "방번호";
var numOfPlayers = "수";
var idxOfPlayer = 0; //numOfPlayers = 7

var numOfEnactedLiberalPolicies = 0;
var numOfEnactedFascistPolicies = 0;
var policyStage = false;

function funcDrawSHPersonal() {
  if (pageWidth > pageHeight) {
    for (var _idx = 0; _idx < nameOfRelocatedElements.length; _idx++) {
      document.getElementById(nameOfRelocatedElements[_idx]).style.display = "none";
    }

    var _pWarning = funcInsertElement("pWarning", "p", "sltTrans", 0.1, 0.1, 0.9, 0.2);

    _pWarning.innerHTML = "세로 모드로 실행해 주세요";
    _pWarning.style.display = "inline";
    return;
  }

  for (var _idx2 = 0; _idx2 < nameOfRelocatedElements.length; _idx2++) {
    document.getElementById(nameOfRelocatedElements[_idx2]).style.display = "inline";
  }

  var btnRoleBig = document.getElementById("btnRoleBig");

  if (btnRoleBig != null) {
    btnRoleBig.style.display = "none";
  }

  var pWarning = document.getElementById("pWarning");

  if (pWarning != null) {
    pWarning.style.display = "none";
  }

  var imgBG = funcInsertElement("imgBG", "img", null, 0, 0, 1, 1);
  imgBG.src = "img/secrethitler/rolebg.png";
  imgBG.style.opacity = 0.5;
  var inputRoom = funcInsertElement("inputRoom", "input", "sltTrans", 0.093, 0.0560, 0.65, 0.16);

  inputRoom.onclick = function () {
    inputRoom.value = prompt("방번호를 입력하세요.");
    roomNumber = inputRoom.value;
  };

  inputRoom.value = roomNumber;
  var btnNumOfP = funcInsertElement("btnNumOfP", "p", "sltTrans", 0.67, 0.0560, 0.91, 0.16);
  btnNumOfP.innerHTML = numOfPlayers;

  btnNumOfP.onclick = function () {
    if (numOfPlayers == "수") {
      numOfPlayers = 5;
    } else {
      numOfPlayers++;

      if (numOfPlayers == 11) {
        numOfPlayers = 5;
      }
    }

    event.srcElement.innerHTML = numOfPlayers;
  };

  var btnPlayerName = funcInsertElement("btnPlayerName", "button", "sltTrans", 0.093, 0.18, 0.65, 0.18 + 0.16 - 0.0560);
  var shadowDepth = 0.015 * pageWidth;
  var btnPolicyStart = funcInsertElement("btnPolicyStart", "button", "btnTrans", 0.093, 0.0560 + (0.18 - 0.0560) * 2, 0.45, 0.0560 + (0.18 - 0.0560) * 2 + 0.16 - 0.0560);
  btnPolicyStart.style.boxShadow = shadowDepth + "px " + shadowDepth + "px gray";
  btnPolicyStart.style.borderRadius = "7%";
  btnPolicyStart.style.backgroundColor = "black";
  btnPolicyStart.style.color = "white";
  btnPolicyStart.style.height = Number(btnPolicyStart.style.height.replace("px", "")) * 1.5 + "px";
  btnPolicyStart.innerHTML = "정책";
  btnPolicyStart.onclick = funcDrawPolicy;
  var voteHeight = btnPolicyStart.style.height.replace("px", "");
  var voteWidth = voteHeight / 9 * 6;
  var bottomLine = pageHeight * (0.0560 + (0.18 - 0.0560) * 2 + 0.16 - 0.0560);
  var btnVoteYes = funcInsertElement("btnVoteYes", "button", "btnTrans", 0.5, 0.0560 + (0.18 - 0.0560) * 2, 0.5 + voteWidth / pageWidth, 0.0560 + (0.18 - 0.0560) * 2 + voteHeight / pageHeight);
  btnVoteYes.style.backgroundImage = "url('img/secrethitler/voteyes.png')";
  btnVoteYes.style.boxShadow = shadowDepth + "px " + shadowDepth + "px gray";

  btnVoteYes.onclick = function () {
    funcVote(true);
  };

  var btnVoteNo = funcInsertElement("btnVoteNo", "button", "btnTrans", 0.5 + voteWidth / pageWidth + 0.05, 0.0560 + (0.18 - 0.0560) * 2, 0.5 + voteWidth / pageWidth * 2 + 0.05, 0.0560 + (0.18 - 0.0560) * 2 + voteHeight / pageHeight);
  btnVoteNo.style.backgroundImage = "url('img/secrethitler/voteno.png')";
  btnVoteNo.style.boxShadow = shadowDepth + "px " + shadowDepth + "px gray";

  btnVoteNo.onclick = function () {
    funcVote(false);
  };

  btnPlayerName.innerHTML = playerNameList[idxOfPlayer];

  btnPlayerName.onclick = function () {
    idxOfPlayer++;

    if (idxOfPlayer == numOfPlayers + 1) {
      idxOfPlayer = 1;
    }

    event.srcElement.innerHTML = playerNameList[idxOfPlayer];
  };

  var btnStart = funcInsertElement("btnStart", "button", "sltTrans", 0.67, 0.18, 0.91, 0.18 + 0.16 - 0.0560);
  btnStart.onclick = funcStartGame;
  btnStart.innerHTML = "역할";
  btnStart.style.whiteSpace = "nowrap";
  var palleteWidth = pageWidth * (0.91 - 0.093);
  var policyWidth = palleteWidth * 0.3;
  var policyHeight = policyWidth / 6 * 9;

  var _loop = function _loop(_idx3) {
    var btnPolicy = funcInsertElement("btnPolicy" + _idx3, "button", "btnTrans", 0.093 + _idx3 * policyWidth / pageWidth + _idx3 * 0.05 * palleteWidth / pageWidth, 0.944 - policyHeight / pageHeight, 0.093 + (_idx3 + 1) * policyWidth / pageWidth + _idx3 * 0.05 * palleteWidth / pageWidth, 0.944);
    btnPolicy.style.backgroundImage = "url('img/secrethitler/policybg.png')";
    btnPolicy.style.boxShadow = shadowDepth + "px " + shadowDepth + "px gray";

    btnPolicy.onclick = function () {
      funcSelectPolicy(_idx3);
    };

    if (policyStage == false) {
      btnPolicy.style.display = "none";
    }
  };

  for (var _idx3 = 0; _idx3 < 3; _idx3++) {
    _loop(_idx3);
  } //console.log(palleteWidth)


  var topValue = Number(btnVoteYes.style.top.replace("px", "")) + Number(btnVoteYes.style.height.replace("px", "")) + 0.023 * pageHeight;
  var bottomValue = Number(document.getElementById("btnPolicy0").style.top.replace("px", "")) - 0.023 * pageHeight;
  var btnHidden = funcInsertElement("btnHidden", "button", "btnTrans", 0.15, topValue / pageHeight, 0.48, bottomValue / pageHeight);
  btnHidden.style.boxShadow = shadowDepth + "px " + shadowDepth + "px gray";
  btnHidden.style.backgroundColor = "black";
  btnHidden.style.color = "white";
  btnHidden.innerHTML = "숨김";
  btnHidden.style.fontSize = Number(btnHidden.style.fontSize.replace("px", "")) / 2 + "px";
  btnHidden.onclick = funcHidden;

  if (policyStage == false) {
    btnHidden.style.display = "none";
  }

  var btnWithdraw = funcInsertElement("btnWithdraw", "button", "btnTrans", 0.52, topValue / pageHeight, 0.85, bottomValue / pageHeight);
  btnWithdraw.style.boxShadow = shadowDepth + "px " + shadowDepth + "px gray";
  btnWithdraw.style.backgroundColor = "black";
  btnWithdraw.style.color = "white";
  btnWithdraw.innerHTML = "무정부";
  btnWithdraw.style.fontSize = btnHidden.style.fontSize;
  btnWithdraw.onclick = funcWithdraw;

  if (numOfEnactedFascistPolicies != 5 || policyStage != false) {
    btnWithdraw.style.display = "none";
  } //console.log("here", topValue, bottomValue)

}

var isHidden = false;

function funcHidden() {
  if (isHidden == true) {
    event.srcElement.innerHTML = "숨김";

    for (var _idx4 = 0; _idx4 < 3; _idx4++) {
      var btnPolicy = document.getElementById("btnPolicy" + _idx4);

      if (curPickedPolicyCards[_idx4] < 6) {
        btnPolicy.style.backgroundImage = "url('img/secrethitler/liberalpolicy.png')";
      } else {
        btnPolicy.style.backgroundImage = "url('img/secrethitler/fascistpolicy.png')";
      }
    }

    isHidden = false;
  } else {
    event.srcElement.innerHTML = "공개";
    isHidden = true;

    for (var _idx5 = 0; _idx5 < 3; _idx5++) {
      var _btnPolicy = document.getElementById("btnPolicy" + _idx5);

      _btnPolicy.style.backgroundImage = "url('img/secrethitler/policybg.png')";
    }
  }
}

function funcWithdraw() {
  if (lastCard == false) {
    alert("마지막 카드에 사용해 주세요.");
    return;
  }

  lastCard = false;
  policyStage = false;

  for (var _idx6 = 0; _idx6 < 3; _idx6++) {
    document.getElementById("btnPolicy" + _idx6).style.display = "none";
  }
}

var playerRole;
var policyDeck = new Array(17);

for (var _idx7 = 0; _idx7 < policyDeck.length; _idx7++) {
  policyDeck[_idx7] = 0;
}

var numOfDrawDeck = 17;
var genRole = false;

function funcStartGame() {
  if (idxOfPlayer == 0 || numOfPlayers == "수") {
    return;
  }

  var numOfFascist = 1;

  switch (numOfPlayers) {
    case 5:
    case 6:
      numOfFascist = 2;
      break;

    case 7:
    case 8:
      numOfFascist = 3;
      break;

    case 9:
    case 10:
      numOfFascist = 4;
      break;
  }

  if (genRole == false) {
    playerRole = new Array(numOfPlayers);
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

    for (var _idx8 = 0; _idx8 < numOfPlayers; _idx8++) {
      var loc = MMath.getRandom(numOfPlayers - 1);

      while (playerRole[loc] >= 0) {
        loc = MMath.getRandom(numOfPlayers - 1);
      }

      playerRole[loc] = _idx8;
    } //console.log(playerRole)


    genRole = true;
  }

  var btnVote = funcInsertElement("btnRoleBig", "button", "btnTrans", 0.1, 0.05, 0.9, 1.0, 6 / 9);
  btnVote.style.display = "inline";

  btnVote.onclick = function () {
    event.srcElement.style.display = "none";
  };

  btnVote.style.borderRadius = "5%";

  if (playerRole[idxOfPlayer - 1] == 0) {
    btnVote.style.backgroundImage = "url('img/secrethitler/rolehitler.png')";
    btnVote.innerHTML = "";
  } else if (playerRole[idxOfPlayer - 1] < numOfFascist) {
    btnVote.style.backgroundImage = "url('img/secrethitler/rolefascist" + playerRole[idxOfPlayer - 1] + ".png')";
    btnVote.style.fontSize = btnVote.style.fontSize.replace("px", "") / 8 + "px";
    btnVote.style.whiteSpace = "nowrap";
    btnVote.style.color = "white";
    btnVote.style.fontWeight = "bold";
    btnVote.style.lineHeight = btnVote.style.fontSize;
    var viewString = "";

    for (var _idx9 = 0; _idx9 < playerRole.length; _idx9++) {
      if (playerRole[_idx9] == 0) {
        viewString += "히틀러:" + playerNameList[_idx9 + 1] + "<br>";
      }
    }

    viewString += "파시스트:<br>";

    for (var _idx10 = 0; _idx10 < playerRole.length; _idx10++) {
      if (playerRole[_idx10] < numOfFascist && playerRole[_idx10] > 0) {
        viewString += playerNameList[_idx10 + 1] + "<br>";
      }
    }

    btnVote.innerHTML = viewString;
  } else {
    btnVote.style.backgroundImage = "url('img/secrethitler/roleliberal" + (playerRole[idxOfPlayer - 1] - numOfFascist + 1) + ".png')";
    btnVote.innerHTML = "";
  }
}

var ENACTED = 2;
var DISCARDED = 1;
var UNUSED = 0;
var curPickedPolicyCards = new Array();
var lastCard = false;

function funcDrawPolicy() {
  if (policyStage == true) {
    alert("현재 정책 단계를 끝내주세요!");
    return;
  }

  if (numOfEnactedFascistPolicies == 5) {
    document.getElementById("btnWithdraw").style.display = "inline";
  }

  lastCard = false;
  policyStage = true;
  document.getElementById("btnHidden").innerHTML = "공개";
  isHidden = true;
  document.getElementById("btnHidden").style.display = "inline";

  if (numOfDrawDeck < 3) {
    alert("드로우 덱을 새로 만듭니다."); //console.log("reshuffle...")

    numOfDrawDeck = 0;

    for (var _idx11 = 0; _idx11 < policyDeck.length; _idx11++) {
      if (policyDeck[_idx11] != ENACTED) {
        policyDeck[_idx11] = UNUSED;
        numOfDrawDeck++;
      }
    }
  }

  numOfDrawDeck -= 3; //console.log("remain " + numOfDrawDeck + " cards")

  for (var _idx12 = 0; _idx12 < 3; _idx12++) {
    var btnPolicy = document.getElementById("btnPolicy" + _idx12);
    btnPolicy.style.display = "inline";
    btnPolicy.style.backgroundImage = "url('img/secrethitler/policybg.png')";
    var thisCard = MMath.getRandom(0, policyDeck.length - 1);

    while (policyDeck[thisCard] != UNUSED) {
      thisCard = MMath.getRandom(0, policyDeck.length - 1);
    }

    curPickedPolicyCards[_idx12] = thisCard;
    policyDeck[thisCard] = DISCARDED;
  }
}

funcDrawSHPersonal(); //funcStartGame()
//funcDrawPolicy()

function funcSelectPolicy(idx) {
  if (policyStage == false) {
    funcDrawPolicy();
    return;
  }

  if (event.srcElement.innerHTML == "X") {
    var answer = confirm("이 카드를 버리겠습니까?");

    if (answer != true) {
      return;
    }

    event.srcElement.innerHTML = "";
    event.srcElement.style.display = "none";

    if (lastCard == true) {
      policyStage = false;

      for (var _idx13 = 0; _idx13 < 3; _idx13++) {
        if (document.getElementById("btnPolicy" + _idx13).style.display != "none") {
          if (curPickedPolicyCards[_idx13] < 6) {
            numOfEnactedLiberalPolicies++;
          } else {
            numOfEnactedFascistPolicies++;
          }

          policyDeck[curPickedPolicyCards[_idx13]] = ENACTED;
          break;
        }
      }

      document.getElementById("btnHidden").style.display = "none";
      document.getElementById("btnWithdraw").style.display = "none";
    } else {
      lastCard = true;
    }
  } else if (event.srcElement.innerHTML == "") {
    for (var _idx14 = 0; _idx14 < 3; _idx14++) {
      document.getElementById("btnPolicy" + _idx14).innerHTML = "";
    }

    event.srcElement.innerHTML = "X";
  }
}

function funcVote(voteYes) {
  var btnVote = funcInsertElement("btnVoteBig", "button", "sltTrans", 0.1, 0.05, 0.9, 1.0, 6 / 9);
  btnVote.style.display = "inline";

  btnVote.onclick = function () {
    event.srcElement.style.display = "none";
  };

  btnVote.style.borderRadius = "10%";

  if (voteYes == true) {
    btnVote.style.backgroundImage = "url('img/secrethitler/voteyes.png')";
  } else {
    btnVote.style.backgroundImage = "url('img/secrethitler/voteno.png')";
  }
}
