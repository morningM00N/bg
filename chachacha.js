var pageHeight = document.documentElement.clientHeight
var pageWidth = document.documentElement.clientWidth

var mainDiv = document.getElementById("main")
var body = document.getElementById("body")

mainDiv.style.height = pageHeight + "px"
mainDiv.style.width = pageWidth + "px"
mainDiv.style.backgroundSize = "100vw 100vh"

var seed = Math.floor(Math.random() * 100000);

var imgSrcs = new Array();
var imgRate = new Array();
var imgPool = new Array();

// imgPool[0] = "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313__340.jpg"
// imgPool[1] = "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
// imgPool[2] = "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1094874726.png?crop=0.542xw:0.814xh;0.0472xw,0.127xh&resize=640:*"
// imgPool[3] = "https://i.ytimg.com/vi/Gw_xvtWJ6q0/hqdefault.jpg"
// imgPool[4] = "https://www.washingtonpost.com/resizer/uwlkeOwC_3JqSUXeH8ZP81cHx3I=/arc-anglerfish-washpost-prod-washpost/public/HB4AT3D3IMI6TMPTWIZ74WAR54.jpg"
// imgPool[5] = "https://i.pinimg.com/originals/7d/69/87/7d6987cfe80f6f74545ba98c39694e9d.jpg"
// imgPool[6] = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSiKivYLsy8XijHUP3j1w6tA5LicGZmR_TWp6rAJW59a0U5RQ2z"
// imgPool[7] = "https://i.pinimg.com/originals/10/88/89/108889e58bc525525181b9fe3494a8b8.jpg"
// imgPool[8] = "https://media.cdnandroid.com/5c/03/43/f3/b3/imagen-cute-cat-hd-wallpapers-0big.jpg"
// imgPool[9] = "https://image.winudf.com/v2/image/Y29tLkhEV2FsbHBhcGVyLmN1dGVjYXRjX3NjcmVlbl80XzE1MjQzNzk3MDJfMDQw/screen-4.jpg?fakeurl=1&type=.jpg"
// imgPool[10] = "https://pbs.twimg.com/profile_images/1151916124474183680/2iZykkYm_400x400.png"
// imgPool[11] = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRu63Iy6aij00D_2nn0dzzFPGVHhxQv0IufwKLpoL7Qt3K2qjg5"


var word_list = new Array();
var rawFile = new XMLHttpRequest();
rawFile.open("GET", "imgList.txt", false);
rawFile.setRequestHeader('Content-Type', 'text/html;charset=utf-8')
rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
            var allText = rawFile.responseText;
            word_list = allText.split('\n');
        }
    }
}
rawFile.send(null);

for (let idx = 0; idx < word_list.length; idx++) {
    if (Number(word_list[idx][word_list[idx].length-1])==0)
    {
        funcAddImg(word_list[idx].substr(0,word_list[idx].length-1))    
    }
    else{
        funcAddImg(word_list[idx])
    }


}





function funcAddImg(val)
{
    imgSrcs[imgSrcs.length]=val
}


var imgBG = "https://previews.123rf.com/images/shottythefirst/shottythefirst1403/shottythefirst140300042/26763558-abstract-blue-playing-card-back-pattern-texture.jpg"

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

var arrLocationLeft = new Array()
var arrLocationTop = new Array()

var tilePictureID = new Array()
var cardPictureID = new Array()

var playerLoc = new Array()
var playerColor = new Array("blue", "red", "green", "purple")
var currentPlayer = 0

var storedWidth = new Array()
var storedHeight = new Array()

var realTileWidth
var realTileHeight

for (let idx = 0; idx < 10000; idx++) {
    var loc1 = getRandom(imgSrcs.length)
    var loc2 = getRandom(imgSrcs.length)
    var temp = imgSrcs[loc1]
    imgSrcs[loc1] = imgSrcs[loc2]
    imgSrcs[loc2]=temp
}

for (let idx = 0; idx < 24; idx++) {
    var img = new Image();

    img.addEventListener("load", function(){
        imgRate[idx]=Number(this.naturalWidth)/Number(this.naturalHeight)
        console.log( this.naturalWidth,this.naturalHeight );
    });
    img.src= imgSrcs[idx]

}

seed = 0

function drawchachacha() {
    // var imgTemp = document.createElement("img")
    // imgTemp.id = "tempImg"
    //     //imgTemp.src = imgSrcs[0];
    // imgTemp.style.visibility = "hidden"
    // mainDiv.appendChild(imgTemp)
    //     //alert(document.getElementById("tempImg").clientHeight)
    //     //imgTemp.src = imgSrcs[1];
    //     //alert(document.getElementById("tempImg").clientHeight)


    var countTemp = 10
    while (true) {
        if (countTemp == 0)
        {
            break
        }
        countTemp--
        var terminate = true
        for (let idx = 0; idx < 2 * numberOfTiles; idx++) {
            tilePictureID[idx]=-1
            cardPictureID[idx]=-1
        }

        for (let idx = 0; idx < numberOfTiles; idx++) {
            var loc = getRandom(2 * numberOfTiles)
            while (tilePictureID[loc] >= 0) {
                loc = getRandom(2 * numberOfTiles)
            }
            tilePictureID[loc] = idx

            loc = getRandom(2 * numberOfTiles)
            while (tilePictureID[loc] >= 0) {
                loc = getRandom(2 * numberOfTiles)
            }
            tilePictureID[loc] = idx

            loc = getRandom(numberOfTiles)
            while (cardPictureID[loc] >= 0) {
                loc = getRandom(numberOfTiles)
            }
            cardPictureID[loc] = idx
        }
        if (tilePictureID[0]==tilePictureID[2 * numberOfTiles-1])
        {
            terminate=false
        }
        for (let idx = 0; idx < 2 * numberOfTiles-1; idx++) {
            if (tilePictureID[idx]==tilePictureID[idx+1])
            {
                terminate=false
                break
            }
        }
        if (terminate == true) {
            break
        }

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
        btnTile.style.backgroundImage = "url('" + imgSrcs[tilePictureID[idx]] + "')"
        btnTile.style.backgroundSize = realTileWidth * imgRate[tilePictureID[idx]] + "vw " + realTileHeight + "vh"
        if (imgRate[tilePictureID[idx]]<1)
        {
            btnTile.style.backgroundSize = realTileWidth  + "vw " + realTileHeight/ imgRate[tilePictureID[idx]] + "vh"
        }
        btnTile.style.backgroundPosition = "50% 50%"
        btnTile.style.visibility = "hidden"
        if (pageWidth > pageHeight) {
            btnTile.style.boxShadow = "0.5vw 0.5vw black"
        } else {
            btnTile.style.boxShadow = "0.5vh 0.5vh black"
        }
        funcMove("btnTile" + idx, arrLocationLeft[idx], arrLocationTop[idx], 0.5)
            //btnTile.innerHTML = tilePictureID[idx]
        btnTile.style.transform = "rotate(" + getRandom(11, -10) + "deg)"
        if (arrLocationTop[idx] + realTileHeight > topBound) {
            topBound = arrLocationTop[idx] + realTileHeight
        }
    }

    for (let idx = 0; idx < numOfY; idx++) {
        arrLocationLeft[idx + numOfX] = getRandom(2, -1) + 97.5 - realTileWidth
        arrLocationTop[idx + numOfX] = getRandom(2, -1) + 2.5 + idx * (tileHeight + 1)

        var btnTile = appendElementVP("button", "btnTile" + (idx + numOfX), "cards", arrLocationLeft[numOfX], arrLocationTop[numOfX], realTileWidth, realTileHeight, 0.8 * realTileHeight)
        btnTile.style.visibility = "hidden"
        if (pageWidth > pageHeight) {
            btnTile.style.boxShadow = "0.5vw 0.5vw black"
        } else {
            btnTile.style.boxShadow = "0.5vh 0.5vh black"
        }

        btnTile.style.backgroundImage = "url('" + imgSrcs[tilePictureID[idx + numOfX]] + "')"
        btnTile.style.backgroundSize = realTileWidth * imgRate[tilePictureID[idx + numOfX]] + "vw " + realTileHeight + "vh"
        if (imgRate[tilePictureID[idx + numOfX]]<1)
        {
            btnTile.style.backgroundSize = realTileWidth  + "vw " + realTileHeight/ imgRate[tilePictureID[idx + numOfX]] + "vh"
        }
        btnTile.style.backgroundPosition = "50% 50%"



        setTimeout(function() {
                funcMove("btnTile" + (idx + numOfX), arrLocationLeft[idx + numOfX], arrLocationTop[idx + numOfX], 0.5)
            }, 750)
            // btnTile.innerHTML = tilePictureID[(idx + numOfX)]
        btnTile.style.transform = "rotate(" + getRandom(11, -10) + "deg)"
        if (arrLocationLeft[idx + numOfX] < rightBound) {
            rightBound = arrLocationLeft[idx + numOfX]
        }
    }

    for (let idx = 0; idx < numOfX; idx++) {
        arrLocationLeft[idx + numOfX + numOfY] = getRandom(2, -1) + 97.5 - realTileWidth - idx * (tileWidth + 1)
        arrLocationTop[idx + numOfX + numOfY] = getRandom(2, -1) + 97.5 - realTileHeight



        var btnTile = appendElementVP("button", "btnTile" + (idx + numOfX + numOfY), "cards", arrLocationLeft[numOfX + numOfY], arrLocationTop[numOfX + numOfY], realTileWidth, realTileHeight, 0.8 * realTileHeight)
        btnTile.style.visibility = "hidden"
        if (pageWidth > pageHeight) {
            btnTile.style.boxShadow = "0.5vw 0.5vw black"
        } else {
            btnTile.style.boxShadow = "0.5vh 0.5vh black"
        }

        btnTile.style.backgroundImage = "url('" + imgSrcs[tilePictureID[idx + numOfX + numOfY]] + "')"
        btnTile.style.backgroundSize = realTileWidth * imgRate[tilePictureID[idx + numOfX + numOfY]] + "vw " + realTileHeight + "vh"
        if (imgRate[tilePictureID[idx + numOfX + numOfY]]<1)
        {
            btnTile.style.backgroundSize = realTileWidth  + "vw " + realTileHeight/ imgRate[tilePictureID[idx + numOfX + numOfY]] + "vh"
        }
        btnTile.style.backgroundPosition = "50% 50%"

        setTimeout(function() {
                funcMove("btnTile" + (idx + numOfX + numOfY), arrLocationLeft[idx + numOfX + numOfY], arrLocationTop[idx + numOfX + numOfY], 0.5)
            }, 1000)
            //btnTile.innerHTML = tilePictureID[(idx + numOfX + numOfY)]
        btnTile.style.transform = "rotate(" + getRandom(11, -10) + "deg)"
        if (arrLocationTop[idx + numOfX + numOfY] < bottomBound) {
            bottomBound = arrLocationTop[idx + numOfX + numOfY]
        }
    }

    for (let idx = 0; idx < numOfY; idx++) {
        arrLocationLeft[idx + numOfX + numOfX + numOfY] = getRandom(2, -1) + 2.5
        arrLocationTop[idx + numOfX + numOfX + numOfY] = getRandom(2, -1) + 97.5 - realTileHeight - idx * (tileHeight + 1)


        var btnTile = appendElementVP("button", "btnTile" + (idx + numOfX + numOfX + numOfY), "cards", arrLocationLeft[numOfX + numOfX + numOfY], arrLocationTop[numOfX + numOfX + numOfY], realTileWidth, realTileHeight, 0.8 * realTileHeight)
        btnTile.style.visibility = "hidden"
        if (pageWidth > pageHeight) {
            btnTile.style.boxShadow = "0.5vw 0.5vw black"
        } else {
            btnTile.style.boxShadow = "0.5vh 0.5vh black"
        }

        btnTile.style.backgroundImage = "url('" + imgSrcs[tilePictureID[idx + numOfX + numOfX + numOfY]] + "')"
        btnTile.style.backgroundSize = realTileWidth * imgRate[tilePictureID[idx + numOfX + numOfX + numOfY]] + "vw " + realTileHeight + "vh"
        if (imgRate[tilePictureID[idx + numOfX + numOfX + numOfY]]<1)
        {
            btnTile.style.backgroundSize = realTileWidth  + "vw " + realTileHeight/ imgRate[tilePictureID[idx + numOfX + numOfX + numOfY]] + "vh"
        }
        btnTile.style.backgroundPosition = "50% 50%"


        setTimeout(function() {
            funcMove("btnTile" + (idx + numOfX + numOfX + numOfY), arrLocationLeft[idx + numOfX + numOfX + numOfY], arrLocationTop[idx + numOfX + numOfX + numOfY], 0.5)
        }, 1250)

        // btnTile.innerHTML = tilePictureID[(idx + numOfX + numOfX + numOfY)]
        btnTile.style.transform = "rotate(" + getRandom(11, -10) + "deg)"
        if (arrLocationLeft[idx + numOfX + numOfX + numOfY] + realTileWidth > leftBound) {
            leftBound = arrLocationLeft[idx + numOfX + numOfX + numOfY] + realTileWidth
        }
    }

    setTimeout(function() {
        for (let idx = 0; idx < numberOfPlayer; idx++) {
            if (idx == 0) {
                playerLoc[0] = getRandom(2 * numberOfTiles)
            } else {
                playerLoc[idx] = (playerLoc[idx - 1] + Math.floor(2 * numberOfTiles / numberOfPlayer)) % (2 * numberOfTiles)
            }
            var btnPlayer = appendElementVP("button", "btnPlayer" + idx, "cards", arrLocationLeft[playerLoc[idx]] + realTileWidth / 4, arrLocationTop[playerLoc[idx]] + realTileHeight / 4, realTileWidth / 2, realTileHeight / 2, 0.8 * realTileHeight)
            btnPlayer.style.borderRadius = "100%"
            btnPlayer.style.border = "0px"
            btnPlayer.style.backgroundColor = playerColor[idx]
            btnPlayer.style.opacity = 0.5
        }
    }, 2000)

    setInterval(function() {
        var btnPlayer = document.getElementById("btnPlayer" + currentPlayer)
        if (btnPlayer == null) {
            return
        }
        if (btnPlayer.style.opacity == 0.5) {
            btnPlayer.style.opacity = 1.0
        } else {
            btnPlayer.style.opacity = 0.5
        }
    }, 500)

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
        var btnCards = appendElementVP("button", "btnCard" + idx, "cards", 50 - cardWidth / 2, 50 - cardHeight / 2, cardWidth, cardHeight, 0.4 * cardHeight)
            //  btnCards.innerHTML = cardPictureID[idx]
        btnCards.style.transform = "rotate(" + getRandom(31, -30) + "deg)"
        btnCards.style.visibility = "hidden"
        btnCards.style.backgroundImage = "url('" + imgBG + "')"
        btnCards.style.backgroundSize = btnCards.style.width + " " + btnCards.style.height
        btnCards.style.border = "0.1vw solid black"
        if (pageWidth > pageHeight) {
            btnCards.style.boxShadow = "0.1vw 0.1vw gray"
        } else {
            btnCards.style.boxShadow = "0.1vh 0.1vh gray"
        }
        btnCards.onclick = function() {
            funcClickCard(idx)
        }

        setTimeout(function() {
            funcMove("btnCard" + idx, storedWidth[idx], storedHeight[idx], 0.5)
        }, 1500)
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

var arrMove = new Array()

function funcClickCard(idx) {

    var btnCards = document.getElementById("btnCard" + idx)
    btnCards.style.backgroundImage = "url('" + imgSrcs[cardPictureID[idx]] + "')"
    var btnWidth = Number(btnCards.style.width.substr(0, btnCards.style.width.length - 2))
    var btnHeight = Number(btnCards.style.height.substr(0, btnCards.style.height.length - 2))
    btnCards.style.backgroundSize = btnWidth * imgRate[cardPictureID[idx]] + "vw " + btnHeight + "vh"
    if (imgRate[cardPictureID[idx]]<1)
    {
        btnCards.style.backgroundSize = btnWidth + "vw " + btnHeight/imgRate[cardPictureID[idx]] + "vh"
    }
    btnCards.style.backgroundPosition = "50% 50%"
    setTimeout(function() {
        var btnCards = document.getElementById("btnCard" + idx)
        var btnWidth = Number(btnCards.style.width.substr(0, btnCards.style.width.length - 2))
        var btnHeight = Number(btnCards.style.height.substr(0, btnCards.style.height.length - 2))
        btnCards.style.backgroundImage = "url('" + imgBG + "')"
        btnCards.style.backgroundSize = btnWidth + "vw " + btnHeight + "vh"
    }, 2000)

    var targetLoc = playerLoc[currentPlayer] + 1
    if (targetLoc == 2 * numberOfTiles) {
        targetLoc = 0
    }
    while (true) {
        var contained = false
        for (let idx2 = 0; idx2 < numberOfPlayer; idx2++) {
            if (idx2 == currentPlayer) {
                continue
            }
            if (targetLoc == playerLoc[idx2]) {
                contained = true
                break
            }
        }
        if (contained == false) {
            break
        } else {
            targetLoc++
            if (targetLoc == 2 * numberOfTiles) {
                targetLoc = 0
            }
        }
    }
    if (cardPictureID[idx] == tilePictureID[targetLoc]) {
        console.log("correct")
        playerLoc[currentPlayer] = targetLoc

        funcMove("btnPlayer" + currentPlayer, arrLocationLeft[playerLoc[currentPlayer]] + realTileWidth / 4, arrLocationTop[playerLoc[currentPlayer]] + realTileHeight / 4, 0.25)
    } else {
        console.log("wrong")
        currentPlayer++
        if (currentPlayer == numberOfPlayer) {
            currentPlayer = 0
        }
    }
}

function funcMove(objectID, targetLeft, targetTop, sec) {
    arrMove[objectID] = 50
    var movedObject = document.getElementById(objectID)
    movedObject.style.visibility = "visible"
    var curLeft = Number(movedObject.style.left.substr(0, movedObject.style.left.length - 2))
    var curTop = Number(movedObject.style.top.substr(0, movedObject.style.top.length - 2))

    var modLeft = (targetLeft - curLeft) / 50
    var modTop = (targetTop - curTop) / 50
    count = 50
    var itvThis = setInterval(function() {
        funcIntervalMove(objectID, modLeft, modTop, itvThis)
    }, 1000 * sec / 50)

}

function funcIntervalMove(objectID, modLeft, modTop, itvThis) {
    var thisElement = document.getElementById(objectID)
    var curLeft = Number(thisElement.style.left.substr(0, thisElement.style.left.length - 2))
    var curTop = Number(thisElement.style.top.substr(0, thisElement.style.top.length - 2))
    thisElement.style.left = curLeft + modLeft + "vw"
    thisElement.style.top = curTop + modTop + "vh"
    if (arrMove[objectID] == 0) {
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

function funcStart()
{
    var getAnswer=prompt("플레이어 수를 입력해 주세요. (2-4명)")
    while (true)
    {
        if (getAnswer==null)
        {
            return
        }
        if (Number(getAnswer)>=2 && Number(getAnswer)<=4)
        {
            break
        }
        getAnswer=prompt("플레이어 수를 입력해 주세요. (2-4명)")
    }
    numberOfPlayer = Number(getAnswer)
    
    getAnswer=prompt("타일 수를 입력해 주세요. (8-24개)")
    while (true)
    {
        if (getAnswer==null)
        {
            return
        }
        if (Number(getAnswer)>=8 && Number(getAnswer)<=24)
        {
            break
        }
        getAnswer=prompt("타일 수를 입력해 주세요. (8-24개)")
    }
    numberOfTiles = Number(getAnswer)
    
    while (mainDiv.childNodes.length>0)
    {
        mainDiv.removeChild(mainDiv.childNodes[0])
    }

    
    document.documentElement.requestFullscreen();

    setTimeout(function(){
        pageHeight = mainDiv.clientHeight
        pageWidth = mainDiv.clientWidth
    },50)
    setTimeout(function(){drawchachacha()},500)
}

//drawchachacha()