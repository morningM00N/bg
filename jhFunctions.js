var pageHeight
var pageWidth
var widthPerHeight

var mainDiv = document.getElementById("main")
var mainBody = document.getElementById("body")

function funcWidthPerHeight(_wperh) {
    widthPerHeight = _wperh
}


class ObjectInfor {
    constructor() {
        this.loc = new Array()
    }
    setLocPortrait(left, top) {
        this.loc[0] = new Array(left, top)
    }
    setLocLandscape(left, top) {
        this.loc[1] = new Array(left, top)
    }
    setSize(width, height) {
        this.size = new Array(width, height)
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

function funcUpdatePageSize(isMainDivSizeUpdate) {
    pageHeight = document.documentElement.clientHeight
    pageWidth = document.documentElement.clientWidth

    if (pageWidth > pageHeight * widthPerHeight) {
        pageWidth = pageHeight * widthPerHeight
    }
    else {
        pageHeight = pageWidth / widthPerHeight
    }

    if (isMainDivSizeUpdate == true) {
        mainDiv.style.height = pageHeight + "px"
        mainDiv.style.width = pageWidth + "px"

        mainDiv.style.backgroundSize = pageWidth + "px " + pageHeight + "px"
    }
}


function funcPrepareGetLocation() {
    var temp = document.createElement("input")
    mainBody.appendChild(temp)
    temp.style.position = "absolute"
    temp.style.left = "0px"
    temp.style.top = "0px"
    mainDiv.onclick = function (event) {
        x = event.pageX;
        y = event.pageY;
        temp.value = 'new Array(' + (x / pageWidth).toFixed(4) + ',' + (y / pageHeight).toFixed(4) + ")"
        temp.select();
        temp.setSelectionRange(0, 9999999)
        document.execCommand("copy")
    }
}


function funcRelocateElements() {
    funcUpdatePageSize(true)
}

$(window).resize(function () {
    funcRelocateElements()
});



funcPrepareGetLocation()
