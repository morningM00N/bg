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
var numberOfPlayer = 3

var arrLocationLeft=new Array()
var arrLocationTop = new Array()

var tilePictureID = new Array()
var cardPictureID = new Array()

var playerLoc = new Array()
var playerColor = new Array("blue","red","green","yellow")
var currentPlayer=0

var storedWidth = new Array()
var storedHeight = new Array()

var realTileWidth 
var realTileHeight 



function drawchachacha() {



   
    for (let idx = 0; idx < numberOfTiles; idx++) {
        var loc = getRandom(2*numberOfTiles)
        while (tilePictureID[loc]>=0)
        {
            loc = getRandom(2*numberOfTiles)
        }
        tilePictureID[loc]=idx

        loc = getRandom(2*numberOfTiles)
        while (tilePictureID[loc]>=0)
        {
            loc = getRandom(2*numberOfTiles)
        }
        tilePictureID[loc]=idx

        loc = getRandom(numberOfTiles)
        while (cardPictureID[loc]>=0)
        {
            loc = getRandom(numberOfTiles)
        }
        cardPictureID[loc]=idx
        
    }
    var numOfX = Math.round((numberOfTiles + 1 - pageHeight / pageWidth) / (1 + pageHeight / pageWidth))
    var numOfY = numberOfTiles - numOfX
    //console.log(numOfX, numOfY)
    var tileWidth = (95 - numOfX * 1) / (numOfX + 1)
    var tileHeight = (95 - numOfY * 1) / (numOfY + 1)

    realTileWidth = tileWidth
    realTileHeight = tileHeight
    if (realTileWidth * pageWidth < realTileHeight * pageHeight) {
        realTileHeight = realTileWidth * pageWidth / pageHeight
    } else {
        realTileWidth = realTileHeight * pageHeight / pageWidth
    }
    //console.log(tileWidth, tileHeight)
    var topBound = 0
    var leftBound = 0
    var rightBound = 100
    var bottomBound = 100
    for (let idx = 0; idx < numOfX; idx++) {
        arrLocationLeft[idx] = getRandom(2, -1) + 2.5 + idx * (tileWidth + 1)
        arrLocationTop[idx] = getRandom(2, -1) + 2.5
        var btnTile = appendElementVP("button", "btnTile" + idx, "cards", arrLocationLeft[0], arrLocationTop[0], realTileWidth, realTileHeight, 0.8 * realTileHeight)
        btnTile.style.visibility="hidden"
        funcMove("btnTile" + idx,arrLocationLeft[idx],arrLocationTop[idx],0.5)
        btnTile.innerHTML = tilePictureID[idx]
        btnTile.style.transform = "rotate(" + getRandom(11, -10) + "deg)"
        if (arrLocationTop[idx] + realTileHeight > topBound) {
            topBound = arrLocationTop[idx] + realTileHeight
        }
    }

    for (let idx = 0; idx < numOfY; idx++) {
        arrLocationLeft[idx + numOfX] = getRandom(2, -1) + 97.5 - realTileWidth
        arrLocationTop[idx + numOfX] = getRandom(2, -1) + 2.5 + idx * (tileHeight + 1)

        var btnTile = appendElementVP("button", "btnTile" + (idx + numOfX), "cards",  arrLocationLeft[ numOfX],  arrLocationTop[numOfX], realTileWidth, realTileHeight, 0.8 * realTileHeight)
        btnTile.style.visibility="hidden"

        setTimeout(function(){
            funcMove("btnTile" + (idx + numOfX),arrLocationLeft[idx+numOfX],arrLocationTop[idx+numOfX],0.5)
        },750)
        btnTile.innerHTML = tilePictureID[(idx + numOfX)]
        btnTile.style.transform = "rotate(" + getRandom(11, -10) + "deg)"
        if (arrLocationLeft[idx + numOfX] < rightBound) {
            rightBound = arrLocationLeft[idx + numOfX]
        }
    }

    for (let idx = 0; idx < numOfX; idx++) {
        arrLocationLeft[idx + numOfX + numOfY] = getRandom(2, -1) + 97.5 - realTileWidth - idx * (tileWidth + 1)
        arrLocationTop[idx + numOfX + numOfY] = getRandom(2, -1) + 97.5 - realTileHeight

        var btnTile = appendElementVP("button", "btnTile" + (idx + numOfX + numOfY), "cards", arrLocationLeft[ numOfX + numOfY], arrLocationTop[ numOfX + numOfY], realTileWidth, realTileHeight, 0.8 * realTileHeight)
        btnTile.style.visibility="hidden"

        setTimeout(function(){
            funcMove("btnTile" + (idx + numOfX + numOfY),arrLocationLeft[idx + numOfX + numOfY],arrLocationTop[idx + numOfX + numOfY],0.5)
        },1000)
        btnTile.innerHTML = tilePictureID[(idx + numOfX + numOfY)]
        btnTile.style.transform = "rotate(" + getRandom(11, -10) + "deg)"
        if ( arrLocationTop[idx + numOfX + numOfY] < bottomBound) {
            bottomBound =  arrLocationTop[idx + numOfX + numOfY]
        }
    }

    for (let idx = 0; idx < numOfY; idx++) {
        arrLocationLeft[idx + numOfX + numOfX + numOfY] = getRandom(2, -1) + 2.5
        arrLocationTop[idx + numOfX + numOfX + numOfY] = getRandom(2, -1) + 97.5 - realTileHeight - idx * (tileHeight + 1)
        

        var btnTile = appendElementVP("button", "btnTile" + (idx+ numOfX + numOfX + numOfY), "cards", arrLocationLeft[ numOfX + numOfX + numOfY], arrLocationTop[ numOfX + numOfX + numOfY], realTileWidth, realTileHeight, 0.8 * realTileHeight)
        btnTile.style.visibility="hidden"

        setTimeout(function(){
        funcMove("btnTile" + (idx + numOfX + numOfX + numOfY),arrLocationLeft[idx + numOfX + numOfX + numOfY],arrLocationTop[idx + numOfX + numOfX + numOfY],0.5)
        },1250)

        btnTile.innerHTML = tilePictureID[(idx + numOfX + numOfX + numOfY)]
        btnTile.style.transform = "rotate(" + getRandom(11, -10) + "deg)"
        if ( arrLocationLeft[idx + numOfX + numOfX + numOfY]+realTileWidth > leftBound) {
            leftBound =  arrLocationLeft[idx + numOfX + numOfX + numOfY]+realTileWidth
        }
    }

    setTimeout(function () {
        for (let idx = 0; idx < numberOfPlayer; idx++) {
            if (idx==0)
            {
                playerLoc[0] = getRandom(2 * numberOfTiles)
            }
            else{
            playerLoc[idx] = (playerLoc[idx - 1] + Math.floor(2 * numberOfTiles / numberOfPlayer)) % (2 * numberOfTiles)
            }
            var btnPlayer = appendElementVP("button", "btnPlayer" + idx, "cards", arrLocationLeft[playerLoc[idx]] + realTileWidth / 4, arrLocationTop[playerLoc[idx]] + realTileHeight / 4, realTileWidth / 2, realTileHeight / 2, 0.8 * realTileHeight)
            btnPlayer.style.borderRadius = "100%"
            btnPlayer.style.border="0px"
            btnPlayer.style.backgroundColor = playerColor[idx]
            btnPlayer.style.opacity=0.5
        }
    }, 2000)

    setInterval(function(){
        var btnPlayer = document.getElementById("btnPlayer"+currentPlayer)
        if (btnPlayer==null)
        {
            return
        }
        if (btnPlayer.style.opacity==0.5)
        {
            btnPlayer.style.opacity=1.0
        }
        else{
            btnPlayer.style.opacity=0.5
        }
    },500
    )

    topBound += 5
    bottomBound -= 5
    leftBound += 5
    rightBound -= 5

    var rate = 1.1
    var count = 0
    while (drawCards(topBound, bottomBound, leftBound, rightBound, numberOfTiles, storedWidth, storedHeight, rate) == false) {
        if (count == 200) {
            rate *= 1.1
            count = 0
        }
        count++

    }
    //console.log(rate)

    var eachCardSize = (bottomBound - topBound) / 100 * pageHeight * (rightBound - leftBound) / 100 * pageWidth / numberOfTiles
    var lengthOfCard = Math.sqrt(eachCardSize) / rate
    var cardWidth = lengthOfCard / pageWidth * 100
    var cardHeight = lengthOfCard / pageHeight * 100

    for (let idx = 0; idx < numberOfTiles; idx++) {
        var btnCards = appendElementVP("button", "btnCard" + idx, "cards", 50-cardWidth/2, 50-cardHeight/2, cardWidth, cardHeight, 0.8 * cardHeight)
        btnCards.innerHTML = cardPictureID[idx]
        btnCards.style.transform = "rotate(" + getRandom(31, -30) + "deg)"
        btnCards.style.visibility="hidden"
        btnCards.onclick=function()
        {
            funcClickCard(idx)
        }

        setTimeout(function(){
        funcMove("btnCard" + idx,storedWidth[idx],storedHeight[idx],0.5)
        },1500)
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

function funcClickCard(idx)
{
    var targetLoc = playerLoc[currentPlayer]+1
    if (targetLoc == 2*numberOfTiles)
    {
        targetLoc = 0
    }
    while (true)
    {
        var contained=false
        for (let idx2 = 0; idx2 < numberOfPlayer; idx2++) {
            if (idx2==currentPlayer)
            {
                continue
            }
            if (targetLoc == playerLoc[idx2])
            {
                contained=true
                break
            }
        }
        if (contained==false)
        {
            break
        }
        else{
            targetLoc++
            if (targetLoc == 2*numberOfTiles)
            {
                targetLoc = 0
            }
        }
    }
    if (cardPictureID[idx]==tilePictureID[targetLoc])
    {
        console.log("correct")
        playerLoc[currentPlayer]=targetLoc
        
        funcMove("btnPlayer" + currentPlayer,arrLocationLeft[playerLoc[currentPlayer]]+ realTileWidth / 4,arrLocationTop[playerLoc[currentPlayer]]+ realTileHeight / 4,0.25)
    }
    else{
        console.log("wrong")
        currentPlayer++
        if (currentPlayer==numberOfPlayer)
        {
            currentPlayer=0
        }
    }
}

function funcMove(objectID,targetLeft,targetTop,sec) {
    arrMove[objectID]=50
    var movedObject = document.getElementById(objectID)
    movedObject.style.visibility="visible"
    var curLeft = Number(movedObject.style.left.substr(0, movedObject.style.left.length - 2))
    var curTop = Number(movedObject.style.top.substr(0, movedObject.style.top.length - 2))

    var modLeft = (targetLeft - curLeft) / 50
    var modTop = (targetTop - curTop) / 50
    count = 50
    var itvThis = setInterval(function() {
        funcIntervalMove(objectID,  modLeft, modTop, itvThis)
    }, 1000*sec/50)

}

function funcIntervalMove(objectID,  modLeft, modTop, itvThis) {
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
