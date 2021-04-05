import sys, os
from PyQt5.QtWidgets import *
from PyQt5.QtCore import QDate
from PyQt5.QtCore import QObject
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.expected_conditions import presence_of_element_located
import time
import datetime
from PyQt5.QtCore import QThread
from PyQt5.QtCore import pyqtSignal, pyqtSlot
import chromedriver_autoinstaller


supportThemaList = (
    'H.E.L.L.P',
    '달: 마지막 유산',
    "후레쉬망고 호스텔"
)

themaIdxList = (66,68,65)

WEEKDAY = 0
SATURDAY = 1
SUNDAY = 2

timeList = {}
timeCode = {}

versionUpdate = False


themaName = supportThemaList[0]
timeList[themaName] = []
timeList[themaName].append(('10:15','12:30','14:45','17:00','19:15','21:30'))
timeList[themaName].append(('10:15','12:30','14:45','17:00','19:15','21:30'))
timeList[themaName].append(('10:15','12:30','14:45','17:00','19:15','21:30'))

timeCode[themaName] = []
timeCode[themaName].append((0,0,0,0,0,0))
timeCode[themaName].append((0,0,0,0,0,0))
timeCode[themaName].append((0,0,0,0,0,0))


themaName = supportThemaList[1]
timeList[themaName] = []
timeList[themaName].append(('10:40','12:20','14:00','15:40','17:20','19:00','20:40','22:20'))
timeList[themaName].append(('10:40','12:20','14:00','15:40','17:20','19:00','20:40','22:20'))
timeList[themaName].append(('10:40','12:20','14:00','15:40','17:20','19:00','20:40','22:20'))

timeCode[themaName] = []
timeCode[themaName].append((0,0,0,0,0,0,0,0))
timeCode[themaName].append((0,0,0,0,0,0,0,0))
timeCode[themaName].append((0,0,0,0,0,0,0,0))

themaName = supportThemaList[2]
timeList[themaName] = []
timeList[themaName].append(('10:20','11:50','13:20','14:50','16:20','17:50','19:20','20:50','22:20'))
timeList[themaName].append(('10:20','11:50','13:20','14:50','16:20','17:50','19:20','20:50','22:20'))
timeList[themaName].append(('10:20','11:50','13:20','14:50','16:20','17:50','19:20','20:50','22:20'))

timeCode[themaName] = []
timeCode[themaName].append((0,0,0,0,0,0,0,0))
timeCode[themaName].append((0,0,0,0,0,0,0,0))
timeCode[themaName].append((0,0,0,0,0,0,0,0))


#path = chromedriver_autoinstaller.install(cwd=True)


date = None
themaName = None
selectedTime = None

inputName = None
inputPhone = None
inputPassWord = None

driver = None



class Worker(QObject):

    sig_log = pyqtSignal(str)
    def __init__(self, parent=None):
        super(self.__class__, self).__init__(parent)



    def startMacro(self):
        curDayOfWeek = 0
        if date.dayOfWeek() == 6:
            curDayOfWeek = 1
        elif date.dayOfWeek() == 7:
            curDayOfWeek = 2

        curDate = QDate(datetime.datetime.now().year,datetime.datetime.now().month,datetime.datetime.now().day)

        if (curDate.daysTo(date)>7):
            self.sig_log.emit("예약 오픈 5분전부터 가능합니다!")
            print("QMessageBox.about(self, '경고', '5분전부터 가능합니다!')")
            return;

        if curDate.daysTo(date)==7 and (datetime.datetime.now().hour != 23 or datetime.datetime.now().minute < 54):
            self.sig_log.emit("예약 오픈 5분전부터 가능합니다!")
            print("QMessageBox.about(self, '경고', '5분전부터 가능합니다!')")
            return;

        webPageAddress = 'http://www.secretgardenescape.com/reservation.html?k_shopno=11&rdate=2021-03-27&prdno='

        print(webPageAddress)
        # self.driver.execute_script(jsCommand)

        self.sig_log.emit('예약을 시작합니다.')

        global driver
        if driver == None:
            chromeOptions = webdriver.ChromeOptions()
            #chromeOptions.add_argument("headless")
            driver = webdriver.Chrome(#executable_path=path,
                options=chromeOptions)
            wait = WebDriverWait(driver, 10)

        driver.get(webPageAddress)
        wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, 'body')))

        themaIdx = 0
        while themaName != supportThemaList[themaIdx]:
            themaIdx += 1


        self.sig_log.emit('예약 페이지에 접속하였습니다.')
        firstPhoneNumber = None
        secondPhoneNumber = None
        thirdPhoneNumber = None
        if inputPhone.find('-') is -1:
            firstPhoneNumber = inputPhone[0:3]
            secondPhoneNumber = inputPhone[3:-4]
            thirdPhoneNumber = inputPhone[-4:]
        else:
            splittedNum = inputPhone.split('-')
            firstPhoneNumber = splittedNum[0]
            secondPhoneNumber = splittedNum[1]
            thirdPhoneNumber = splittedNum[2]
        jsCommand = "SendVar('66','2021-03-27','10:15');"
        #self.sig_log.emit(jsCommand)
        print(jsCommand)
        driver.execute_script(jsCommand)
        wait.until(EC.visibility_of_element_located((By.ID, 'container')))
        print("web page loaded")

        macroCode = driver.find_element_by_id('myspam')
        spamCodes = macroCode.find_elements_by_css_selector('span')
        spamCodeExtracted = ""
        for spamCodes in spamCodes:
            spamCodeExtracted = spamCodeExtracted+ spamCodes.text

        reservedData = str(date.year()) + '-' + '{:02d}'.format(date.month()) + '-' + '{:02d}'.format(date.day())

        jsCommand="document.getElementById('o_name').value='"+inputName+"'; document.getElementsByName('o_hand_ph01')[0].value='"+firstPhoneNumber+"';"\
                  +" document.getElementsByName('o_hand_ph02')[0].value='"+secondPhoneNumber+"';"\
                  +"document.getElementsByName('o_hand_ph03')[0].value='"+thirdPhoneNumber+"';"\
                  +"document.getElementById('passwd').value='"+inputPassWord+"'; document.check_buy.privacy[0].checked=true;" \
                  +"document.getElementById('As_wkey').value='" + spamCodeExtracted+"';"\
                  +"document.getElementsByName('productno')[0].value='" + str(themaIdxList[themaIdx]) +"';" \
                  +"document.getElementsByName('derv_date')[0].value='" + reservedData + "';" \
                  +"document.getElementsByName('derv_time')[0].value='" + selectedTime + "'; Order_Check(document.check_buy);"

        # jsCommand = "document.getElementById('o_name').value='이정석'; document.getElementsByName('o_hand_ph01')[0].value='010';" \
        #             + " document.getElementsByName('o_hand_ph02')[0].value='2068';" \
        #             + "document.getElementsByName('o_hand_ph03')[0].value='7565';" \
        #             + "document.getElementById('passwd').value='123456'; document.check_buy.privacy[0].checked=true;" \
        #             + "document.getElementsByName('productno')[0].value='66';" \
        #             + "document.getElementsByName('derv_date')[0].value='2021-04-03';" \
        #             + "document.getElementsByName('derv_time')[0].value='10:15'; Order_Check(document.check_buy);"

        try:
            driver.execute_script(jsCommand)
            wait.until(EC.visibility_of_element_located((By.ID, 'container')))

        except Exception as e:
            print("exception")

        self.sig_log.emit('예약이 성공하면 문자가 발송됩니다. (실패시 문자 미발송)')

        #driver.quit()
        #driver=None

class MyApp(QWidget):

    def __init__(self):
        super().__init__()
        if versionUpdate == False:
            self.cal = QCalendarWidget(self)
        self.personalInfoGroup = QGroupBox('')
        self.personalName = QLineEdit('김길동')
        self.personalPhone = QLineEdit('010-1234-5678')
        self.personalPassWord = QLineEdit('123456')
        self.themaName = QComboBox()
        self.timeGroup = QGroupBox('시간')
        self.timeGroup.setLayout(QVBoxLayout())

        self.startBtn = QPushButton('시작')
        self.showLog = QLabel(self)

        self.worker = Worker()
        self.worker_thread = QThread()
        self.worker.moveToThread(self.worker_thread)
        self.worker_thread.start()  # 쓰레드를 실행합니다.


        self.initUI()
        if versionUpdate == False:
            self.updateTimeTable()

        self.worker.sig_log.connect(self.updateLog)

    def updatePersonalInfo(self):
        global inputName
        global inputPhone
        global inputPassWord

        inputName = self.personalName.text()
        inputPhone = self.personalPhone.text()
        inputPassWord = self.personalPassWord.text()

    def updateTimeTable(self):
        global date
        global inputName
        global inputPhone
        global inputPassWord

        inputName = self.personalName.text()
        inputPhone = self.personalPhone.text()
        inputPassWord = self.personalPassWord.text()
        date = self.cal.selectedDate()
        curDayOfWeek = 0
        if date.dayOfWeek() == 6:
            curDayOfWeek = 1
        elif date.dayOfWeek() == 7:
            curDayOfWeek = 2

        global themaName
        themaName = self.themaName.currentText()

        for i in range(self.timeGroup.layout().count()):
            self.timeGroup.layout().itemAt(i).widget().deleteLater()

        _firstCheck = True
        for _time in timeList[themaName][curDayOfWeek]:
            thisRadioBtn = QRadioButton(_time)
            self.timeGroup.layout().addWidget(thisRadioBtn)
            thisRadioBtn.clicked.connect(self.updateSelectedTime)
            if _firstCheck == True:
                thisRadioBtn.setChecked(True)
                thisRadioBtn.click()
                _firstCheck = False

    def updateSelectedTime(self):
        global selectedTime
        selectedTime = self.sender().text()
        #print(self.selectedTime)

    def updateLog(self, status):
        self.showLog.setText('{}'.format(status))


    def initUI(self):

        gridbox = QGridLayout()
        self.setLayout(gridbox)

        # 위젯 배치
        if versionUpdate == False:
            gridbox.addWidget(self.cal, 1, 0)
            gridbox.addWidget(self.showLog, 2, 0)
            gridbox.addWidget(self.personalInfoGroup, 0, 0)
            gridbox.addWidget(self.themaName, 0, 1)
            gridbox.addWidget(self.timeGroup, 1, 1)
            gridbox.addWidget(self.startBtn, 2, 1)

            personalInfoGroupLayout = QHBoxLayout()
            personalInfoGroupLayout.addWidget(self.personalName)
            personalInfoGroupLayout.addWidget(self.personalPhone)
            personalInfoGroupLayout.addWidget(self.personalPassWord)

            self.personalInfoGroup.setLayout(personalInfoGroupLayout)

            # 달력 표시 및 날짜 변경시 함수 호출 연결
            self.cal.setGridVisible(True)
            self.cal.clicked[QDate].connect(self.updateTimeTable)


            # 테마 선택이 바뀌었을 때 함수 호출 연결
            self.themaName.currentIndexChanged.connect(self.updateTimeTable)


            # 매크로 시작 함수 호출 연결
            self.startBtn.clicked.connect(self.updatePersonalInfo)
            self.startBtn.clicked.connect(self.worker.startMacro)

            # self.lbl = QLabel(self)
            # date = self.cal.selectedDate()
            # self.lbl.setText(date.toString())

            # 테마 추가
            for th in supportThemaList:
                self.themaName.addItem(th)

            self.updateLog('\n이름 / 전화번호 / 예약비밀번호를 입력하고 원하는 테마와 시간을\n\n선택 후 시작버튼을 눌러주세요. (크롬이 설치되어 있어야 합니다.)\n')

        else:
            gridbox.addWidget(self.showLog, 0, 0)
            self.updateLog("최신 버전을 사용해 주세요.")


        self.setWindowTitle('소우주 예약 도우미')
        self.setGeometry(300, 300, 400, 300)
        self.show()

    def closeEvent(self,QCloseEvent):
        print("close")
        global driver
        if driver != None:
            driver.quit()
            driver=None


versionCheckRoutine = True

if __name__ == '__main__':

    if versionCheckRoutine == True:
        chromeOptions = webdriver.ChromeOptions()
        chromeOptions.add_argument("headless")
        versionCheckDriver = webdriver.Chrome(#executable_path=path,
                                              options=chromeOptions)
        wait = WebDriverWait(versionCheckDriver, 10)
        versionCheckDriver.get('https://morningm00n.github.io/bg/versioncheck.html')
        wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, 'p')))

        if versionCheckDriver.find_element_by_id('version').text != '1.01':
            versionUpdate = True

        versionCheckDriver.quit()

    app = QApplication(sys.argv)
    ex = MyApp()
    sys.exit(app.exec_())
