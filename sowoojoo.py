import sys
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

supportThemaList = (
    '풀문',
    '도고',
    '마지막유산',
    '영포에버'
)

WEEKDAY = 0
SATURDAY = 1
SUNDAY = 2

timeList = {}
timeCode = {}



themaName = '풀문'
timeList[themaName] = []
timeList[themaName].append(('12:35','14:10','15:45','17:20','18:55','20:30','22:05'))
timeList[themaName].append(('10:55','12:30','14:05','15:40','17:15','18:50','20:25','22:00','23:35'))
timeList[themaName].append(('10:55','12:30','14:05','15:40','17:15','18:50','20:25','22:00','23:35'))

timeCode[themaName] = []
timeCode[themaName].append((427,429,431,433,435,437,439))
timeCode[themaName].append((0,0,0,0,0,0,0,0,630))
timeCode[themaName].append((607,610,613,616,619,622,625,628,631))


themaName = '도고'
timeList[themaName] = []
timeList[themaName].append(('12:55','14:15','15:35','16:55','18:15','19:35','20:55','22:15'))
timeList[themaName].append(('10:45','12:05','13:25','14:45','16:05','17:25','18:45','20:05','21:25','22:45'))
timeList[themaName].append(('10:45','12:05','13:25','14:45','16:05','17:25','18:45','20:05','21:25','22:45'))

timeCode[themaName] = []
timeCode[themaName].append((781,782,783,784,785,786,787,788))
timeCode[themaName].append((0,0,0,0,0,0,0,654,0,660))
timeCode[themaName].append((634,637,640,643,646,649,652,655,658,661))


themaName = '마지막유산'
timeList[themaName] = []
timeList[themaName].append(('12:45','14:05','15:25','16:45','18:05','19:25','20:45','22:05'))
timeList[themaName].append(('11:05','12:25','13:45','15:05','16:25','17:45','19:05','20:35','22:05','23:35'))
timeList[themaName].append(('11:05','12:25','13:45','15:05','16:25','17:45','19:05','20:35','22:05','23:35'))

timeCode[themaName] = []
timeCode[themaName].append((441,534,536,538,540,542,544,546))
timeCode[themaName].append((0,0,496,0,502,505,0,757,760,761))
timeCode[themaName].append((491,494,497,500,503,506,509,758,762,764))


themaName = '영포에버'
timeList[themaName] = []
timeList[themaName].append(('12:25','13:55','15:25','16:55','18:25','19:55','21:25'))
timeList[themaName].append(('11:15','12:45','14:15','15:45','17:15','18:45','20:15','21:45','23:15'))
timeList[themaName].append(('11:15','12:45','14:15','15:45','17:15','18:45','20:15','21:45','23:15'))

timeCode[themaName] = []
timeCode[themaName].append((789,790,791,792,793,0,0))
timeCode[themaName].append((0,0,0,0,0,0,0,0,0))
timeCode[themaName].append((731,734,737,740,743,746,749,752,755))

date = None
themaName = None
selectedTime = None

inputName = None
inputPhone = None

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

        if datetime.datetime.now().hour != 23 or datetime.datetime.now().minute < 54:
            self.sig_log.emit("5분전부터 가능합니다!")
            print("QMessageBox.about(self, '경고', '5분전부터 가능합니다!')")
            # return;

        timeCodeIdx = 0
        while True:
            if timeList[themaName][curDayOfWeek][timeCodeIdx] == selectedTime:
                break
            timeCodeIdx +=1


        webPageAddress = 'http://sowoojoo-escape.com/layout/res/home.php?go=rev.make.input&rev_days='
        webPageAddress = webPageAddress + str(date.year()) + '-' + '{:02d}'.format(date.month()) + '-' + '{:02d}'.format(date.day()) + '&theme_time_num=' + str(timeCode[themaName][curDayOfWeek][timeCodeIdx])

        print(webPageAddress)
        # self.driver.execute_script(jsCommand)

        self.sig_log.emit('예약을 시작합니다.')

        driver = None
        if driver == None:
            chromeOptions = webdriver.ChromeOptions()
#            chromeOptions.add_argument("headless")
            driver = webdriver.Chrome(options=chromeOptions)
            wait = WebDriverWait(driver, 10)



        tempCount = 0
        while True:
            self.sig_log.emit('예약 페이지 접속을 시도합니다. ('+str(tempCount)+'번째 시도 중)')

            tempCount += 1
            try:
                driver.get(webPageAddress)
                wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, 'body')))
                tempResult = driver.find_elements_by_css_selector('td')
                if len(tempResult)>0:
                    break
                #if 'td' in driver.page_source:
                #    break
            except Exception as e:
                print("except",e)


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
        jsCommand = "f = eval('document.register'); f.name.value='" + inputName +"'; f.mobile1.value='" + firstPhoneNumber+"'; f.mobile2.value='" + secondPhoneNumber+"'; f.mobile3.value='" + thirdPhoneNumber + "'; f.submit();"
        self.sig_log.emit(jsCommand)
        print(jsCommand)
        driver.execute_script(jsCommand)
        wait.until(EC.visibility_of_element_located((By.ID, 'contents')))
        print("web page loaded")

        jsCommand = "f = eval('document.register'); f.payment.value = 'A'; f.action = '../../core/res/rev.make.mutong.php'; f.submit();"
        print(jsCommand)
        driver.execute_script(jsCommand)
        self.sig_log.emit('예약 완료되었습니다.')
        driver.quit()
        driver=None
        # self.driver.execute_script(jsCommand)



class MyApp(QWidget):

    def __init__(self):
        super().__init__()
        self.cal = QCalendarWidget(self)
        self.personalInfoGroup = QGroupBox('')
        self.personalName = QLineEdit('김길동')
        self.personalPhone = QLineEdit('010-1234-5678')
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
        self.updateTimeTable()

        self.worker.sig_log.connect(self.updateLog)

    def updateTimeTable(self):
        global date
        global inputName
        global inputPhone

        inputName = self.personalName.text()
        inputPhone = self.personalPhone.text()
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
        gridbox.addWidget(self.cal, 1, 0)
        gridbox.addWidget(self.showLog, 2, 0)
        gridbox.addWidget(self.personalInfoGroup, 0, 0)
        gridbox.addWidget(self.themaName, 0, 1)
        gridbox.addWidget(self.timeGroup, 1, 1)
        gridbox.addWidget(self.startBtn, 2, 1)

        personalInfoGroupLayout = QHBoxLayout()
        personalInfoGroupLayout.addWidget(self.personalName)
        personalInfoGroupLayout.addWidget(self.personalPhone)

        self.personalInfoGroup.setLayout(personalInfoGroupLayout)

        # 달력 표시 및 날짜 변경시 함수 호출 연결
        self.cal.setGridVisible(True)
        self.cal.clicked[QDate].connect(self.updateTimeTable)

        # 테마 선택이 바뀌었을 때 함수 호출 연결
        self.themaName.currentIndexChanged.connect(self.updateTimeTable)

        # 매크로 시작 함수 호출 연결
        self.startBtn.clicked.connect(self.worker.startMacro)

        # self.lbl = QLabel(self)
        # date = self.cal.selectedDate()
        # self.lbl.setText(date.toString())

        # 테마 추가
        for th in supportThemaList:
            self.themaName.addItem(th)

        self.setWindowTitle('소우주 예약 도우미')
        self.setGeometry(300, 300, 400, 300)
        self.show()


if __name__ == '__main__':
    app = QApplication(sys.argv)
    ex = MyApp()
    sys.exit(app.exec_())
