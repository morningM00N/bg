
funcWidthPerHeight((711 + 454 * 711 / 638) / 711)

funcUpdatePageSize(true)

funcPrepareGetLocation()

function funcDrawX(funcCheck) {
    if (funcCheck != null && funcCheck(event.srcElement) == false) {
        return
    }
    if (event.srcElement.innerHTML == "X") {
        event.srcElement.innerHTML = ""
    }
    else {
        event.srcElement.innerHTML = "X"
    }
}

function funcDrawCircle() {
    if (event.srcElement.style.border != "0px") {
        event.srcElement.style.border  = "0px"
    }
    else {
        event.srcElement.style.border = 0.0025*pageWidth +"px dashed black"
    }
}


var varSelectedBuild = "" // 현재 선택한 건물
var arrShape = new Array() 
/* 
arrShapre["0_0"][0]=new Array(0,1,1)
arrShapre["0_0"][1]=new Array(0,0,1)
(0,0) (1,0) (1,1) (row, column) 니은모양
 */

function funcSelectBuild(idx, idx2)
{
    console.log("funcSelectBuildCall",idx,idx2)
    if (varSelectedBuild.length>0)
    {
        document.getElementById("btnVillage"+varSelectedBuild).style.backgroundColor="transparent"
    }

    if (varSelectedBuild==""+idx+"_"+idx2)
    {   
        varSelectedBuild=""
    }
    else{
        varSelectedBuild=""+idx+"_"+idx2
        let btnBuild = document.getElementById("btnVillage"+idx+"_"+idx2)
        btnBuild.style.backgroundColor="black"
        btnBuild.style.opacity=0.1
    }
    
}

let arrCons = new Array()
for (let idx = 0; idx < 4; idx++) {
    arrCons[idx]=new Array()
}

function funcConsClick(idx, idx2)
{
    console.log("funcConcClick", idx, idx2)
    let btnClicked = document.getElementById("btnCons" + idx + "_" + idx2)

    if (btnClicked.innerHTML == "X") {
        if (idx==2)
        {
            if (idx2>=13)
            {
                idx2-=7
            }
            else{
            idx2-=1
            idx2 = Math.floor(idx2/2)
            }
        }
        if (idx2<0){
            idx2=0
        }
        btnClicked.innerHTML = ""

        console.log(idx2)
        arrCons[idx][idx2] = false

    }
    else {
        if (idx==2)
        {
            if (idx2>=13)
            {
                idx2-=7
            }
            else{
            idx2-=1
            idx2 = Math.floor(idx2/2)
            }
        }
        if (idx2<0){
            idx2=0
        }
        btnClicked.innerHTML = "X"

        console.log(idx2)
        if (idx!=2)
        {
            arrCons[idx][idx2] = true
        }
        else{
            if (document.getElementById("btnCons2" + "_" + (idx2*2+1)).innerHTML=="X" &&
            document.getElementById("btnCons2" + "_" + (idx2*2+2)).innerHTML=="X"
            )
            {
                if (idx2>0 || document.getElementById("btnCons2_0").innerHTML=="X")
                {
                arrCons[idx][idx2] = true
                }
            }
        }

    }

    

}

let arrModAbilities = new Array()
arrModAbilities["0_0"]=0
arrModAbilities["0_1"]=0
arrModAbilities["1_0"]=0
arrModAbilities["1_1"]=0
arrModAbilities["2_0"]=0
arrModAbilities["2_1"]=0

function funcBuildSettlement(idx, idx2)
{
    console.log("funcBuildSettlement",idx,idx2)

    if (varSelectedBuild=="")
    {
        document.getElementById("btnBoxes"+idx+"_"+idx2).style.backgroundColor="transparent"
        return
    }
    let passCondition = true
    for (let iidx = 0; iidx < arrShape[varSelectedBuild][0].length; iidx++) {
        let idxRow = idx + arrShape[varSelectedBuild][0][iidx]
        let idxCol = idx2 + arrShape[varSelectedBuild][1][iidx]
        if (idxRow>=4 || idxCol>=9)
        {
            passCondition=false
            break
        }
        console.log(idxRow, idxCol)
        let btnBoxes = document.getElementById("btnBoxes"+idxRow+"_"+idxCol)
        if (arrCons[idxRow][idxCol]!=true||btnBoxes.style.backgroundColor=="black")
        {
            passCondition=false
            break
        }
    }
    if (passCondition==true)
    {
        for (let iidx = 0; iidx < arrShape[varSelectedBuild][0].length; iidx++) {
            let idxRow = idx + arrShape[varSelectedBuild][0][iidx]
            let idxCol = idx2 + arrShape[varSelectedBuild][1][iidx]
            console.log(idxRow, idxCol)
            document.getElementById("btnBoxes"+idxRow+"_"+idxCol).style.backgroundColor="black"
            document.getElementById("btnBoxes"+idxRow+"_"+idxCol).style.opacity=0.2
            
        }

        let btnModVal = document.getElementById("btnModAbility" + varSelectedBuild)
        if (arrModAbilities[varSelectedBuild] == null) {
            arrModAbilities[varSelectedBuild] = 1
        }
        else {
            arrModAbilities[varSelectedBuild]++
        }
        btnModVal.innerHTML = "+" + arrModAbilities[varSelectedBuild]
    }
}
function fuctDrawImpSetDice() {
    funcInsertElement("imgImp", "img", "null", 0, 0, 711 / (711 + 454 * 711 / 638), 0.5, 1).src = "img/settlerdice/empire.jpg"
    funcInsertElement("imgVil", "img", "null", 711 / (711 + 454 * 711 / 638), 0, 1, 0, 454 / 638).src = "img/settlerdice/village_default.jpg"



    // draw village section
    {

        /* 
arrShapre["0_0"][0]=new Array(0,1,1)
arrShapre["0_0"][1]=new Array(0,0,1)
(0,0) (1,0) (1,1) (row, column) 니은모양
 */
        arrShape["0_0"]=new Array()
        arrShape["0_1"]=new Array()
        arrShape["1_0"]=new Array()
        arrShape["1_1"]=new Array()
        arrShape["2_0"]=new Array()

        arrShape["0_0"][0]=new Array(0,1,1)
        arrShape["0_0"][1]=new Array(0,0,1)
        
        arrShape["0_1"][0]=new Array(0,0,0,1)
        arrShape["0_1"][1]=new Array(0,1,2,0)
        
        arrShape["1_0"][0]=new Array(0,1,2,1)
        arrShape["1_0"][1]=new Array(0,0,0,1)
        
        arrShape["1_1"][0]=new Array(0,1,2)
        arrShape["1_1"][1]=new Array(0,0,0)
        
        arrShape["2_0"][0]=new Array(0,1,2,2)
        arrShape["2_0"][1]=new Array(0,0,0,1)
        
        let topTic = 0.33
        let leftTic = 0.20
        let arrBox = new Array(0.6141, 0.0398, 0.7832, 0.3225)
        for (let idx = 0; idx < 3; idx++) {
            for (let idx2 = 0; idx2 < 2; idx2++) {

                if (idx == 2 && idx2 == 1) {
                    continue
                }
                funcInsertElement("btnVillage" + idx + "_" + idx2, "button", "btnTrans",
                    arrBox[0] + idx2 * leftTic,
                    arrBox[1] + idx * topTic,
                    arrBox[2] + idx2 * leftTic,
                    arrBox[3] + idx * topTic
                ).onclick = function () {
                    funcSelectBuild(idx, idx2)
                }

                let arrBox2 = new Array(
                    0.6008, 0.0739, 0.6241, 0.1138
                )
                let topTicTemp = 0.051
                for (let idx3 = 0; idx3 < 3; idx3++) {
                    funcInsertElement("btnVillageBtn" + idx + "_" + idx2 + "_" + idx3, "button", "btnTrans",
                        arrBox2[0] + idx2 * leftTic,
                        arrBox2[1] + idx * topTic + idx3 * topTicTemp,
                        arrBox2[2] + idx2 * leftTic,
                        arrBox2[3] + idx * topTic + idx3 * topTicTemp
                    ).onclick = function () {
                        funcDrawX()
                    }

                }
                
                let arrBox3=new Array(0.7566, 0.2785, 0.7781, 0.3114)
                funcInsertElement("btnModAbility" + idx + "_" + idx2, "button", "btnTrans",
                arrBox3[0] + idx2 * leftTic,
                arrBox3[1] + idx * topTic,
                arrBox3[2] + idx2 * leftTic,
                arrBox3[3] + idx * topTic
                ).onclick= function(){

                    if (document.fullscreenElement) {
                        document.exitFullscreen()
                    } 
                    if (arrModAbilities[idx+"_"+idx2]==0)
                    {
                        return
                    }
                    if (confirm("취소하시겠습니까?")!=true)
                    {
                        return
                    }
                    if (arrModAbilities[idx+"_"+idx2]>0)
                    {
                        arrModAbilities[idx+"_"+idx2]--
                        event.srcElement.innerHTML="+"+arrModAbilities[idx+"_"+idx2]
                    }
                    else{
                        event.srcElement.innerHTML=""
                    }

                    console.log(arrModAbilities)
                }
               
                
                
            }

        }

        let arrBox4=new Array(0.8230, 0.9164, 0.8395, 0.9432)
        leftTic = 0.055
        topTic = 0.035     
        for (let idx = 0; idx < 2; idx++) {
            for (let idx2 = 0; idx2 < 3; idx2++) {
                funcInsertElement("btnScore3_2" + idx + "_" + idx2, "button", "btnTrans",
                arrBox4[0] + idx2 * leftTic,
                arrBox4[1] + idx * topTic,
                arrBox4[2] + idx2 * leftTic,
                arrBox4[3] + idx * topTic
        ).onclick = function(){
            funcDrawX(null)
        }
        }

        }
    }

    // draw empire section

    funcInsertFullScreenButton(
        0.2260, 0.9182, 0.2771, 0.9770, 29 / 20
    )

    funcInsertElement("btnBridge0", "button", "btnCircle",
    0.0848, 0.4584, 0.1277, 0.5184
    )
    .onclick=funcDrawCircle

    funcInsertElement("btnBridge1", "button", "btnCircle",
    0.3063, 0.5706, 0.3469, 0.6286
    )
    .onclick=funcDrawCircle
    funcInsertElement("btnBridge2", "button", "btnCircle",
    0.2238, 0.7427, 0.2735, 0.7988
    )
    .onclick=funcDrawCircle
    funcInsertElement("btnBridge3", "button", "btnCircle",
    0.2328, 0.8104, 0.2859, 0.8743
    )
    .onclick=funcDrawCircle

    let topTic = 0.07

    for (let idx = 0; idx < 5; idx++) {
        funcInsertElement("txtExtraScore"+idx , "input", "btnTrans",
        0.5385, 0.51+topTic*idx, 0.5719, 0.565+topTic*idx
    )
    
        
    }
    topTic = 0.0964

    for (let idx = 0; idx < 10; idx++) {
        funcInsertElement("btnRound" + idx, "button", "btnTrans",
            0.0177, 0.0398 + topTic * idx, 0.0490, 0.099 + topTic * idx
        ).onclick = function () { funcDrawX() }
    }

    {
        let arrloc = new Array()
        arrloc[0] = new Array(0.1360, 0.4577)
        arrloc[2] = new Array(0.2085, 0.5067)
        arrloc[3] = new Array(0.2640, 0.5480)
        arrloc[4] = new Array(0.3336, 0.4605)
        arrloc[5] = new Array(0.4245, 0.4701)
        arrloc[6] = new Array(0.1418, 0.6273)
        arrloc[7] = new Array(0.2180, 0.6339)
        arrloc[8] = new Array(0.2340, 0.6974)
        arrloc[9] = new Array(0.2941, 0.7091)
        arrloc[10] = new Array(0.3288, 0.6241)
        arrloc[11] = new Array(0.4503, 0.7091)
        arrloc[12] = new Array(0.0799, 0.7649)
        arrloc[13] = new Array(0.0802, 0.8709)
        arrloc[14] = new Array(0.1880, 0.7784)
        arrloc[15] = new Array(0.2893, 0.9229)
        arrloc[16] = new Array(0.3717, 0.9125)
        arrloc[17] = new Array(0.3726, 0.7746)
        arrloc[1] = new Array(0.4505, 0.7858)

        for (let idx = 0; idx < 18; idx++) {
            funcInsertElementWithSize("btnItem" + idx, "button", "btnCircle",
                arrloc[idx][0], arrloc[idx][1],
                0.1610 - 0.1345, 0.5010 - 0.454
            ).onclick = function () { funcDrawX() }
        }
    }

    {
        let topTic = 0.1269 - 0.0398
        let leftTic = 0.1162 - 0.0653
        let arrBox = new Array(0.0653, 0.0398, 0.1170, 0.1269)
        for (let idx = 0; idx < 4; idx++) {
            for (let idx2 = 0; idx2 < 9; idx2++) {
                funcInsertElement("btnBoxes" + idx + "_" + idx2, "button", "btnTrans",
                    arrBox[0] + idx2 * leftTic,
                    arrBox[1] + idx * topTic,
                    arrBox[2] + idx2 * leftTic,
                    arrBox[3] + idx * topTic
                ).onclick = function(){
                    funcBuildSettlement(idx,idx2)
                }

            }

        }
    }

    {
        let topTic = 0.088
        let leftTic = 0.05117
        let arrBox = new Array(0.0811, 0.0443, 0.1013, 0.0886)
        for (let idx = 0; idx < 4; idx++) {
            for (let idx2 = 0; idx2 < 9; idx2++) {
                let idxTemp = idx2
                if (idx == 2 && idx2 < 6) {
                    continue
                }
                if (idx == 2) {
                    idxTemp += 7
                }
                funcInsertElement("btnCons" + idx + "_" + idxTemp, "button", "btnTrans",
                    arrBox[0] + idx2 * leftTic,
                    arrBox[1] + idx * topTic,
                    arrBox[2] + idx2 * leftTic,
                    arrBox[3] + idx * topTic
                ).onclick=function(){
                    funcConsClick(idx,idxTemp)
                }

            }

        }
    }
    {
        leftTic = 0.05117
        
        let leftSmall = 0.020
        for (let idx = 0; idx < 5; idx++) {
            let idxDel = 3+idx*2

            let btnTemp = funcInsertElement("btnCons2" + "_" + idxDel, "button", "btnTrans",
                0.1250 + idx * leftTic, 0.2330, 0.1405 + idx * leftTic, 0.2576)
                
            btnTemp.onclick = function () {
                funcConsClick(2, idxDel)
            }
            let idxDel2 = 3+idx*2+1

            funcInsertElement("btnCons2" + "_" + idxDel2, "button", "btnTrans",
                0.1250 + idx * leftTic + leftSmall, 0.2330, 0.1405 + idx * leftTic + leftSmall, 0.2576)
                .onclick = function () {
                    funcConsClick(2, idxDel2)
                }
            

        }

        
        funcInsertElementWithSize("btnCons2_0", "button", "btnTrans",
        0.0775, 0.2197,
            0.1405 - 0.1250, 0.2576 - 0.2330
        )
        .onclick=function(){
            funcConsClick(2,0)
        }

            
        funcInsertElementWithSize("btnCons2_1", "button", "btnTrans",
        0.0941, 0.2197,
        0.1405 - 0.1250, 0.2576 - 0.2330
    )
    .onclick=function(){
        funcConsClick(2,1)
    }

        funcInsertElementWithSize("btnCons2_2", "button", "btnTrans",
            0.0852, 0.2461,
            0.1405 - 0.1250, 0.2576 - 0.2330
        )
        .onclick=function(){
            funcConsClick(2,2)
        }
    }
    {
        let topTic = 0.090
        let leftTic = 0.0
        let arrBox = new Array(0.5389, 0.0492, 0.5721, 0.1061)
        for (let idx = 0; idx < 5; idx++) {
            if (idx == 4)
            {
                topTic +=0.0015
            }
            funcInsertElement("btnScore" + idx, "button", "btnTrans",
                arrBox[0] + idx * leftTic,
                arrBox[1] + idx * topTic,
                arrBox[2] + idx * leftTic,
                arrBox[3] + idx * topTic
            )
          //  .innerHTML = "X"
        }

    }

    funcInsertElement("inputTitle", "input", "txtKorean",
    0.4382, 0.8864, 0.5245, 0.9754
    ).style.fontSize=0.05*pageHeight+"px"

    let btnCal = funcInsertElement("btnCalScore", "button", "btnTrans",
    0.5280, 0.8864, 0.5830, 0.9754
    )
    btnCal.onclick = funcCalScore
    btnCal.style.fontSize = 0.05*pageHeight+"px"

    

}

function funcCalScore(){
    console.log("funcCalScore")
    let score = 0

    let arrScore=new Array()
    arrScore[0]=new Array(0,1,2,3,5,8,11,15,19,23)
    arrScore[1]=new Array(0,2,4,6,8,10,12,14,16,18)
    arrScore[2]=new Array(0,1,2,4,6,8,11,14,17,21)
    arrScore[3]=new Array(0,1,2,3,4,5,6,7,8,9)

    for (let idx = 0; idx < 4; idx++) {
        let idx2 = 0
        while (arrCons[idx][idx2]==true){
            idx2++
        }
       
        let scoreTempThis = arrScore[idx][idx2]
        document.getElementById("btnScore"+idx).innerHTML=scoreTempThis
        score+=scoreTempThis
        console.log(idx,idx2)
        
    }
    let scoreTempThis = 8*Number(arrModAbilities["2_0"])
    document.getElementById("btnScore4").innerHTML=scoreTempThis
    score+=scoreTempThis

    for (let idx = 0; idx < 5; idx++) {
        score+=Number((document.getElementById("txtExtraScore"+idx).value||0))
    }
    

    event.srcElement.innerHTML=score
}

function funcInsertElementWithSize(_id, _type, _class, leftTopX, leftTopY,
    width, height) { // _fixedRatio = width / height

    return funcInsertElement(_id, _type, _class, leftTopX, leftTopY,
        leftTopX + width, leftTopY + height)
}
fuctDrawImpSetDice()

