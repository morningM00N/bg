var userfullscreen = confirm("꽉찬 화면으로 표시하겠습니까?\n(화면이 깨질 수 있습니다.)"); //let userfullscreen = false

if (userfullscreen == true) {
    funcWidthPerHeight(0);
} else {
    funcWidthPerHeight(4096 / 2918);
}

var doResize = true;
$(window).resize(function() {
    funcUpdatePageSize(true);
    fucDrawSecretHitlerBoard();
});
funcUpdatePageSize(true); //funcPrepareGetLocation()

var fascisttrackIdx = 1;

function funcChangeFascistBrd() {
    fascisttrackIdx++;

    if (fascisttrackIdx == 4) {
        fascisttrackIdx = 1;
    }

    document.getElementById("imgFascistBoard").src = "img/secrethitler/fascisttrack" + fascisttrackIdx + ".png";
}

var arrLiberalEnacted = new Array();
var arrFascistEnacted = new Array();
var curElectionTracker = 0;

function fucDrawSecretHitlerBoard() {
    var imgLiberalBoard = funcInsertElement("imgLiberalBoard", "img", "null", 0, 0, 1, 1, pageWidth / pageHeight * 2);
    imgLiberalBoard.src = "img/secrethitler/liberaltrack.png";
    funcInsertElement("imgFascistBoard", "img", "null", 0, 0.5, 1, 1, pageWidth / pageHeight * 2).src = "img/secrethitler/fascisttrack" + fascisttrackIdx + ".png";
    var btnChangeFascistBrd = funcInsertElement("btnChangeFascistBoard", "button", "btnTrans", 0.4037, 0.5474, 0.5967, 0.6170); //btnChangeFascistBrd.innerHTML = "chage Board"

    btnChangeFascistBrd.onclick = funcChangeFascistBrd;
    var locArr = new Array(0.1540, 0.1136, 0.2924, 0.3807);
    var length = locArr[2] - locArr[0];

    var _loop = function _loop(idx) {
        //let btnLiberal = 
        funcInsertElement("btnLiberal" + idx, "button", "btnTrans", locArr[0] + idx * length, locArr[1], locArr[2] + idx * length, locArr[3]).onclick = function() {
            if (arrLiberalEnacted[idx] == true) {
                arrLiberalEnacted[idx] = false;
                event.srcElement.style.backgroundImage = "url('')";
            } else {
                arrLiberalEnacted[idx] = true;
                event.srcElement.style.backgroundImage = "url('img/secrethitler/liberalpolicys.png')";

                var _btnElectTrack = document.getElementById("btnElect" + curElectionTracker);

                _btnElectTrack.style.backgroundColor = "transparent";
                _btnElectTrack.style.boxShadow = " 0px 0px transparent";
                curElectionTracker = 0;
                _btnElectTrack = document.getElementById("btnElect" + curElectionTracker);
                _btnElectTrack.style.backgroundColor = "#2980B9";
                _btnElectTrack.style.boxShadow = shadowOffset + "px " + shadowOffset + "px gray";
            }
        };
    };

    for (var idx = 0; idx < 5; idx++) {
        _loop(idx);
    }

    locArr = new Array(0.0886, 0.6228, 0.22652, 0.8878);
    length = locArr[2] - locArr[0];

    var _loop2 = function _loop2(_idx) {
        //let btnLiberal = 
        funcInsertElement("btnFascist" + _idx, "button", "btnTrans", locArr[0] + _idx * length, locArr[1], locArr[2] + _idx * length, locArr[3]).onclick = function() {
            if (arrFascistEnacted[_idx] == true) {
                arrFascistEnacted[_idx] = false;
                event.srcElement.style.backgroundImage = "url('')";
            } else {
                arrFascistEnacted[_idx] = true;
                event.srcElement.style.backgroundImage = "url('img/secrethitler/fascistpolicys.png')";

                var _btnElectTrack2 = document.getElementById("btnElect" + curElectionTracker);

                _btnElectTrack2.style.backgroundColor = "transparent";
                _btnElectTrack2.style.boxShadow = " 0px 0px transparent";
                curElectionTracker = 0;
                _btnElectTrack2 = document.getElementById("btnElect" + curElectionTracker);
                _btnElectTrack2.style.backgroundColor = "#2980B9";
                _btnElectTrack2.style.boxShadow = shadowOffset + "px " + shadowOffset + "px gray";
            }
        };
    };

    for (var _idx = 0; _idx < 6; _idx++) {
        _loop2(_idx);
    }

    locArr = new Array(0.3321, 0.3907, 0.3707, 0.4429);
    length = 0.094;
    var shadowOffset = 0.004 * pageWidth;

    var _loop3 = function _loop3(_idx2) {
        //let btnLiberal = 
        funcInsertElement("btnElect" + _idx2, "button", "btnCircle", locArr[0] + _idx2 * length, locArr[1], locArr[2] + _idx2 * length, locArr[3]).onclick = function() {
            if (_idx2 + 1 == curElectionTracker || _idx2 - 1 == curElectionTracker) {
                var _btnElectTrack3 = document.getElementById("btnElect" + curElectionTracker);

                _btnElectTrack3.style.backgroundColor = "transparent";
                _btnElectTrack3.style.boxShadow = " 0px 0px transparent";
                curElectionTracker = _idx2;
                _btnElectTrack3 = document.getElementById("btnElect" + curElectionTracker);
                _btnElectTrack3.style.backgroundColor = "#2980B9";
                _btnElectTrack3.style.boxShadow = shadowOffset + "px " + shadowOffset + "px gray";
            }
        };
    };

    for (var _idx2 = 0; _idx2 < 4; _idx2++) {
        _loop3(_idx2);
    }

    var btnElectTrack = document.getElementById("btnElect" + curElectionTracker);
    btnElectTrack.style.backgroundColor = "#2980B9";
    btnElectTrack.style.boxShadow = shadowOffset + "px " + shadowOffset + "px gray";
    funcInsertFullScreenButton(0.02, 0.47, 0.08, 0.525);
}

fucDrawSecretHitlerBoard();
