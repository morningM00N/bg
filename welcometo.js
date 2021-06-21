funcWidthPerHeight(0)


var cardSetNumbers = []
cardSetNumbers[0] = [1,2,4,5,5,6,7,7,8,8,9,9,10,11,11,12,14,15]
cardSetNumbers[1] = [1,2,3,5,5,6,6,7,8,8,9,10,10,11,11,13,14,15]
cardSetNumbers[2] = [3,4,6,7,8,9,10,12,13]
var cardTypes = []
cardTypes[0] = ['L','E']
cardTypes[1] = ['F']
cardTypes[2] = ['P','B','A']
var cardArr = new Array()

for (let idx = 0; idx < 3; idx++) {
    for (let idx2 = 0; idx2 < cardTypes[idx].length; idx2++) {
        for (let idx3 = 0; idx3 < cardSetNumbers[idx].length; idx3++) {
            cardArr.push(cardTypes[idx][idx2]+cardSetNumbers[idx][idx3])            
        }        
    }
}


remainingCards={} // 남아있는 카드 표시

var curIdx

function funcInitialRemainingCards(){
    remainingCards['P']=remainingCards['A']=remainingCards['B'] = 9
    remainingCards['L']=remainingCards['E']=remainingCards['F'] = 18
    remainingCards[1]=remainingCards[2]=remainingCards[14]=remainingCards[15]=3
    remainingCards[3]=remainingCards[13]=4
    remainingCards[4]=remainingCards[12]=5
    remainingCards[5]=remainingCards[11]=6
    remainingCards[6]=remainingCards[10]=7
    remainingCards[7]=remainingCards[9]=8
    remainingCards[9]=8
    
    funcSortArr(cardArr)
    curIdx = 0
}

funcInitialRemainingCards()

funcUpdatePageSize(true)

function insertElement(){
    var curCards = []
    var nextCards = []
    for (let idx = 0; idx < 3; idx++) {
        curCards[idx]=funcInsertElement(
            "btnCurCards"+idx,
            "button",
            "btnTrans",
            0.1+0.3*idx, 0.20, 0.3+0.3*idx, 0.6, 273 / 416
        )    
        nextCards[idx]=funcInsertElement(
            "btnNextCards"+idx,
            "button",
            "btnTrans",
            0.1+0.3*idx, 0.4, 0.3+0.3*idx, 0.5, 273 / 416
        )    
    }
    
    
}

insertElement()

function funcDraw(){
    
}


$(window).resize(function() {
    funcUpdatePageSize(true)
    funcDraw()
});

funcPrepareGetLocation()