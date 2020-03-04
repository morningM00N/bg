var pageHeight
var pageWidth
var widthPerHeight

var mainDiv = document.getElementById("main")
var mainBody = document.getElementById("body")

function funcWidthPerHeight(_wperh) {
    widthPerHeight = _wperh
}

var mapLocationInfor = new Array()
var nameOfRelocatedElements = new Array()

var seed = Math.floor(Math.random()*100000);


function getRandom(bound)
{
    let x = Math.sin(seed++) * 100000;
    return Math.floor((x - Math.floor(x)) * bound)
}





class ObjectInfor {
    constructor() {
        this.loc = new Array()
        this.size=new Array()
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

function funcInsertElement(_id, _type, _class, leftTopX, leftTopY, rightBottomX, rightBottomY, _fixedRatio) {
    nameOfRelocatedElements.push(_id)
    var newElement = document.getElementById(_id)
    if (newElement==null)
    {
        newElement=document.createElement(_type)
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
    if (_fixedRatio>0)
    {
        newObject.fixedRatio=_fixedRatio
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

    }
    else {
        newObject.setLocPortrait(leftTopX, leftTopY)
        newObject.setSizePortrait(rightBottomX - leftTopX, rightBottomY - leftTopY)
    }
    funcRelocateElement(_id)   
}

function funcRelocateElement(_id) {
    let landIdx = 1
    if (pageWidth< pageHeight == true) {
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
    if (mapLocationInfor[_id].fixedRatio>0)
    {
        newElement.style.fontSize=newElement.style.lineHeight=newElement.style.height=objectWidth * pageWidth*mapLocationInfor[_id].fixedRatio + "px"
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

$(window).resize(function () {
    funcUpdatePageSize(true)
    funcRelocateElements()
});

var arrMove = new Array()

function funcFullScreen()
{
    if (document.fullscreenElement)
    {
        document.exitFullscreen()
    }
    else{
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
    if (targetLeft!=false){
        modLeft=(targetLeft*pageWidth - curLeft) / 50
    }

    var modTop = 0
    if (targetTop != false) {
        modTop = (targetTop * pageHeight - curTop) / 50
    }
    count = 50
    var itvThis = setInterval(function() {
        funcIntervalMove(objectID, modLeft, modTop, itvThis,imgSrc)
    }, 1000 * sec / 50)
    if (targetTop == false)
    {
        targetTop = curTop
    }
    if (targetLeft==false)
    {
        targetLeft=curLeft
    }

    if (pageWidth>pageHeight)
    {
        mapLocationInfor[objectID].setLocLandscape(targetLeft,targetTop)
    }
    else{
        mapLocationInfor[objectID].setLocPortrait(targetLeft,targetTop)
    }
    
}

function funcIntervalMove(objectID, modLeft, modTop, itvThis,imgSrc) {
    var thisElement = document.getElementById(objectID)
    var curLeft = Number(thisElement.style.left.substr(0, thisElement.style.left.length - 2))
    var curTop = Number(thisElement.style.top.substr(0, thisElement.style.top.length - 2))
    thisElement.style.left = curLeft + modLeft + "px"
    thisElement.style.top = curTop + modTop + "px"
    if (arrMove[objectID] == 0) {
        if (imgSrc!=null)
        {
            thisElement.style.backgroundImage=imgSrc
        }
        clearInterval(itvThis)
    }
    arrMove[objectID]--

}

//funcPrepareGetLocation()
