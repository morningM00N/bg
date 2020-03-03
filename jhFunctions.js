var pageHeight = document.documentElement.clientHeight
var pageWidth = document.documentElement.clientWidth

var mainDiv = document.getElementById("main")
var mainBody = document.getElementById("body")

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
    mainBody.style.border = "0 px"
    mainBody.style.margin = "0 px"
    mainBody.style.padding = "0 px"

    mainDiv.style.border = "0 px"
    mainDiv.style.margin = "0 px"
    mainDiv.style.padding = "0 px"

    mainDiv.style.height = pageHeight + "px"
    mainDiv.style.width = pageWidth + "px"

    mainDiv.style.backgroundSize = pageWidth + "px " + pageHeight + "px"
}

function funcUpdatePageSize(isMainDivSizeUpdate) {
    pageHeight = document.documentElement.clientHeight
    pageWidth = document.documentElement.clientWidth

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
    mainDiv.onclick = function(event) {
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

$(window).resize(function() {
    funcRelocateElements()
});



funcPrepareGetLocation()
