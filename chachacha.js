var pageHeight = document.documentElement.clientHeight
var pageWidth = document.documentElement.clientWidth

var mainDiv = document.getElementById("main")
var body = document.getElementById("body")

mainDiv.style.height = pageHeight + "px"
mainDiv.style.width = pageWidth + "px"
mainDiv.style.backgroundSize = pageWidth + "px " + pageHeight + "px"

var seed = Math.floor(Math.random() * 100000);

//seed = 0

function getRandom(bound, minBound) {
    if (minBound != null) {
        bound = bound - minBound
    }
    var x = Math.sin(seed++) * 100000;
    var temp = Math.floor((x - Math.floor(x)) * bound)
    if (minBound == null) {
        return temp
    }
    return temp + minBound
}

function appendElement(_type, _id, _className, _left, _top, _width, _height, _fontSize) {
    var newElement = document.createElement(_type)
    newElement.id = _id
    newElement.className = _className
    newElement.style.left = _left * pageWidth + "px"
    newElement.style.top = _top * pageHeight + "px"
    newElement.style.width = _width * pageWidth + "px"
    newElement.style.height = _height * pageHeight + "px"
    newElement.style.fontSize = _fontSize * pageWidth + "px"
    newElement.style.lineHeight = _height * pageHeight + "px"

    mainDiv.appendChild(newElement)
    return newElement
}

function appendElementVP(_type, _id, _className, _left, _top, _width, _height, _fontSize) {
    var newElement = document.createElement(_type)
    newElement.id = _id
    newElement.className = _className
    newElement.style.left = _left + "vw"
    newElement.style.top = _top + "vh"
    newElement.style.width = _width + "vw"
    newElement.style.height = _height + "vh"
    newElement.style.fontSize = _fontSize + "vh"
    newElement.style.lineHeight = _height + "vh"

    mainDiv.appendChild(newElement)
    return newElement
}

var numberOfTiles = 12

var arrLocationLeft=new Array()
var arrLocationTop = new Array()

function drawchachacha() {
    var numOfX = Math.round((numberOfTiles + 1 - pageHeight / pageWidth) / (1 + pageHeight / pageWidth))
    var numOfY = numberOfTiles - numOfX
    console.log(numOfX, numOfY)
    var tileWidth = (95 - numOfX * 1) / (numOfX + 1)
    var tileHeight = (95 - numOfY * 1) / (numOfY + 1)

    var realTileWidth = tileWidth
    var realTileHeight = tileHeight
    if (realTileWidth * pageWidth < realTileHeight * pageHeight) {
        realTileHeight = realTileWidth * pageWidth / pageHeight
    } else {
        realTileWidth = realTileHeight * pageHeight / pageWidth
    }
    console.log(tileWidth, tileHeight)
    var topBound = 0
    var leftBound = 0
    var rightBound = 100
    var bottomBound = 100
    for (let idx = 0; idx < numOfX; idx++) {
        arrLocationLeft[idx] = getRandom(2, -1) + 2.5 + idx * (tileWidth + 1)
        arrLocationTop[idx] = getRandom(2, -1) + 2.5
        var btnTile = appendElementVP("button", "btnTile" + idx, "cards", arrLocationLeft[idx], arrLocationTop[idx], realTileWidth, realTileHeight, 0.8 * realTileHeight)
        btnTile.innerHTML = idx
        btnTile.style.transform = "rotate(" + getRandom(11, -10) + "deg)"
        if (arrLocationTop[idx] + realTileHeight > topBound) {
            topBound = arrLocationTop[idx] + realTileHeight
        }
    }

    for (let idx = 0; idx < numOfY; idx++) {
        arrLocationLeft[idx + numOfX] = getRandom(2, -1) + 97.5 - realTileWidth
        arrLocationTop[idx + numOfX] = getRandom(2, -1) + 2.5 + idx * (tileHeight + 1)

        var btnTile = appendElementVP("button", "btnTile" + (idx + numOfY), "cards",  arrLocationLeft[idx + numOfX],  arrLocationTop[idx + numOfX], realTileWidth, realTileHeight, 0.8 * realTileHeight)
        btnTile.innerHTML = (idx + numOfX)
        btnTile.style.transform = "rotate(" + getRandom(11, -10) + "deg)"
        if (arrLocationLeft[idx + numOfX] < rightBound) {
            rightBound = arrLocationLeft[idx + numOfX]
        }
    }

    for (let idx = 0; idx < numOfX; idx++) {
        arrLocationLeft[idx + numOfX + numOfY] = getRandom(2, -1) + 97.5 - realTileWidth - idx * (tileWidth + 1)
        arrLocationTop[idx + numOfX + numOfY] = getRandom(2, -1) + 97.5 - realTileHeight

        var btnTile = appendElementVP("button", "btnTile" + (idx + numOfX + numOfY), "cards", arrLocationLeft[idx + numOfX + numOfY], arrLocationTop[idx + numOfX + numOfY], realTileWidth, realTileHeight, 0.8 * realTileHeight)
        btnTile.innerHTML = (idx + numOfX + numOfY)
        btnTile.style.transform = "rotate(" + getRandom(11, -10) + "deg)"
        if ( arrLocationTop[idx + numOfX + numOfY] < bottomBound) {
            bottomBound =  arrLocationTop[idx + numOfX + numOfY]
        }
    }

    for (let idx = 0; idx < numOfY; idx++) {
        arrLocationLeft[idx + numOfX + numOfX + numOfY] = getRandom(2, -1) + 2.5
        arrLocationTop[idx + numOfX + numOfX + numOfY] = getRandom(2, -1) + 97.5 - realTileHeight - idx * (tileHeight + 1)

        var btnTile = appendElementVP("button", "btnTile" + (idx + numOfX + numOfX + numOfY), "cards", arrLocationLeft[idx + numOfX + numOfX + numOfY], arrLocationTop[idx + numOfX + numOfX + numOfY], realTileWidth, realTileHeight, 0.8 * realTileHeight)
        btnTile.innerHTML = (idx + numOfX + numOfX + numOfY)
        btnTile.style.transform = "rotate(" + getRandom(11, -10) + "deg)"
        if ( arrLocationLeft[idx + numOfX + numOfX + numOfY]+realTileWidth > leftBound) {
            leftBound =  arrLocationLeft[idx + numOfX + numOfX + numOfY]+realTileWidth
        }
    }

    topBound += 5
    bottomBound -= 5
    leftBound += 5
    rightBound -= 5

    var storedWidth = new Array()
    var storedHeight = new Array()
    var rate = 1.1
    var count = 0
    while (drawCards(topBound, bottomBound, leftBound, rightBound, numberOfTiles, storedWidth, storedHeight, rate) == false) {
        if (count == 200) {
            rate *= 1.1
            count = 0
        }
        count++

    }
    console.log(rate)

    var eachCardSize = (bottomBound - topBound) / 100 * pageHeight * (rightBound - leftBound) / 100 * pageWidth / numberOfTiles
    var lengthOfCard = Math.sqrt(eachCardSize) / rate
    var cardWidth = lengthOfCard / pageWidth * 100
    var cardHeight = lengthOfCard / pageHeight * 100

    for (let idx = 0; idx < numberOfTiles; idx++) {
        var btnCards = appendElementVP("button", "btnCard" + idx, "cards", 50-cardWidth/2, 50-cardHeight/2, cardWidth, cardHeight, 0.8 * cardHeight)
        btnCards.innerHTML = idx
        btnCards.style.transform = "rotate(" + getRandom(31, -30) + "deg)"
        funcMove("btnCard" + idx,storedWidth[idx],storedHeight[idx],0.5)
    }

}

function drawCards(topBound, bottomBound, leftBound, rightBound, numberOfTiles, storedWidth, storedHeight, rate) {
    var eachCardSize = (bottomBound - topBound) / 100 * pageHeight * (rightBound - leftBound) / 100 * pageWidth / numberOfTiles
    var lengthOfCard = Math.sqrt(eachCardSize) / rate
    var cardWidth = lengthOfCard / pageWidth * 100
    var cardHeight = lengthOfCard / pageHeight * 100

    var count
    for (let idx = 0; idx < numberOfTiles; idx++) {
        count = 0
        var thisLeft = getRandom(rightBound - cardWidth, leftBound)
        var thisTop = getRandom(bottomBound - cardHeight, topBound)
        while (isOverlap(thisLeft, thisTop, cardWidth, cardHeight, storedWidth, storedHeight, idx) == true) {
            thisLeft = getRandom(rightBound - cardWidth, leftBound)
            thisTop = getRandom(bottomBound - cardHeight, topBound)
            count++
            if (count == 2000) {
                return false
            }
        }
        storedWidth[idx] = thisLeft
        storedHeight[idx] = thisTop
    }
    return true
}

var arrMove=new Array()


function funcMove(objectID,targetLeft,targetTop,sec) {
    arrMove[objectID]=100
    var movedObject = document.getElementById(objectID)
    var curLeft = Number(movedObject.style.left.substr(0, movedObject.style.left.length - 2))
    var curTop = Number(movedObject.style.top.substr(0, movedObject.style.top.length - 2))

    var modLeft = (targetLeft - curLeft) / 100
    var modTop = (targetTop - curTop) / 100
    count = 100
    var itvThis = setInterval(function() {
        funcIntervalMove(objectID, targetLeft, targetTop, modLeft, modTop, itvThis)
    }, 1000*sec/100)

}

function funcIntervalMove(objectID, targetLeft, targetTop, modLeft, modTop, itvThis) {
    var thisElement = document.getElementById(objectID)
    var curLeft = Number(thisElement.style.left.substr(0, thisElement.style.left.length - 2))
    var curTop = Number(thisElement.style.top.substr(0, thisElement.style.top.length - 2))
    thisElement.style.left = curLeft + modLeft + "vw"
    thisElement.style.top = curTop + modTop + "vh"
    if (arrMove[objectID]==0)
    {
        clearInterval(itvThis)
    }
    arrMove[objectID]--

}

function isOverlap(thisLeft, thisTop, cardWidth, cardHeight, storedWidth, storedHeight, idx) {
    var thisRight = thisLeft + cardWidth
    var thisBottom = thisTop + cardHeight
    for (let idx2 = 0; idx2 < idx; idx2++) {
        var iterLeft = storedWidth[idx2]
        var iterRight = iterLeft + cardWidth
        var iterTop = storedHeight[idx2]
        var iterBottom = iterTop + cardHeight

        if (thisLeft + 1 > iterRight || iterLeft + 1 > thisRight || thisTop + 1 > iterBottom || iterTop + 1 > thisBottom) {
            continue
        }

        return true
    }
    return false
}


drawchachacha()
