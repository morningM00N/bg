import sys
from PyQt5.QtWidgets import *
from PyQt5.QtCore import QDate


class MyApp(QWidget):

    def __init__(self):
        super().__init__()
        self.initUI()

    def initUI(self):
        cal = QCalendarWidget(self)
        cal.setGridVisible(True)
        cal.clicked[QDate].connect(self.showDate)

        self.lbl = QLabel(self)
        date = cal.selectedDate()
        self.lbl.setText(date.toString())

        vbox = QGridLayout()
        vbox.addWidget(cal,1,0)
        vbox.addWidget(self.lbl)
        vbox.addWidget(QPushButton('Top'))
        vbox.addWidget(QLineEdit("이름"),0,1)
        vbox.addWidget(QLineEdit("전화번호"),0,2)

        
        
        groupbox = QGroupBox('시간')
        gvbox=QVBoxLayout()
        gvbox.addWidget(QRadioButton('radio1'))
        gvbox.addWidget(QRadioButton('radio2'))
        gvbox.addWidget(QRadioButton('radio3'))
        groupbox.setLayout(gvbox)
        vbox.addWidget(groupbox,1,1)
        
        self.setLayout(vbox)

        self.layout().itemAtPosition(1,1).widget().deleteLater()
        vbox.addWidget(QLineEdit("다른이름"),0,1)

        
        self.setWindowTitle('QCalendarWidget')
        self.setGeometry(300, 300, 400, 300)
        self.show()

        

    def showDate(self, date):
        self.lbl.setText(date.toString())


if __name__ == '__main__':
    app = QApplication(sys.argv)
    ex = MyApp()
    sys.exit(app.exec_())
