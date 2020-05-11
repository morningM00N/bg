funcWidthPerHeight(0)

funcUpdatePageSize(true)
let touchStartLoc
let leftStart
let topStart

let zCount = 1

function addDrag(target) {
    target.addEventListener('touchstart', function(e) {
        // grab the location of touch
        touchLocation = e.targetTouches[0];
        leftStart = parseInt(target.style.left.replace("px", ""))
        topStart = parseInt(target.style.top.replace("px", ""))
        target.style.zIndex = zCount++

            // assign box new coordinates based on the touch.
    })

    target.addEventListener('touchmove', function(e) {
        // grab the location of touch
        //e.preventDefault();

        var thisTouchLocation = e.targetTouches[0];

        // assign box new coordinates based on the touch.
        target.style.left = leftStart + (thisTouchLocation.pageX - touchLocation.pageX) + 'px';
        target.style.top = topStart + (thisTouchLocation.pageY - touchLocation.pageY) + 'px';
    })
}

function funcDrawUnlock() {
    let card = funcInsertElement("card1", "img", null,
        0.1, 0.1, 0.3, 0.3)

    card.style.backgroundColor = "blue"


    let car2 = funcInsertElement("card2", "img", null,
        0.1, 0.6, 0.3, 0.8)

    card2.style.backgroundColor = "red"


    addDrag(card)

    addDrag(card2)










}


$(window).resize(function() {
    funcUpdatePageSize(true)
    funcDrawUnlock()
});

funcDrawUnlock()
    //funcPrepareGetLocation()
