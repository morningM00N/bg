'''


python key230803.py 2023-12-08 포프리 박정훈 4512-7852 30 0.3 18:40


document.getElementsByName('person')[0].selectedIndex=1;
document.getElementsByName('rev_days')[0].value='2023-12-08';
document.getElementsByName('theme_time_num')[0].value='2075';
document.getElementsByName('name')[0].value='양지열';
document.getElementsByName('mobile2')[0].value='5544';
document.getElementsByName('mobile3')[0].value='3317';
document.getElementsByName('input_captcha')[0].value='21090';
document.getElementsByName('ck_agree')[0].checked=true;
javascript:fun_submit();
'''

import math
import sys
import datetime
from tkinter.simpledialog import askstring
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager


reserveDate = None
reserveName = '이성훈'
reservePhone2 = '2211'
reservePhone3 = '4032'
reserveThemaCode = None
numOfTabs = 20
interval = 0.1

WEEKDAY = 0
FRIDAY = 1
SATURDAY = 2
SUNDAY = 3
timeTable = {}
timeTable['네드'] = {}
timeTable['네드'][WEEKDAY]={
"10:00":1470,
"11:30":1471,
"13:00":1472,
"14:30":1473,
"16:00":1474,
"17:30":1475,
"19:00":1782,
"20:30":1476,
"22:00":1477}

timeTable['네드'][FRIDAY]={
"10:00":1478,
"11:30":1479,
"13:00":1480,
"14:30":1481,
"16:00":1482,
"17:30":1483,
"19:00":1484,
"20:30":1485,
"22:00":1783}

timeTable['네드'][SATURDAY]={
    "10:00":1486,
"11:30":1487,
"13:00":1784,
"14:30":1488,
"16:00":1489,
"17:30":1490,
"19:00":1491,
"20:30":1492,
"22:00":1493,
}

timeTable['네드'][SUNDAY]={
    "10:00":1494,
"11:30":1495,
"13:00":1496,
"14:30":1497,
"16:00":1498,
"17:30":1499,
"19:00":1500,
"20:30":1785,
"22:00":1501,
}

timeTable['머머패'] = {}
timeTable['머머패'][WEEKDAY]={
    "09:30":1872,
"10:50":1873,
"12:10":1874,
"13:30":1875,
"14:50":1876,
"16:10":1877,
"17:30":1878,
"18:50":1879,
"20:10":1880,
"21:30":1881,
"22:50":1982,

}

timeTable['머머패'][FRIDAY]={
    "09:30":1882,
"10:50":1883,
"12:10":1884,
"13:30":1885,
"14:50":1887,
"16:10":1889,
"17:30":1891,
"18:50":1893,
"20:10":1895,
"21:30":1897,
"22:50":1979,
}

timeTable['머머패'][SATURDAY]={
    "09:30":1886,
"10:50":1888,
"12:10":1890,
"13:30":1892,
"14:50":1894,
"16:10":1896,
"17:30":1898,
"18:50":1899,
"20:10":1900,
"21:30":1901,
"22:50":1980,
}

timeTable['머머패'][SUNDAY]={
    "09:30":1902,
"10:50":1903,
"12:10":1904,
"13:30":1905,
"14:50":1906,
"16:10":1907,
"17:30":1908,
"18:50":1909,
"20:10":1910,
"21:30":1911,
"22:50":1981,
}

timeTable['워너고홈'] = {}
timeTable['워너고홈'][WEEKDAY]={
"10:00":1760,
"11:30":1733,
"13:00":1777,
"14:30":1734,
"16:00":1735,
"17:30":1778,
"19:00":1736,
"20:30":1737,
"22:00":1779}

timeTable['필바에'] = {}
timeTable['필바에'][WEEKDAY]=\
{"10:35":2001,
"12:10":2002,
"13:45":2003,
"15:20":2004,
"16:50":2005,
"18:20":2006,
"19:50":2007,
"21:25":2008}

timeTable['필바에'][FRIDAY]=\
{"10:00":1801,
"11:30":1802,
"13:00":1803,
"14:30":1804,
"16:00":1805,
"17:30":1806,
"19:00":1807,
"20:30":1808,
"22:00":1809}

timeTable['필바에'][SATURDAY]=\
{"10:35":1810,
"12:10":1811,
"13:45":1812,
"15:20":1813,
"16:50":1814,
"18:20":1815,
"19:50":1816,
"21:25":1817}

timeTable['필바에'][SUNDAY]=\
{"10:00":1819,
"11:30":1820,
"13:00":1821,
"14:30":1822,
"16:00":1823,
"17:30":1824,
"19:00":1825,
"20:30":1826,
"22:00":1827}

timeTable['필바밥'] = {}

timeTable['필바밥'][WEEKDAY]=\
{'09:55':1983,
'11:25':1984,
'12:55':1985,
'14:30':2037,
'16:00':1986,
'17:30':1987,
'19:00':2038,
'20:35':2039,
'22:05':2040}

timeTable['필바밥'][FRIDAY]=\
{'09:55':1988,
'11:25':1989,
'12:55':1990,
'14:30':2042,
'16:00':1991,
'17:30':2043,
'19:00':1992,
'20:35':2044,
'22:05':2045,
'09:55':2000}

timeTable['필바밥'][SATURDAY]=\
{"09:55":2000,
'11:25':1993,
'12:55':1994,
'14:30':1995,
'16:00':2031,
'17:30':2032,
'19:00':2033,
'20:35':2034,
'22:05':2035}

timeTable['필바밥'][SUNDAY]=\
{'09:55':2048,
'11:25':2049,
'12:55':2050,
'14:30':2051,
'16:00':2052,
'17:30':2053,
'19:00':2054,
'20:35':2055,
'22:05':2056
}

timeTable['포프리'] = {}


timeTable['포프리'][WEEKDAY]=\
{'09:20':2057,
 '10:40':2058,
'12:00':2059,
 '13:20':2060,
'14:40':2061,
 '16:00':2062,
 '17:20':2063,
 '18:40':2064,
 '20:00':2065,
 '21:20':2066,
'22:40':2067
}

timeTable['포프리'][FRIDAY]=\
{'09:20':2068,
 '10:40':2069,
'12:00':2070,
'13:20':2071,
'14:40':2072,
'16:00':2073,
'17:20':2074,
'18:40':2075,
'20:00':2076,
'21:20':2077,
}

timeTable['포프리'][SATURDAY]=\
{"09:20":2079,
"10:40":2080,
"12:00":2081,
"13:20":2082,
"14:40":2083,
"16:00":2084,
"17:20":2085,
"18:40":2086,
"20:00":2087,
"21:20":2088,
"22:40":2089}

timeTable['포프리'][SATURDAY]=\
{
"12:00":2081,
"13:20":2082,
"14:40":2083,
"16:00":2084,
"17:20":2085,
"18:40":2086,
"20:00":2087,
"21:20":2088}

timeTable['포프리'][SUNDAY]=\
{
    "09:20":2090,
"10:40":2091,
"12:00":2092,
"13:20":2093,
"14:40":2094,
"16:00":2095,
"17:20":2096,
"18:40":2097,
"20:00":2098,
"21:20":2099,
"22:40":2100
}

if len(sys.argv)==1:
    inputString = askstring("정보","2023-08-01 네드|머머패|워너고홈|필바에|필바밥|포프리 홍길동 1234-5678 30(numOfTabs) 0.1(interval)",initialvalue="2023-12-10 포프리 이성훈 5662-1875 30 0.5")
    if inputString == None:
        sys.exit()
    inputWords = inputString.split(' ')
    reserveDate = inputWords[0]
    if (len(inputWords)>2):
        reserveName = inputWords[2]
    if (len(inputWords)>3):
        reservePhone2 = inputWords[3].split('-')[0]
        reservePhone3 = inputWords[3].split('-')[1]
    if (len(inputWords)>4):
        numOfTabs = int(inputWords[4])
    if (len(inputWords)>5):
        interval = float(inputWords[5])        
    td = datetime.datetime.fromisoformat(reserveDate)
    strTime = ""
    wd = None
    if td.weekday()<4:
        wd = WEEKDAY
    elif td.weekday()==4:
        wd = FRIDAY
    elif td.weekday()==5:
        wd = SATURDAY
    else:
        wd = SUNDAY
    for t in timeTable[inputWords[1]][wd]:
        strTime += (t + " ")
    inputTime = askstring("시간",strTime)
    reserveThemaCode = timeTable[inputWords[1]][wd][inputTime]
    print(reserveThemaCode)
elif len(sys.argv)==8:
    reserveDate = sys.argv[1]
    reserveName = sys.argv[3]
    reservePhone2 = sys.argv[4].split('-')[0]
    reservePhone3 = sys.argv[4].split('-')[1]
    numOfTabs = int(sys.argv[5])
    interval = float(sys.argv[6])        
    td = datetime.datetime.fromisoformat(reserveDate)
    strTime = ""
    wd = None
    if td.weekday()<4:
        wd = WEEKDAY
    elif td.weekday()==4:
        wd = FRIDAY
    elif td.weekday()==5:
        wd = SATURDAY
    else:
        wd = SUNDAY
    for t in timeTable[sys.argv[2]][wd]:
        strTime += (t + " ")
    inputTime = sys.argv[7]
    reserveThemaCode = timeTable[sys.argv[2]][wd][inputTime]
    print(reserveThemaCode)
else:
    sys.exit()
     

from selenium.webdriver.chrome.options import Options
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import *
import time
import datetime
chrome_options = Options()
chrome_options.add_argument('--start-maximized')

nowDate = datetime.datetime.now()
thisWeekDay = nowDate.weekday()
pseudoDate = datetime.datetime.now()+datetime.timedelta(7-thisWeekDay+3)
stringPseudoDate= pseudoDate.strftime("%Y-%m-%d")
pseudoTimeCode = 558

try:
    driver = webdriver.Chrome( service=Service(ChromeDriverManager().install()), options=chrome_options)
except:
    #print("err")
    #sys.exit()
    driver = webdriver.Chrome( service=Service(executable_path="C:\\Users\\USER\\.wdm\\drivers\\chromedriver\\win64\\120.0.6099.71\\chromedriver.exe"), options=chrome_options)
    

driver.get("https://keyescape.co.kr/web/home.php?go=rev.make")
WebDriverWait(driver,10).until(EC.element_to_be_clickable((By.CLASS_NAME,'btnArea')))

while True:
    try:
        jsCmd = f"\
javascript:fun_zizum_select('7','7','');\
javascript:fun_days_select('{stringPseudoDate}','2');\
javascript:fun_theme_select('32','0');\
javascript:fun_theme_time_select('{pseudoTimeCode}','2');\
javascript:fun_submit();\
"

        driver.execute_script(jsCmd)
        time.sleep(0.1)
        al = driver.switch_to.alert
        al.accept()
        pseudoTimeCode+=1
    except:
        break

for i in range(numOfTabs):
    driver.execute_script('window.open("about:blank", "_blank");')

for t in driver.window_handles:
    driver.switch_to.window(t) 
    driver.get("https://keyescape.co.kr/web/home.php?go=rev.make")
    WebDriverWait(driver,10).until(EC.element_to_be_clickable((By.CLASS_NAME,'btnArea')))
    driver.execute_script(jsCmd)

captcha = askstring('captcha','captcha')
strWaitTime = askstring('time','wait time(h m s)')
times = strWaitTime.split(' ')
waitTime = 3600*int(times[0])+60*int(times[1])+int(times[2])

jsCmd = f"\
document.getElementsByName('person')[0].selectedIndex=1;\n\
document.getElementsByName('rev_days')[0].value='{reserveDate}';\n\
document.getElementsByName('theme_time_num')[0].value='{reserveThemaCode}';\n\
document.getElementsByName('name')[0].value='{reserveName}';\n\
document.getElementsByName('mobile2')[0].value='{reservePhone2}';\n\
document.getElementsByName('mobile3')[0].value='{reservePhone3}';\n\
document.getElementsByName('input_captcha')[0].value='{captcha}';\n\
document.getElementsByName('ck_agree')[0].checked=true;\n\
javascript:fun_submit();\n\
"
while True:
    rH = math.floor(waitTime/3600)
    rM = math.floor((waitTime%3600)/60)
    rS = waitTime%60
    print(f"wait {rH}H {rM}M {rS}S")
    print(jsCmd)
    if waitTime > 5:
        waitTime-=5
        time.sleep(5)
    else:
        time.sleep(waitTime)
        break
        
        



for t in driver.window_handles:
    driver.switch_to.window(t) 
    time.sleep(interval)
    try:
        driver.execute_script(jsCmd)
        time.sleep(interval)
        driver.switch_to.alert.accept()
    except Exception as e:
        print("\n\n\n\n\ninner loop")
        print(e)
        print("\n\n\n\n\n")
        try:
            driver.execute_script('javascript:fun_payment_mutong()')
            time.sleep(interval)
        except UnexpectedAlertPresentException as e:
            print("\n\n\n\n\nouter loop alert")
            print(e)
            print("\n\n\n\n\n")
            driver.switch_to.alert.accept()
        except Exception as e:
            print("\n\n\n\n\nouter loop")
            print(e)
            print("\n\n\n\n\n")
            pass


while True:
    print(f"{reserveName} {reservePhone2}-{reservePhone3}")
    print("press e to exit")
    t = input()
    if t=='e':
        break
