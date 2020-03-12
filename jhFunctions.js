var pageHeight
var pageWidth
var widthPerHeight
var widthPerHeightForLandOnly

var mainDiv = document.getElementById("main")
var mainBody = document.getElementById("body")

function funcWidthPerHeight(_wperh, _wperhonly) {
    widthPerHeight = _wperh
    widthPerHeightForLandOnly = _wperhonly
}

var mapLocationInfor = new Array()
var nameOfRelocatedElements = new Array()

var seed = Math.floor(Math.random() * 100000);


function getRandom(bound, min, isSeed) {
    let mod = 0
    if (min != null) {
        mod += min
    }
    if (isSeed = true) {
        let x = Math.sin(seed++) * 100000;
        return Math.floor((x - Math.floor(x)) * bound) + mod
    }
    return bound * Math.random() + mod
}



class ObjectInfor {
    constructor() {
        this.loc = new Array()
        this.size = new Array()
        this.fixedRatio = 0
    }
    setLocPortrait(left, top) {
        this.loc[0] = new Array(left, top)
    }
    setLocLandscape(left, top) {
        this.loc[1] = new Array(left, top)
    }
    setSizePortrait(width, height) {
        this.size[0] = new Array(width, height)
    }
    setSizeLandscape(width, height) {
        this.size[1] = new Array(width, height)
    }
}

{
    mainBody.style.border = "0px"
    mainBody.style.margin = "0px"
    mainBody.style.padding = "0px"

    mainDiv.style.border = "0px"
    mainDiv.style.margin = "0px"
    mainDiv.style.padding = "0px"
}

function funcInsertFullScreenButton(_topLeftX, _topLeftY, _bottomRightX, _bottomRightY, ratio) {
    var btnFull = funcInsertElement(
        "btnFull",
        "button",
        "",
        _topLeftX, _topLeftY, _bottomRightX, _bottomRightY, ratio
    )
    //btnFull.style.border = "1px solid black"
    btnFull.onclick = funcFullScreen
    btnFull.style.position = "absolute"
    btnFull.style.border = "0px"
    btnFull.style.backgroundImage = "url('img/fullscreen.png')"
    btnFull.style.borderRadius = "10%"


}

function appendElement(_type, _id, _className, _left, _top, _width, _height, _fontSize) {

    var newElement = funcInsertElement(_id, _type, _className, _left, _top, _left + _width, _top + _height)
    newElement.style.fontSize = _fontSize * pageWidth + "px"

    return newElement
}


function funcInsertElement(_id, _type, _class, leftTopX, leftTopY, rightBottomX, rightBottomY, _fixedRatio) { // _fixedRatio = width / height
    var newElement = document.getElementById(_id)
    if (newElement == null) {
        newElement = document.createElement(_type)
        nameOfRelocatedElements.push(_id)
    }
    newElement.id = _id
    newElement.className = _class
    newElement.style.position = "absolute"
    newElement.style.left = leftTopX * pageWidth + "px"
    newElement.style.top = leftTopY * pageHeight + "px"
    newElement.style.width = (rightBottomX - leftTopX) * pageWidth + "px"
    newElement.style.height = (rightBottomY - leftTopY) * pageHeight + "px"
    newElement.style.lineHeight = (rightBottomY - leftTopY) * pageHeight + "px"
    newElement.style.fontSize = (rightBottomY - leftTopY) * pageHeight + "px"
    newElement.style.backgroundSize = newElement.style.width + " " + newElement.style.height


    var newObject = new ObjectInfor()
    newObject.setLocLandscape(leftTopX, leftTopY)
    newObject.setSizeLandscape(rightBottomX - leftTopX, rightBottomY - leftTopY)
    newObject.setLocPortrait(leftTopX, leftTopY)
    newObject.setSizePortrait(rightBottomX - leftTopX, rightBottomY - leftTopY)

    if (_fixedRatio > 0) {
        newObject.fixedRatio = _fixedRatio
        newObject.size[0][1] = newObject.size[0][0] * pageWidth / pageHeight
        newObject.size[1][1] = newObject.size[1][0] * pageWidth / pageHeight
    }

    mapLocationInfor[_id] = newObject;

    mainDiv.appendChild(newElement)

    funcRelocateElement(_id)
    return newElement
}

function funcSetLocation(_id, leftTopX, leftTopY, rightBottomX, rightBottomY, isLand) {
    let newObject = mapLocationInfor[_id]
    if (isLand == true) {
        newObject.setLocLandscape(leftTopX, leftTopY)
        newObject.setSizeLandscape(rightBottomX - leftTopX, rightBottomY - leftTopY)
        if (newObject.fixedRatio > 0) {
            newObject.size[1][1] = newObject.size[1][0] * pageWidth / pageHeight
        }

    } else {
        newObject.setLocPortrait(leftTopX, leftTopY)
        newObject.setSizePortrait(rightBottomX - leftTopX, rightBottomY - leftTopY)
        if (newObject.fixedRatio > 0) {
            newObject.size[0][1] = newObject.size[0][0] * pageWidth / pageHeight
        }
    }
    funcRelocateElement(_id)
}

function funcRelocateElement(_id) {
    let landIdx = 1
    if (pageWidth < pageHeight == true) {
        landIdx = 0
    }

    let leftTopX = mapLocationInfor[_id].loc[landIdx][0]
    let leftTopY = mapLocationInfor[_id].loc[landIdx][1]
    let objectWidth = mapLocationInfor[_id].size[landIdx][0]
    let objectHeight = mapLocationInfor[_id].size[landIdx][1]


    let newElement = document.getElementById(_id)
    newElement.style.left = leftTopX * pageWidth + "px"
    newElement.style.top = leftTopY * pageHeight + "px"
    newElement.style.width = objectWidth * pageWidth + "px"
    newElement.style.height = objectHeight * pageHeight + "px"
    newElement.style.lineHeight = objectHeight * pageHeight + "px"
    newElement.style.fontSize = objectHeight * pageHeight + "px"
    if (mapLocationInfor[_id].fixedRatio > 0) {
        newElement.style.fontSize = newElement.style.lineHeight = newElement.style.height = objectWidth * pageWidth / mapLocationInfor[_id].fixedRatio + "px"
    }
    newElement.style.backgroundSize = newElement.style.width + " " + newElement.style.height
}



function funcUpdatePageSize(isMainDivSizeUpdate) {
    pageHeight = document.documentElement.clientHeight
    pageWidth = document.documentElement.clientWidth
    if (widthPerHeight != 0) {
        if (pageWidth > pageHeight * widthPerHeight) {
            pageWidth = pageHeight * widthPerHeight
        } else {
            pageHeight = pageWidth / widthPerHeight
        }
    }
    if (widthPerHeightForLandOnly > 0 && pageWidth > pageHeight) {
        pageWidth = pageHeight * widthPerHeightForLandOnly
    }

    if (isMainDivSizeUpdate == true) {
        mainDiv.style.height = pageHeight + "px"
        mainDiv.style.width = pageWidth + "px"

        mainDiv.style.backgroundSize = pageWidth + "px " + pageHeight + "px"
    }
}

var firstClick = true

function funcPrepareGetLocation() {
    var temp = document.createElement("input")
    mainBody.appendChild(temp)
    temp.style.position = "absolute"
    temp.style.left = "0px"
    temp.style.top = "0px"
    mainDiv.onclick = function (event) {
        x = event.pageX;
        y = event.pageY;
        if (firstClick == true) {
            temp.value = (x / pageWidth).toFixed(4) + ', ' + (y / pageHeight).toFixed(4)
            firstClick = false
        } else {
            temp.value = temp.value + ", " + (x / pageWidth).toFixed(4) + ', ' + (y / pageHeight).toFixed(4)
            if (pageHeight < pageWidth) {
                temp.value += ", true"
            }
            firstClick = true
        }

        temp.select();
        temp.setSelectionRange(0, 9999999)
        document.execCommand("copy")
    }
}


function funcRelocateElements() {
    // alert("here")

    for (let idx = 0; idx < nameOfRelocatedElements.length; idx++) {
        funcRelocateElement(nameOfRelocatedElements[idx])
    }

}

var doResize = true
$(window).resize(function () {
    if (doResize == false) {
        return
    }
    funcUpdatePageSize(true)
    funcRelocateElements()
});

var arrMove = new Array()

function funcFullScreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen()
    } else {
        mainDiv.requestFullscreen()
    }

}

function funcMove(objectID, targetLeft, targetTop, sec, imgSrc) {
    arrMove[objectID] = 50
    var movedObject = document.getElementById(objectID)
    movedObject.style.visibility = "visible"
    var curLeft = Number(movedObject.style.left.substr(0, movedObject.style.left.length - 2))
    var curTop = Number(movedObject.style.top.substr(0, movedObject.style.top.length - 2))

    var modLeft = 0
    if (targetLeft != false) {
        modLeft = (targetLeft * pageWidth - curLeft) / 50
    }

    var modTop = 0
    if (targetTop != false) {
        modTop = (targetTop * pageHeight - curTop) / 50
    }
    count = 50
    var itvThis = setInterval(function () {
        funcIntervalMove(objectID, modLeft, modTop, itvThis, imgSrc)
    }, 1000 * sec / 50)
    if (targetTop == false) {
        targetTop = curTop
    }
    if (targetLeft == false) {
        targetLeft = curLeft
    }

    if (pageWidth > pageHeight) {
        mapLocationInfor[objectID].setLocLandscape(targetLeft, targetTop)
    } else {
        mapLocationInfor[objectID].setLocPortrait(targetLeft, targetTop)
    }

}

function funcIntervalMove(objectID, modLeft, modTop, itvThis, imgSrc) {
    var thisElement = document.getElementById(objectID)
    var curLeft = Number(thisElement.style.left.substr(0, thisElement.style.left.length - 2))
    var curTop = Number(thisElement.style.top.substr(0, thisElement.style.top.length - 2))
    thisElement.style.left = curLeft + modLeft + "px"
    thisElement.style.top = curTop + modTop + "px"
    if (arrMove[objectID] == 0) {
        if (imgSrc != null) {
            thisElement.style.backgroundImage = imgSrc
        }
        clearInterval(itvThis)
    }
    arrMove[objectID]--

}

function isValidLoc(_id, diceNumber) {
    if (diceNumber == 0) {
        return
    }
    let idxLoc = 0
    if (pageHeight < pageWidth) {
        idxLoc = 1
    }
    let overlap = true
    let locThis = mapLocationInfor[_id + diceNumber].loc[idxLoc]
    let sizeThis = mapLocationInfor[_id + diceNumber].size[idxLoc]
    for (let idx = 0; idx < diceNumber; idx++) {
        let locTarget = mapLocationInfor[_id + idx].loc[idxLoc]
        if (locThis[0] > locTarget[0] + 1.1 * sizeThis[0] || locTarget[0] > locThis[0] + 1.1 * sizeThis[0] ||
            locThis[1] > locTarget[1] + 1.1 * sizeThis[1] || locTarget[1] > locThis[1] + 1.1 * sizeThis[1]) {
            overlap = false
        } else {
            overlap = true
            break
        }
    }
    return overlap == false

}

function funcDrawDice(_id, _class, _numOfDice, arrImgs, leftTopX, leftTopY, rightBottomX, rightBottomY, size,  // for portrait
    color, funcSet,
    _leftTopX, _leftTopY, _rightBottomX, _rightBottomY, _size // for landscape
) {
    let originalHeight = pageHeight
    let originalWidth = pageWidth

    if (pageHeight < pageWidth) {
        let temp = pageHeight
        pageHeight = pageWidth
        pageWidth = temp
    }
    // portrait setting
    for (let idx = 0; idx < _numOfDice; idx++) {
        let _left = leftTopX + (rightBottomX - leftTopX - size) * (getRandom(100, 1, true) / 100)
        let _top = leftTopY + (rightBottomY - leftTopY - size * pageWidth / pageHeight) * (getRandom(100, 1, true) / 100)
        let btnDice = funcInsertElement(
            _id + idx,
            "button",
            _class,
            _left, _top, _left + size, 0.9, 1.0
        )
        btnDice.style.display = "inline"
        btnDice.style.opacity="1.0"
        let numOfTry = 500
        while (isValidLoc(_id, idx) == false) {
            numOfTry--
            if (numOfTry == 0) {
                //alert("cannnot" + idx)
                break;
            }
            _left = leftTopX + (rightBottomX - leftTopX - size) * (getRandom(100, 1, true) / 100)
            _top = leftTopY + (rightBottomY - leftTopY - size * pageWidth / pageHeight) * (getRandom(100, 1, true) / 100)
            btnDice = funcInsertElement(
                _id + idx,
                "button",
                _class,
                _left, _top, _left + size, 0.9, 1.0
            )
        }

        btnDice.style.backgroundColor = color || "black"
        diceValue[_id + idx]=getRandom(arrImgs.length)
        btnDice.style.backgroundImage = "url(" + arrImgs[diceValue[_id + idx]] + ")"
        btnDice.style.boxShadow = 0.1 * size * pageWidth + "px " + 0.1 * size * pageWidth + "px gray"
        btnDice.onclick = funcSet
    }

    {
        // landscape setting
        let temp = pageHeight
        pageHeight = pageWidth
        pageWidth = temp

        for (let idx = 0; idx < _numOfDice; idx++) {
            let _left = _leftTopX + (_rightBottomX - _leftTopX - _size) * (getRandom(100, 1, true) / 100)
            let _top = _leftTopY + (_rightBottomY - _leftTopY - _size * pageWidth / pageHeight) * (getRandom(100, 1, true) / 100)
            let btnDice = document.getElementById(_id+idx)
            funcSetLocation(_id + idx,_left, _top, _left + _size, 0.9, true)
           
            btnDice.style.display = "inline"
            let numOfTry = 500
            while (isValidLoc(_id, idx) == false) {
                numOfTry--
                if (numOfTry == 0) {
                    //alert("cannnot" + idx)
                    break;
                }
                _left = _leftTopX + (_rightBottomX - _leftTopX - _size) * (getRandom(100, 1, true) / 100)
                _top = _leftTopY + (_rightBottomY - _leftTopY - _size * pageWidth / pageHeight) * (getRandom(100, 1, true) / 100)
                funcSetLocation(_id + idx,_left, _top, _left + _size, 0.9, true)
            }

            btnDice.style.backgroundColor = color || "black"
            btnDice.style.boxShadow = 0.1 * _size * pageHeight + "px " + 0.1 * _size * pageHeight + "px gray"
            btnDice.onclick = funcSet
        }

    }

    pageHeigth =  originalHeight 
    pageWidth =  originalWidth 
}

var curDegree = new Array()
var intervalManager = new Array()
var diceValue = new Array()

function funcStartRoll(_id, idx, arrImgs,func) {
    let diceNumber = _id + idx
    curDegree[diceNumber] = getRandom(360)
    if (intervalManager[diceNumber] == null) {
        intervalManager[diceNumber] = new Array()
    }

    intervalManager[diceNumber][0] = 90 + getRandom(40)
    intervalManager[diceNumber][1] = 5 + getRandom(10)
    intervalManager[diceNumber][2] = 3 + getRandom(3)
    var passedTime1 = intervalManager[diceNumber][0] * 10
    let passedTime2 = passedTime1 + intervalManager[diceNumber][1] * 100
    let intFirstTry = setInterval(function () { funcRoll(diceNumber, 0, arrImgs, intFirstTry) }, 10)
    setTimeout(function () {
        let intervalNew = setInterval(function () { funcRoll(diceNumber, 1, arrImgs, intervalNew) }, 100)
    }, passedTime1)
    setTimeout(function () {
        let intervalNew = setInterval(function () { funcRoll(diceNumber, 2, arrImgs, intervalNew,func) }, 200)
    }, passedTime2)
    stage = 1
}

function funcRoll(diceNumber, idx, arrImgs, intFirstTry, func) {

    let _id = diceNumber
    let rolledObject = document.getElementById(_id)
    if (intervalManager[diceNumber][idx] == 0) {
        clearInterval(intFirstTry)
        if (func!=null){
            func(_id)
        }
        return
    }
    --intervalManager[diceNumber][idx]
    
    diceValue[diceNumber] = (getRandom(arrImgs.length))
    rolledObject.style.backgroundImage = "url('" + arrImgs[diceValue[diceNumber]] + "')"
    if (getRandom(10) % 2 == 0) {
        curDegree[diceNumber] += 2
    } else {
        curDegree[diceNumber] -= 2
    }
    rolledObject.style.transform = "rotate(" + curDegree[diceNumber] + "deg)"


}
//funcPrepareGetLocation()
