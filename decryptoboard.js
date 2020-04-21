var word_list = new Array();

let wordDupCheck = new Array()

let rawFile = new XMLHttpRequest();
rawFile.open("GET", "wordlist.txt", false);
rawFile.setRequestHeader('Content-Type', 'text/html;charset=utf-8')
rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
            let allText = rawFile.responseText;
            let thisWord = ""
            for (let idx = 0; idx < allText.length; idx++) {
                if (allText[idx] == '\n' ||
                    allText[idx] == '\t' ||
                    allText[idx] == ' ' ||
                    Number(allText[idx]) == 0) {
                    if (thisWord.length > 0) {
                        if (wordDupCheck[thisWord] != 0) {
                            word_list.push(thisWord)
                            wordDupCheck[thisWord] = 0
                        }

                    }
                    thisWord = ""
                } else {
                    thisWord += allText[idx]
                }

            }
            //wordList = allText.split(/\n|\t| /);
        }
    }
}
rawFile.send(null);


var numbers = new Array()
for (let index = 0; index < 4; index++) {
    numbers[index] = Math.floor(Math.random() * (word_list.length));
    for (let index2 = 0; index2 < index; index2++) {
        while (numbers[index] == numbers[index2]) {
            numbers[index]++
                if (numbers[index] == word_list.length) {
                    numbers[index] = 0;
                }
        }
    }

    //    console.log(word_list[numbers[index]])
}


var pageHeight = document.documentElement.clientHeight
var modWidth = pageHeight / 655 * 1755
var pageWidth = document.documentElement.clientWidth

function word_input(idx) {
    var newWord = prompt("변경할 단어를 입력해 주세요.")
    if (newWord == null) {
        return
    }
    var btn = document.getElementById("btn" + idx)
    btn.innerHTML = newWord
}

function word_change(idx) {
    var change = confirm("변경하시겠습니까?")
    if (change != true) {
        return
    }
    var new_number = Math.floor(Math.random() * (word_list.length));
    for (let index = 0; index < numbers.length; index++) {
        while (numbers[index] == new_number) {
            new_number++
            if (new_number == word_list.length) {
                new_number = 0;
            }
        }

    }
    var btn = document.getElementById("btn" + idx)
    btn.innerHTML = word_list[new_number]

}

funcWidthPerHeight(0)

funcUpdatePageSize(true)



$(window).resize(function() {
    funcUpdatePageSize(true)
    funcDrawDecrypto()
});

//funcPrepareGetLocation()

function funcDrawDecrypto() {
    if (pageWidth < pageHeight) {
        var main = document.getElementById("main")
        main.style.backgroundImage = 'url("")'
        for (let idx = 0; idx < main.childElementCount; idx++) {
            main.children[idx].style.display = "none"
        }

        let pText = document.getElementById("pText")
        if (pText == null) {
            pText = document.createElement("p")
            pText.id = "pText"
            pText.innerHTML = "가로 모드로 변경 후 새로고침 해주세요."
            pText.style.color = "black"
            pText.style.fontFamily = "'Stylish', sans-serif"
            pText.style.margin = "50px"
            pText.style.fontSize = "50px"
            pText.style.position = "absolute"
            pText.style.left = "50px"
            pText.style.top = "50px"
            main.appendChild(pText)
        }
        pText.style.display = "inline"

    } else {

        var maindiv = document.getElementById("main")
        var main = maindiv

        for (let idx = 0; idx < main.childElementCount; idx++) {
            main.children[idx].style.display = "inline"
        }
        let pText = document.getElementById("pText")
        if (pText != null) {
            pText.style.display = "none"
        }
        var maindiv = document.getElementById("main")

        main.style.backgroundImage = 'url("img/decrypto.png")'

        let fullscreenButton = funcInsertElement(
            "btnFull", "button", null,
            0.9530, 0.8508, 0.9896, 0.9424
        )
        fullscreenButton.style.backgroundColor = "transparent"
        fullscreenButton.style.border = "0px"
        fullscreenButton.onclick = funcFullScreen


        var mainbody = document.getElementById("body")

        maindiv.style.backgroundSize = pageWidth + "px " + pageHeight + "px"
        maindiv.style.height = pageHeight + "px"
        maindiv.style.width = pageWidth + "px"
        mainbody.style.height = pageHeight + "px"
        mainbody.style.width = pageWidth + "px"

        console.log(pageHeight + "," + pageWidth)

        var leftStart = 80
        var leftTic = 227
        var topStart = 50

        //var topStart =65

        var widthScale = 185
        var heightScale = 128
        var fontScale = 50
        for (let idx = 0; idx < 4; idx++) {
            var btn = document.getElementById("btn" + idx)

            btn.style.left = leftStart / 1024 * pageWidth + "px"
            btn.style.top = topStart / 382 * pageHeight + "px"
            btn.style.height = heightScale / 382 * pageHeight + "px"
            btn.style.width = widthScale / 1024 * pageWidth + "px"
            btn.style.fontSize = fontScale / 1024 * pageWidth + "px"

            btn.innerHTML = word_list[numbers[idx]]
            btn.style.color = "#E6B0AA"
            btn.style.backgroundColor = "transparent"
            btn.style.border = "0px"
            btn.style.whiteSpace = "nowrap"

            btn.onclick = function() {
                word_change(idx)
            }

            leftStart += leftTic

        }

        leftStart = 185
        leftTic = 227
        topStart = 195

        widthScale = 80
        heightScale = 95

        for (let idx = 0; idx < 4; idx++) {
            var btn = document.getElementById("btn_input" + idx)

            btn.style.left = leftStart / 1024 * pageWidth + "px"
            btn.style.top = topStart / 382 * pageHeight + "px"
            btn.style.height = heightScale / 382 * pageHeight + "px"
            btn.style.width = widthScale / 1024 * pageWidth + "px"
            btn.style.fontSize = fontScale / 1024 * pageWidth + "px"
            btn.style.color = "#E6B0AA"
            btn.style.backgroundColor = "transparent"
            btn.innerHTML = ""
            btn.style.border = "0px"


            btn.onclick = function() {
                word_input(idx)
            }

            leftStart += leftTic

        }

    }
}

funcDrawDecrypto()
