<!DOCTYPE html>
<html lang="ko">

<head>
    <link href="https://fonts.googleapis.com/css?family=Bangers&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Stylish&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Sriracha&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Nanum+Pen+Script&display=swap" rel="stylesheet">


    <meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
    <!--모바일페이지크기조절메타태그-->
    <title>키이스케이프 예약 매크로</title>
</head>

<body id="body">
    <div id="main" class="bgdiv">
        예약일 <input id="dateTarget" type="date" onchange="funcGetTime()"> 공휴일<input type="checkbox" id="chkboxHolyday">
        <br><br> 테마 <select id="sltTheme" onchange="funcGetTime()" selectedIndex=0>
            <option>네드</option>
            <option>엔젤리오</option>
            <option>삐릿뽀</option>
            <option>홀리데이</option>
            <option>고백</option>
            <option>원더리아</option>
            <option>백투더씬</option>
            <option>US</option>
        </select> &nbsp;&nbsp; 시간 <select id="sltTime"></select>
        <br><br> 이름 <input id="inputName" placeholder="이름" style="width:48px;"> &nbsp;&nbsp; 폰번호 <input id="inputPhone1" style="width:24px;" value="010">-<input placeholder="1234" id="inputPhone2" style="width:32px;">-<input placeholder="1234" id="inputPhone3"
            style="width:32px;">
        <br><br> 대기시간 (ms) <input id="inputTry" style="width:24px;" value=10> &nbsp; <button onclick="funcFirst()">첫번째</button> &nbsp; <button onclick="funcSecond()">두번째</button>
        <br><br><br> <input id="inputFirst">

        <br><br><br>
        <br> <b>사용법</b>
        <br>
        <br> 1. 크롬 브라우저에서 키이스케이프 예약 사이트(<a target="_blank" href="https://keyescape.co.kr/web/home.php?go=rev.make">https://keyescape.co.kr/web/home.php?go=rev.make</a>)에 들어간다. <br><br>
        <img src=img/exp/p1.png><br>

        <br> 2. 키이스케이프 예약 사이트에서 키보드의 F12를 눌러 개발자 도구를 실행시키고 Console 탭을 선택한다. <br><br>
        <img src=img/exp/p2.png><br>


        <br> 3. 다시 현재 페이지로 돌아와 원하는 예약일과 테마명 시간을 선택하고 첫번째 버튼을 클릭한다.

        <br><br>(중요! 일요일이 아닌 공휴일인 경우 공휴일 선택!) <br><br>
        <img src=img/exp/p3.png><br>

        <br> 4. 이전 단계를 문제없이 수행했으면 예약에 필요한 명령어가 클립보드에 복사되어 있을 것이다.

        <br><br>2번 과정에서 실행시킨 개발자 도구의 Console 탭에 명령어를 붙여넣기 한다 (Ctrl+v).<br><br>
        <img src=img/exp/p4.png><br>

        <br> 5. 엔터를 입력하면 명령어가 수행되면 로그가 찍힌다 (재시도 횟수와 현재 시간이 대기시간 간격으로 찍힘).

        <br><br> 입력한 대기시간 (ms) 간격으로 반복적으로 수행하는 명령어는 예약을 원하는 날짜에 예약이 open되어 있는지 확인하고

        <br><br>open 되어 있다면 정보를 입력해서 예약 페이지로 넘어가는 작업을 반복적으로 수행한다.

        <br><br>따라서 1주일 전 밤 11시 57분 정도에 본 단계를 수행하길 추천한다 (ex. 6월 24일 예약을 하고 싶다면 6월 17일 23시 57분 정도에 입력). <br><br>
        <img src=img/exp/p5.png><br>


        <br> 6. 로그가 찍히는 것을 확인했다면 다시 예약 정보를 입력하는 페이지로 돌아와 두번째 버튼을 클릭한다.

        <br><br> 그렇게 하면 새로운 명령어가 클립보드에 복사되어진다.

        <br><br>
        <img src=img/exp/p10.png><br>

        <br> 7. 원하는 날짜의 예약이 open 되면 정보가 입력되어 다음 페이지(step 2 예약정보 입력)로 넘어갔을 것이다.

        <br><br> 콘솔창의 명령어 입력부분을 클릭한다. (> 오른쪽 부분)

        <br><br>
        <img src=img/exp/p6.png><br>

        <br> 8. 콘솔창에 새롭게 복사한 명령어를 붙여넣고 (Ctrl+v) 엔터를 친다.

        <br><br>

        <br><br>
        <img src=img/exp/p7.png><br>

        <br> 9. STEP3 결제하기 페이지로 넘어왔을 것이다.

        <br><br>
        <img src=img/exp/p8.png><br>

        <br> 10. 스크롤을 내려 결제하기 버튼을 누른다.

        <br><br>
        <img src=img/exp/p9.png><br>

    </div>
    <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
    <script>
        function getSeq(startNum, endNum) {
            var ret = new Array()
            for (let index = startNum; index <= endNum; index++) {
                ret.push(index)
            }
            return ret
        }

        var dateTarget = document.getElementById("dateTarget")
        dateTarget.valueAsDate = new Date()
        var selectedThemeIdx = 0

        var SUNDAY = 3
        var SATURDAY = 2
        var FRIDAY = 1
        var WEEKDAY = 0

        var dateFlag = 0
        var sltTime = document.getElementById("sltTime")


        document.getElementById("inputName").value = "김길동"
        document.getElementById("inputPhone2").value = "1234"
        document.getElementById("inputPhone3").value = "1234"


        var timeTableCode = []

        timeTableCode["네드"] = new Array(
            14, // zizum code
            48, // theme code
            getSeq(1470, 1477),
            getSeq(1478, 1485),
            getSeq(1486, 1493),
            getSeq(1494, 1501),
            new Array("10:20", "12:00", "13:35", "15:15", "16:50", "18:25", "20:05", "21:45"),
            new Array("10:20", "12:00", "13:35", "15:15", "16:50", "18:25", "20:05", "21:45"),
            new Array("10:50", "12:30", "14:05", "15:45", "17:20", "18:55", "20:35", "22:15"),
            new Array("10:50", "12:30", "14:05", "15:45", "17:20", "18:55", "20:35", "22:15")
        )

        timeTableCode["엔젤리오"] = new Array(
            14,
            51,
            getSeq(1514, 1522),
            getSeq(1523, 1531),
            getSeq(1532, 1540),
            getSeq(1541, 1549),
            new Array("10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00", "20:30", "22:00"),
            new Array("10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00", "20:30", "22:00"),
            new Array("10:30", "12:00", "13:30", "15:00", "16:30", "18:00", "19:30", "21:00", "22:30"),
            new Array("10:30", "12:00", "13:30", "15:00", "16:30", "18:00", "19:30", "21:00", "22:30"))

        timeTableCode["삐릿뽀"] = new Array(
            10,
            41,
            getSeq(1303, 1310), //new Array(1303, 1304, 1305, 1306, 1307, 1308, 1309, 1310),
            new Array(1330, 1331, 1333, 1332, 1334, 1335, 1336, 1337),
            getSeq(1314, 1321), //new Array(1314, 1315, 1316, 1317, 1318, 1319, 1320, 1321),
            getSeq(1322, 1329), //new Array(1322, 1323, 1324, 1325, 1326, 1327, 1328, 1329),
            new Array("10:30", "12:10", "13:50", "15:30", "17:10", "18:50", "20:30", "22:10"),
            new Array("10:30", "12:10", "13:50", "15:30", "17:10", "18:50", "20:30", "22:10"),
            new Array("10:30", "12:10", "13:50", "15:30", "17:10", "18:50", "20:30", "22:10"),
            new Array("10:30", "12:10", "13:50", "15:30", "17:10", "18:50", "20:30", "22:10"))

        timeTableCode["홀리데이"] = new Array(
            10,
            45,
            getSeq(1341, 1350), // new Array(1341, 1342, 1343, 1344, 1345, 1346, 1347, 1348, 1349, 1350),
            new Array(1351, 1356, 1357, 1358, 1359, 1360, 1352, 1353, 1354, 1355),
            getSeq(1379, 1388), //new Array(1379, 1380, 1381, 1382, 1383, 1384, 1385, 1386, 1387, 1388),
            getSeq(1389, 1398), //new Array(1389, 1390, 1391, 1392, 1393, 1394, 1395, 1396, 1397, 1398),
            new Array("10:20", "11:40", "13:00", "14:20", "15:40", "17:00", "18:20", "19:40", "21:00", "22:20"),
            new Array("10:20", "11:40", "13:00", "14:20", "15:40", "17:00", "18:20", "19:40", "21:00", "22:20"),
            new Array("10:20", "11:40", "13:00", "14:20", "15:40", "17:00", "18:20", "19:40", "21:00", "22:20"),
            new Array("10:20", "11:40", "13:00", "14:20", "15:40", "17:00", "18:20", "19:40", "21:00", "22:20"))


        timeTableCode["고백"] = new Array(
            10, // zizum code
            43, // theme code
            getSeq(1417, 1423),
            getSeq(1432, 1438),
            new Array(1405, 1406, 1407, 1400, 1401, 1402, 1403),
            getSeq(1408, 1414),
            new Array("10:00", "11:55", "13:50", "15:45", "17:40", "19:35", "21:30"),
            new Array("10:00", "11:55", "13:50", "15:45", "17:40", "19:35", "21:30"),
            new Array("10:00", "11:55", "13:50", "15:45", "17:40", "19:35", "21:30"),
            new Array("10:00", "11:55", "13:50", "15:45", "17:40", "19:35", "21:30"))

        timeTableCode["원더리아"] = new Array(
            15, // zizum code
            53, // theme code
            getSeq(1583, 1594),
            getSeq(1595, 1606),
            getSeq(1607, 1618),
            getSeq(1608, 1630),
            new Array("9:50", "10:55", "12:00", "13:05", "14:10", "15:15", "16:20", "17:25", "18:30", "19:35", "20:40", "21:45"),
            new Array("9:50", "10:55", "12:00", "13:05", "14:10", "15:15", "16:20", "17:25", "18:30", "19:35", "20:40", "21:45"),
            new Array("9:50", "10:55", "12:00", "13:05", "14:10", "15:15", "16:20", "17:25", "18:30", "19:35", "20:40", "21:45"),
            new Array("9:50", "10:55", "12:00", "13:05", "14:10", "15:15", "16:20", "17:25", "18:30", "19:35", "20:40", "21:45"))

        timeTableCode["백투더씬"] = new Array(
            15, // zizum code
            54, // theme code
            getSeq(1651, 1660),
            getSeq(1661, 1670),
            getSeq(1631, 1640),
            getSeq(1641, 1650),
            new Array("10:05", "11:25", "12:45", "14:05", "15:25", "16:45", "18:05", "19:25", "20:45", "22:05"),
            new Array("10:05", "11:25", "12:45", "14:05", "15:25", "16:45", "18:05", "19:25", "20:45", "22:05"),
            new Array("10:05", "11:25", "12:45", "14:05", "15:25", "16:45", "18:05", "19:25", "20:45", "22:05"),
            new Array("10:05", "11:25", "12:45", "14:05", "15:25", "16:45", "18:05", "19:25", "20:45", "22:05"))

        timeTableCode["US"] = new Array(
            16, // zizum code
            55, // theme code
            getSeq(1671, 1681),
            getSeq(1715, 1724),
            getSeq(1715, 1724),
            getSeq(1715, 1724),
            new Array("10:00", "11:20", "12:40", "14:00", "15:20", "16:40", "X", "18:00", "19:20", "20:40", "22:00"),
            new Array("10:00", "11:20", "12:40", "14:00", "15:20", "16:40", "18:00", "19:20", "20:40", "22:00"),
            new Array("10:00", "11:20", "12:40", "14:00", "15:20", "16:40", "18:00", "19:20", "20:40", "22:00"),
            new Array("10:00", "11:20", "12:40", "14:00", "15:20", "16:40", "18:00", "19:20", "20:40", "22:00"))

        var themenum2second

        function funcFirst() {

            var inputFirst = document.getElementById("inputFirst")
            var themeName = document.getElementById("sltTheme").value
            var month = dateTarget.valueAsDate.getMonth() + 1
            var day = dateTarget.valueAsDate.getDate()
            console.log(month, day, themeName)
            themenum2second = timeTableCode[themeName][2 + dateFlag][sltTime.selectedIndex]

            inputFirst.value = "javascript:fun_zizum_select('" + timeTableCode[themeName][0] + "','0','');"
            inputFirst.value += "javascript:fun_calendar_move('2021','" + month + "');var tempDay;var dateLoc;"
            inputFirst.value += "setTimeout(function(){tempDay = document.getElementsByTagName('td');"
            inputFirst.value += " dateLoc = 0; while(dateLoc<50 && tempDay[dateLoc].innerText!=" + day + "){dateLoc++;}},500);"
            inputFirst.value += "var JHCount = 0;"
            inputFirst.value += "function funcRecallJH(){var JHDate=new Date();console.log(JHCount++,JHDate.toString());"
            inputFirst.value += "javascript:fun_calendar_move('2021','" + month + "');"
            inputFirst.value += "if (tempDay[dateLoc].children[0].style.color==''){"
            inputFirst.value += "clearInterval(JHInterval);f = eval('document.register');f.zizum_num.value='" + timeTableCode[themeName][0] + "';f.rev_days.value='"
            inputFirst.value += dateTarget.value + "';f.theme_num.value='"
            inputFirst.value += timeTableCode[themeName][1]
            inputFirst.value += "';f.theme_time_num.value='"
            inputFirst.value += timeTableCode[themeName][2 + dateFlag][sltTime.selectedIndex]
            inputFirst.value += "';f.submit();}"
            inputFirst.value += "};"
            inputFirst.value += "var JHInterval; setTimeout(function(){JHInterval= setInterval(funcRecallJH," + document.getElementById("inputTry").value + ")},1000);"


            inputFirst.select();
            inputFirst.setSelectionRange(0, 9999999)
            document.execCommand("copy")

        }
        funcGetTime();

        funcFirst();
        funcSecond();
        funcFirst();

        function funcSecond() {
            funcFirst()
            var inputFirst = document.getElementById("inputFirst")
            var inputName = document.getElementById("inputName")
            var inputPhone1 = document.getElementById("inputPhone1")
            var inputPhone2 = document.getElementById("inputPhone2")
            var inputPhone3 = document.getElementById("inputPhone3")
            if (inputName.value == "" || inputPhone1.value != "010" || inputPhone2.value == "" || inputPhone2.value.length != 4 || inputPhone3.value == "" || inputPhone3.value.length != 4) {
                alert("입력한 내용을 확인해주세요.")
                return
            }
            var month = dateTarget.valueAsDate.getMonth() + 1
            var day = dateTarget.valueAsDate.getDate()
            console.log(month, day)

            inputFirst.value = 'f = eval("document.register"); f.rev_days.value="revdaysjh";f.theme_time_num.value="themenumjh";f.name.value="홍길동"; f.mobile1.value="010"; f.mobile2.value="1234"; f.mobile3.value="4567"; $("#but_exe").hide(); param = "prm1=" + f.name.value + "&prm2=" + f.mobile1.value + "-" + f.mobile2.value + "-" + f.mobile3.value; $.ajax({type: "POST",url: "rev.make2.ajax.php",data: param,dataType:"html",error: function(){alert("Ajax fail");},success: function(d){if( String( d ) == "0000" ){alert( "" );}else {f.submit();}}});'
            inputFirst.value = inputFirst.value.replace("themenumjh", themenum2second)
            inputFirst.value = inputFirst.value.replace("revdaysjh", dateTarget.value)
            inputFirst.value = inputFirst.value.replace("홍길동", inputName.value)
            inputFirst.value = inputFirst.value.replace("1234", inputPhone2.value)
            inputFirst.value = inputFirst.value.replace("4567", inputPhone3.value)
            inputFirst.select();
            inputFirst.setSelectionRange(0, 9999999)
            document.execCommand("copy")

        }


        function funcGetTime() {

            while (sltTime.childElementCount > 0) {
                sltTime.removeChild(sltTime.children[0])
            }
            var sltTheme = document.getElementById("sltTheme")
            selectedThemeIdx = sltTheme.selectedIndex
            var targetDate = new Date(dateTarget.value)
            dateFlag = 0
            if (document.getElementById("chkboxHolyday").checked == true || targetDate.getDay() == 0) {
                dateFlag = SUNDAY
            } else if (targetDate.getDay() == 6) {
                dateFlag = SATURDAY
            } else if (targetDate.getDay() == 5) {
                dateFlag = FRIDAY
            }


            for (let idx = 0; idx < timeTableCode[sltTheme.value][dateFlag + 6].length; idx++) {
                var option = document.createElement("option")
                option.innerHTML = timeTableCode[sltTheme.value][dateFlag + 6][idx]
                sltTime.appendChild(option)

            }

            //console.log(dateFlag)

        }
    </script>

</body>
