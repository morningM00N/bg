"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pageHeight;
var pageWidth;
var widthPerHeight;
var widthPerHeightForLandOnly;
var mainDiv = document.getElementById("main");
var mainBody = document.getElementById("body");

function funcWidthPerHeight(_wperh, _wperhonly) {
  widthPerHeight = _wperh;
  widthPerHeightForLandOnly = _wperhonly;
}

var mapLocationInfor = new Array();
var nameOfRelocatedElements = new Array();
var seed = Math.floor(Math.random() * 100000);

function getRandom(bound, min, isSeed) {
  // exclusive bound
  var mod = 0;

  if (min != null) {
    mod += min;
  }

  if (isSeed = true) {
    var _x = Math.sin(seed++) * 100000;

    return Math.floor((_x - Math.floor(_x)) * bound) + mod;
  }

  return bound * Math.random() + mod;
}

var MathModBase = /*#__PURE__*/function () {
  function MathModBase() {
    _classCallCheck(this, MathModBase);
  }

  _createClass(MathModBase, [{
    key: "random",
    value: function random() {}
  }, {
    key: "pow",
    value: function pow(d, e) {
      return Math.pow(d, e);
    }
  }, {
    key: "getRandom",
    value: function getRandom(min, max) {
      // inclusive both range
      if (max == null) {
        return Math.floor(MMath.random() * (min + 1));
      }

      var length = max - min + 1;
      return min + Math.floor(MMath.random() * length);
    }
  }]);

  return MathModBase;
}();

var MMath = new MathModBase();
!function (a, b, c, d, e, f, g, h, i) {
  function j(a) {
    var b,
        c = a.length,
        e = this,
        f = 0,
        g = e.i = e.j = 0,
        h = e.S = [];

    for (c || (a = [c++]); d > f;) {
      h[f] = f++;
    }

    for (f = 0; d > f; f++) {
      h[f] = h[g = s & g + a[f % c] + (b = h[f])], h[g] = b;
    }

    (e.g = function (a) {
      for (var b, c = 0, f = e.i, g = e.j, h = e.S; a--;) {
        b = h[f = s & f + 1], c = c * d + h[s & (h[f] = h[g = s & g + b]) + (h[g] = b)];
      }

      return e.i = f, e.j = g, c;
    })(d);
  }

  function k(a, b) {
    var c,
        d = [],
        e = _typeof(a);

    if (b && "object" == e) for (c in a) {
      try {
        d.push(k(a[c], b - 1));
      } catch (f) {}
    }
    return d.length ? d : "string" == e ? a : a + "\0";
  }

  function l(a, b) {
    for (var c, d = a + "", e = 0; e < d.length;) {
      b[s & e] = s & (c ^= 19 * b[s & e]) + d.charCodeAt(e++);
    }

    return n(b);
  }

  function m(c) {
    try {
      return o ? n(o.randomBytes(d)) : (a.crypto.getRandomValues(c = new Uint8Array(d)), n(c));
    } catch (e) {
      return [+new Date(), a, (c = a.navigator) && c.plugins, a.screen, n(b)];
    }
  }

  function n(a) {
    return String.fromCharCode.apply(0, a);
  }

  var o,
      p = c.pow(d, e),
      q = c.pow(2, f),
      r = 2 * q,
      s = d - 1,
      t = c["seed" + i] = function (a, f, g) {
    var h = [];
    f = 1 == f ? {
      entropy: !0
    } : f || {};
    var o = l(k(f.entropy ? [a, n(b)] : null == a ? m() : a, 3), h),
        s = new j(h);
    return l(n(s.S), b), (f.pass || g || function (a, b, d) {
      return d ? (c[i] = a, b) : a;
    })(function () {
      for (var a = s.g(e), b = p, c = 0; q > a;) {
        a = (a + c) * d, b *= d, c = s.g(1);
      }

      for (; a >= r;) {
        a /= 2, b /= 2, c >>>= 1;
      }

      return (a + c) / b;
    }, o, "global" in f ? f.global : this == c);
  };

  if (l(c[i](), b), g && g.exports) {
    g.exports = t;

    try {
      o = require("crypto");
    } catch (u) {}
  } else h && h.amd && h(function () {
    return t;
  });
}(void 0, [], MMath, 256, 6, 52, "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module, "function" == typeof define && define, "random");
MMath.seedrandom();

var ObjectInfor = /*#__PURE__*/function () {
  function ObjectInfor() {
    _classCallCheck(this, ObjectInfor);

    this.loc = new Array();
    this.size = new Array();
    this.fixedRatio = 0;
  }

  _createClass(ObjectInfor, [{
    key: "setLocPortrait",
    value: function setLocPortrait(left, top) {
      this.loc[0] = new Array(left, top);
    }
  }, {
    key: "setLocLandscape",
    value: function setLocLandscape(left, top) {
      this.loc[1] = new Array(left, top);
    }
  }, {
    key: "setSizePortrait",
    value: function setSizePortrait(width, height) {
      this.size[0] = new Array(width, height);
    }
  }, {
    key: "setSizeLandscape",
    value: function setSizeLandscape(width, height) {
      this.size[1] = new Array(width, height);
    }
  }]);

  return ObjectInfor;
}();

{
  mainBody.style.border = "0px";
  mainBody.style.margin = "0px";
  mainBody.style.padding = "0px";
  mainDiv.style.border = "0px";
  mainDiv.style.margin = "0px";
  mainDiv.style.padding = "0px";
}

function funcInsertFullScreenButton(_topLeftX, _topLeftY, _bottomRightX, _bottomRightY, ratio) {
  var btnFull = funcInsertElement("btnFull", "button", "", _topLeftX, _topLeftY, _bottomRightX, _bottomRightY, ratio); //btnFull.style.border = "1px solid black"

  btnFull.onclick = funcFullScreen;
  btnFull.style.position = "absolute";
  btnFull.style.border = "0px";
  btnFull.style.backgroundImage = "url('img/fullscreen.png')";
  btnFull.style.borderRadius = "10%";
}

function appendElement(_type, _id, _className, _left, _top, _width, _height, _fontSize) {
  var newElement = funcInsertElement(_id, _type, _className, _left, _top, _left + _width, _top + _height);
  newElement.style.fontSize = _fontSize * pageWidth + "px";
  return newElement;
}

function funcInsertElement(_id, _type, _class, leftTopX, leftTopY, rightBottomX, rightBottomY, _fixedRatio) {
  // _fixedRatio = width / height
  var newElement = document.getElementById(_id);

  if (newElement == null) {
    newElement = document.createElement(_type);
    nameOfRelocatedElements.push(_id);
  }

  newElement.id = _id;
  newElement.className = _class;
  newElement.style.position = "absolute";
  newElement.style.left = leftTopX * pageWidth + "px";
  newElement.style.top = leftTopY * pageHeight + "px";
  newElement.style.width = (rightBottomX - leftTopX) * pageWidth + "px";
  newElement.style.height = (rightBottomY - leftTopY) * pageHeight + "px";
  newElement.style.lineHeight = (rightBottomY - leftTopY) * pageHeight + "px";
  newElement.style.fontSize = (rightBottomY - leftTopY) * pageHeight + "px";
  newElement.style.backgroundSize = newElement.style.width + " " + newElement.style.height;
  var newObject = new ObjectInfor();
  newObject.setLocLandscape(leftTopX, leftTopY);
  newObject.setSizeLandscape(rightBottomX - leftTopX, rightBottomY - leftTopY);
  newObject.setLocPortrait(leftTopX, leftTopY);
  newObject.setSizePortrait(rightBottomX - leftTopX, rightBottomY - leftTopY);

  if (_fixedRatio > 0) {
    newObject.fixedRatio = _fixedRatio;
    newObject.size[0][1] = newObject.size[0][0] * pageWidth / pageHeight;
    newObject.size[1][1] = newObject.size[1][0] * pageWidth / pageHeight;
  }

  mapLocationInfor[_id] = newObject;
  mainDiv.appendChild(newElement);

  newElement.onclick = function () {
    console.log(newElement.id);
  };

  funcRelocateElement(_id);
  return newElement;
}

function funcSetLocation(_id, leftTopX, leftTopY, rightBottomX, rightBottomY, isLand) {
  var newObject = mapLocationInfor[_id];

  if (isLand == true) {
    newObject.setLocLandscape(leftTopX, leftTopY);
    newObject.setSizeLandscape(rightBottomX - leftTopX, rightBottomY - leftTopY);

    if (newObject.fixedRatio > 0) {
      newObject.size[1][1] = newObject.size[1][0] * pageWidth / pageHeight;
    }
  } else {
    newObject.setLocPortrait(leftTopX, leftTopY);
    newObject.setSizePortrait(rightBottomX - leftTopX, rightBottomY - leftTopY);

    if (newObject.fixedRatio > 0) {
      newObject.size[0][1] = newObject.size[0][0] * pageWidth / pageHeight;
    }
  }

  funcRelocateElement(_id);
}

function funcRelocateElement(_id) {
  var landIdx = 1;

  if (pageWidth < pageHeight == true) {
    landIdx = 0;
  }

  var leftTopX = mapLocationInfor[_id].loc[landIdx][0];
  var leftTopY = mapLocationInfor[_id].loc[landIdx][1];
  var objectWidth = mapLocationInfor[_id].size[landIdx][0];
  var objectHeight = mapLocationInfor[_id].size[landIdx][1];
  var newElement = document.getElementById(_id);
  newElement.style.left = leftTopX * pageWidth + "px";
  newElement.style.top = leftTopY * pageHeight + "px";
  newElement.style.width = objectWidth * pageWidth + "px";
  newElement.style.height = objectHeight * pageHeight + "px";
  newElement.style.lineHeight = objectHeight * pageHeight + "px";
  newElement.style.fontSize = objectHeight * pageHeight + "px";

  if (mapLocationInfor[_id].fixedRatio > 0) {
    newElement.style.fontSize = newElement.style.lineHeight = newElement.style.height = objectWidth * pageWidth / mapLocationInfor[_id].fixedRatio + "px";
  }

  newElement.style.backgroundSize = newElement.style.width + " " + newElement.style.height;
}

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

  if (widthPerHeightForLandOnly > 0 && pageWidth > pageHeight) {
    pageWidth = pageHeight * widthPerHeightForLandOnly;
  }

  if (isMainDivSizeUpdate == true) {
    mainDiv.style.height = pageHeight + "px";
    mainDiv.style.width = pageWidth + "px";
    mainDiv.style.backgroundSize = pageWidth + "px " + pageHeight + "px";
  }
}

var firstClick = true;

function funcPrepareGetLocation() {
  var temp = document.createElement("input");
  mainBody.appendChild(temp);
  temp.style.position = "absolute";
  temp.style.left = "0px";
  temp.style.top = "0px";

  mainDiv.onclick = function (event) {
    x = event.pageX;
    y = event.pageY;

    if (firstClick == true) {
      temp.value = (x / pageWidth).toFixed(4) + ', ' + (y / pageHeight).toFixed(4);
      firstClick = false;
    } else {
      temp.value = temp.value + ", " + (x / pageWidth).toFixed(4) + ', ' + (y / pageHeight).toFixed(4);
      firstClick = true;
    }

    temp.select();
    temp.setSelectionRange(0, 9999999);
    document.execCommand("copy");
  };
}

function funcRelocateElements() {
  // alert("here")
  for (var idx = 0; idx < nameOfRelocatedElements.length; idx++) {
    funcRelocateElement(nameOfRelocatedElements[idx]);
  }
}

var doResize = true;
$(window).resize(function () {
  if (doResize == false) {
    return;
  }

  funcUpdatePageSize(true);
  funcRelocateElements();
});
var arrMove = new Array();

function funcFullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    mainDiv.requestFullscreen();
  }
}

function funcMove(objectID, targetLeft, targetTop, sec, imgSrc) {
  arrMove[objectID] = 50;
  var movedObject = document.getElementById(objectID);
  movedObject.style.visibility = "visible";
  var curLeft = Number(movedObject.style.left.substr(0, movedObject.style.left.length - 2));
  var curTop = Number(movedObject.style.top.substr(0, movedObject.style.top.length - 2));
  var modLeft = 0;

  if (targetLeft != false) {
    modLeft = (targetLeft * pageWidth - curLeft) / 50;
  }

  var modTop = 0;

  if (targetTop != false) {
    modTop = (targetTop * pageHeight - curTop) / 50;
  }

  count = 50;
  var itvThis = setInterval(function () {
    funcIntervalMove(objectID, modLeft, modTop, itvThis, imgSrc);
  }, 1000 * sec / 50);

  if (targetTop == false) {
    targetTop = curTop;
  }

  if (targetLeft == false) {
    targetLeft = curLeft;
  }

  if (pageWidth > pageHeight) {
    mapLocationInfor[objectID].setLocLandscape(targetLeft, targetTop);
  } else {
    mapLocationInfor[objectID].setLocPortrait(targetLeft, targetTop);
  }
}

function funcIntervalMove(objectID, modLeft, modTop, itvThis, imgSrc) {
  var thisElement = document.getElementById(objectID);
  var curLeft = Number(thisElement.style.left.substr(0, thisElement.style.left.length - 2));
  var curTop = Number(thisElement.style.top.substr(0, thisElement.style.top.length - 2));
  thisElement.style.left = curLeft + modLeft + "px";
  thisElement.style.top = curTop + modTop + "px";

  if (arrMove[objectID] == 0) {
    if (imgSrc != null) {
      thisElement.style.backgroundImage = imgSrc;
    }

    clearInterval(itvThis);
  }

  arrMove[objectID]--;
}

function isOverlap(left1, top1, width1, height1, left2, top2, width2, height2) {
  if (left1 > left2 + width2 || left2 > left1 + width1 || top1 > top2 + height2 || top2 > top1 + height1) {
    return false;
  }

  return true;
}

function isValidLoc(_id, diceNumber) {
  if (diceNumber == 0) {
    return true;
  }

  var idxLoc = 0;

  if (pageHeight < pageWidth) {
    idxLoc = 1;
  }

  var overlap = true;
  var locThis = mapLocationInfor[_id + diceNumber].loc[idxLoc];
  var sizeThis = mapLocationInfor[_id + diceNumber].size[idxLoc];

  if (locThis[0] + sizeThis[0] > 0.999 || locThis[1] + sizeThis[1] > 0.999) {
    return false;
  }

  for (var idx = 0; idx < diceNumber; idx++) {
    var locTarget = mapLocationInfor[_id + idx].loc[idxLoc];

    if (locThis[0] > locTarget[0] + 1.1 * sizeThis[0] || locTarget[0] > locThis[0] + 1.1 * sizeThis[0] || locThis[1] > locTarget[1] + 1.1 * sizeThis[1] || locTarget[1] > locThis[1] + 1.1 * sizeThis[1]) {
      overlap = false;
    } else {
      overlap = true;
      break;
    }
  }

  return overlap == false;
}

function funcDrawDice(_id, _class, _numOfDice, arrImgs, leftTopX, leftTopY, rightBottomX, rightBottomY, size, // for portrait
color, funcSet, _leftTopX, _leftTopY, _rightBottomX, _rightBottomY, _size // for landscape
) {
  var originalHeight = pageHeight;
  var originalWidth = pageWidth;

  if (pageHeight < pageWidth) {
    var temp = pageHeight;
    pageHeight = pageWidth;
    pageWidth = temp;
  } // portrait setting


  for (var idx = 0; idx < _numOfDice; idx++) {
    var _left = leftTopX + (rightBottomX - leftTopX - size) * (getRandom(100, 1, true) / 100);

    var _top = leftTopY + (rightBottomY - leftTopY - size * pageWidth / pageHeight) * (getRandom(100, 1, true) / 100);

    var btnDice = funcInsertElement(_id + idx, "button", _class, _left, _top, _left + size, 0.9, 1.0);
    btnDice.style.display = "inline";
    btnDice.style.opacity = "1.0";
    var numOfTry = 100;

    while (isValidLoc(_id, idx) == false) {
      numOfTry--;

      if (numOfTry == 0) {
        //alert("cannnot" + idx)
        break;
      }

      _left = leftTopX + (rightBottomX - leftTopX - size) * (getRandom(100, 1, true) / 100);
      _top = leftTopY + (rightBottomY - leftTopY - size * pageWidth / pageHeight) * (getRandom(100, 1, true) / 100);
      btnDice = funcInsertElement(_id + idx, "button", _class, _left, _top, _left + size, 0.9, 1.0);
    }

    btnDice.style.backgroundColor = color || "black";
    diceValue[_id + idx] = getRandom(arrImgs.length);
    btnDice.style.backgroundImage = "url(" + arrImgs[diceValue[_id + idx]] + ")";
    btnDice.style.boxShadow = 0.1 * size * pageWidth + "px " + 0.1 * size * pageWidth + "px gray";
    btnDice.onclick = funcSet;
  }

  {
    // landscape setting
    var _temp = pageHeight;
    pageHeight = pageWidth;
    pageWidth = _temp;

    for (var _idx = 0; _idx < _numOfDice; _idx++) {
      var _left2 = _leftTopX + (_rightBottomX - _leftTopX - _size) * (getRandom(100, 1, true) / 100);

      var _top2 = _leftTopY + (_rightBottomY - _leftTopY - _size * pageWidth / pageHeight) * (getRandom(100, 1, true) / 100);

      var _btnDice = document.getElementById(_id + _idx);

      funcSetLocation(_id + _idx, _left2, _top2, _left2 + _size, 0.9, true);
      _btnDice.style.display = "inline";
      var _numOfTry = 500;

      while (isValidLoc(_id, _idx) == false) {
        _numOfTry--;

        if (_numOfTry == 0) {
          //alert("cannnot" + idx)
          break;
        }

        _left2 = _leftTopX + (_rightBottomX - _leftTopX - _size) * (getRandom(100, 1, true) / 100);
        _top2 = _leftTopY + (_rightBottomY - _leftTopY - _size * pageWidth / pageHeight) * (getRandom(100, 1, true) / 100);
        funcSetLocation(_id + _idx, _left2, _top2, _left2 + _size, 0.9, true);
      }

      _btnDice.style.backgroundColor = color || "black";
      _btnDice.style.boxShadow = 0.1 * _size * pageHeight + "px " + 0.1 * _size * pageHeight + "px gray";
      _btnDice.onclick = funcSet;
    }
  }
  pageHeigth = originalHeight;
  pageWidth = originalWidth;
}

var curDegree = new Array();
var intervalManager = new Array();
var diceValue = new Array();

function funcStartRoll(_id, idx, arrImgs, func) {
  var diceNumber = _id + idx;
  curDegree[diceNumber] = MMath.getRandom(359);

  if (intervalManager[diceNumber] == null) {
    intervalManager[diceNumber] = new Array();
  }

  intervalManager[diceNumber][0] = 90 + MMath.getRandom(40);
  intervalManager[diceNumber][1] = 5 + MMath.getRandom(10);
  intervalManager[diceNumber][2] = 3 + MMath.getRandom(3);
  var passedTime1 = intervalManager[diceNumber][0] * 10;
  var passedTime2 = passedTime1 + intervalManager[diceNumber][1] * 100;
  var intFirstTry = setInterval(function () {
    funcRoll(diceNumber, 0, arrImgs, intFirstTry);
  }, 10);
  setTimeout(function () {
    var intervalNew = setInterval(function () {
      funcRoll(diceNumber, 1, arrImgs, intervalNew);
    }, 100);
  }, passedTime1);
  setTimeout(function () {
    var intervalNew = setInterval(function () {
      funcRoll(diceNumber, 2, arrImgs, intervalNew, func);
    }, 200);
  }, passedTime2);
  stage = 1;
}

function funcRoll(diceNumber, idx, arrImgs, intFirstTry, func) {
  var _id = diceNumber;
  var rolledObject = document.getElementById(_id);

  if (intervalManager[diceNumber][idx] == 0) {
    clearInterval(intFirstTry);

    if (func != null) {
      func(_id);
    }

    return;
  }

  --intervalManager[diceNumber][idx];
  diceValue[diceNumber] = MMath.getRandom(arrImgs.length - 1);
  rolledObject.style.backgroundImage = "url('" + arrImgs[diceValue[diceNumber]] + "')";

  if (getRandom(10) % 2 == 0) {
    curDegree[diceNumber] += 2;
  } else {
    curDegree[diceNumber] -= 2;
  }

  rolledObject.style.transform = "rotate(" + curDegree[diceNumber] + "deg)";
} //funcPrepareGetLocation()