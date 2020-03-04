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



class ObjectInfor {
    constructor() {
        this.loc = new Array()
        this.size=new Array()
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

function funcInsertElement(_id, _type, _class, leftTopX, leftTopY, rightBottomX, rightBottomY) {
    nameOfRelocatedElements.push(_id)
    var newElement = document.createElement(_type)
    newElement.id = _id
    newElement.className = _class
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

    mapLocationInfor[_id] = newObject;

    mainDiv.appendChild(newElement)
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

}

function funcRelocateElement(_id, isLand) {
    let landIdx = 1
    if (isLand == true) {
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
    newElement.style.backgroundSize = newElement.style.width + " " + newElement.style.height

}



function funcUpdatePageSize(isMainDivSizeUpdate) {
    pageHeight = document.documentElement.clientHeight
    pageWidth = document.documentElement.clientWidth

    if (pageWidth > pageHeight * widthPerHeight) {
        pageWidth = pageHeight * widthPerHeight
    } else {
        pageHeight = pageWidth / widthPerHeight
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




//funcPrepareGetLocation()
