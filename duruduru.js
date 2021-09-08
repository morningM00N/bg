"use strict";

var schedules;
var firstContact;
var rawFile = new XMLHttpRequest();
rawFile.open("GET", 'duruduru.txt', false);
rawFile.setRequestHeader('Content-Type', 'text/html;charset=utf-8');

rawFile.onreadystatechange = function () {
  if (rawFile.readyState === 4) {
    if (rawFile.status === 200 || rawFile.status == 0) {
      var allText = rawFile.responseText;
      console.log(allText);
      schedules = allText.split("|||")[0];
      firstContact = allText.split("|||")[1];
    }
  }
};

rawFile.send(null);
var DATE = 0;
var PUBLIC = 1;
var PARTICIPANTS = 2;
var dataSchedules = [];
var dataCoOccuranceList = {};
var dataFirstContact = {};
var dataBonus = {};
var dataScores = [];
schedules.split('|').forEach(function (elem) {
  if (elem.length == 0) {
    return;
  }

  var tmpToken = elem.split('\t');
  var tmpArr = [];
  tmpArr[DATE] = tmpToken[0];

  if (tmpToken[1] == 'Y') {
    tmpArr[PUBLIC] = true;
  } else {
    tmpArr[PUBLIC] = false;
  }

  tmpArr[PARTICIPANTS] = [];

  for (var idx = 2; idx < tmpToken.length; idx++) {
    if (tmpToken[idx].length > 0) {
      tmpArr[PARTICIPANTS].push(tmpToken[idx]);
    }
  }

  dataSchedules.push(tmpArr);
});
dataSchedules.forEach(function (elem) {
  for (var idx = 0; idx < elem[PARTICIPANTS].length - 1; idx++) {
    var user1 = elem[PARTICIPANTS][idx].trim();

    if (dataCoOccuranceList[user1] == undefined) {
      dataCoOccuranceList[user1] = new Set();
      dataFirstContact[user1] = new Set();
      dataBonus[user1] = 0;
    }

    for (var idx2 = idx + 1; idx2 < elem[PARTICIPANTS].length; idx2++) {
      var user2 = elem[PARTICIPANTS][idx2].trim();

      if (dataCoOccuranceList[user2] == undefined) {
        dataCoOccuranceList[user2] = new Set();
        dataFirstContact[user2] = new Set();
        dataBonus[user2] = 0;
      }

      dataCoOccuranceList[user1].add(user2);
      dataCoOccuranceList[user2].add(user1);
    }
  }

  if (elem[PUBLIC] == true) {
    dataBonus[elem[PARTICIPANTS][0].trim()] += 2;

    for (var _idx = 1; _idx < elem[PARTICIPANTS].length; _idx++) {
      dataBonus[elem[PARTICIPANTS][_idx].trim()] += 1;
    }
  }
});
firstContact.split('|').forEach(function (elem) {
  if (elem.length == 0) {
    return;
  }

  var tmpToken = elem.split('\t');

  if (tmpToken.length < 2) {
    return;
  }

  var user1 = tmpToken[0].trim();
  var user2 = tmpToken[1].trim();

  if (dataFirstContact[user1] == undefined || dataFirstContact[user2] == undefined) {
    return;
  }

  dataFirstContact[user1].add(user2);
  dataFirstContact[user2].add(user1);
});

for (var key in dataBonus) {
  dataScores.push({
    score: dataBonus[key] + dataCoOccuranceList[key].size + dataFirstContact[key].size,
    name: key
  });
}

dataScores.sort(function (a, b) {
  return a.score > b.score ? -1 : a.score < b.score ? 1 : a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
});
console.log("dataSchedules", dataSchedules);
console.log("dataCoOccuranceList", dataCoOccuranceList);
console.log("dataBonus", dataBonus);
console.log("dataScores", dataScores);
var tlbTopBoard = document.getElementById("tlbTopBoard");
var rankingIdx = 1;
var prevRankingIdx = 0;
var prevScore = 0;
dataScores.forEach(function (elem) {
  var tr = document.createElement('tr');
  tlbTopBoard.appendChild(tr);
  {
    var td = document.createElement('td');
    tr.appendChild(td);

    if (prevScore != elem.score) {
      td.innerHTML = rankingIdx;
    } else {
      td.innerHTML = prevRankingIdx;
    }

    prevRankingIdx = td.innerHTML;
    rankingIdx += 1;
    prevScore = elem.score;
  }
  {
    var _td = document.createElement('td');

    tr.appendChild(_td);
    _td.innerHTML = elem.name;
  }
  {
    var _td2 = document.createElement('td');

    tr.appendChild(_td2);
    var tmpVal = elem.score + " = " + dataCoOccuranceList[elem.name].size + " (함께한 사람수)";

    if (elem.score - dataCoOccuranceList[elem.name].size > 0) {
      tmpVal = tmpVal + " + " + (elem.score - dataCoOccuranceList[elem.name].size) + " (가산점)";
    }

    _td2.innerHTML = tmpVal;
  }
  {
    var _td3 = document.createElement('td');

    tr.appendChild(_td3);
    var _tmpVal = "";
    dataCoOccuranceList[elem.name].forEach(function (elem2) {
      _tmpVal += "<span";

      if (dataFirstContact[elem.name].has(elem2) == true) {
        _tmpVal += " class='colorRed'";
      }

      _tmpVal += ">";
      _tmpVal += elem2;
      _tmpVal += "</span> ";
    });
    _td3.innerHTML = _tmpVal;
  }
});
var tblSchdules = document.getElementById("tblSchdules");
dataSchedules.forEach(function (elem) {
  var tr = document.createElement('tr');
  tblSchdules.appendChild(tr);
  {
    var td = document.createElement('td');
    tr.appendChild(td);
    td.innerHTML = elem[DATE];
  }
  {
    var _td4 = document.createElement('td');

    tr.appendChild(_td4);

    if (elem[PUBLIC] == true) {
      _td4.innerHTML = "Y";
    } else {
      _td4.innerHTML = "N";
    }
  }
  {
    var _td5 = document.createElement('td');

    tr.appendChild(_td5);
    _td5.innerHTML = elem[PARTICIPANTS][0];
  }
  {
    var _td6 = document.createElement('td');

    tr.appendChild(_td6);
    var tmpVal = "";

    for (var idx = 1; idx < elem[PARTICIPANTS].length; idx++) {
      tmpVal += elem[PARTICIPANTS][idx] + " ";
    }

    _td6.innerHTML = tmpVal;
  }
});
