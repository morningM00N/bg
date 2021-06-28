import sys
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.expected_conditions import presence_of_element_located
import time
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from datetime import datetime, timedelta, date

if len(sys.argv)!=5:
    print("2021-07-18 이성훈 010-1234-5678 10:46:00")
    sys.exit()

driver = webdriver.Chrome()
wait = WebDriverWait(driver, 10)



target = sys.argv[1]
reservName = sys.argv[2]
reservPhone=sys.argv[3]
reservTime = sys.argv[4]

targetdate = date.fromisoformat(target)
today = date.today()
referdate = today + timedelta(14)
while referdate.weekday() == 6 or referdate.weekday()==5:
    referdate = referdate- timedelta(1)


driver.get("https://zerogangnam.com/reservation")
wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, 'body')))

if today.month != referdate.month:
    driver.find_elements_by_class_name("datepicker--nav-action")[1].click()
time.sleep(0.5)

reservDays = driver.find_elements_by_class_name("datepicker--cell")

idx = 0

while True:
    if int(reservDays[idx].text) == referdate.day and reservDays[idx].get_attribute('class').__contains__("disabled")==False:
        reservDays[idx].click()
        break
    idx += 1

time.sleep(0.5)
temp = driver.find_element_by_class_name("ste1-theme")

themaList = temp.find_elements_by_css_selector('span')
time.sleep(0.5)

themaList[7].click()
time.sleep(0.5)

timeList = driver.find_element_by_id('themeTimeWrap').find_elements_by_class_name('hover2')

for _time in timeList:
    if _time.get_attribute('class').__contains__('active')==False:
        _time.click()
        break

time.sleep(0.5)

driver.find_element_by_id('nextBtn').click()
time.sleep(0.5)

inputBox = driver.find_elements_by_class_name('el-input')
inputBox[0].send_keys(reservName)
inputBox[1].send_keys(reservPhone)

driver.find_element_by_id('step2PeopleWrap').find_elements_by_css_selector('option')[1].click()
time.sleep(0.5)
driver.find_element_by_class_name('fw7').click()
time.sleep(0.5)

js = "document.getElementById('dataReservationDate').value = '"+target+"'"
driver.execute_script(js)
time.sleep(0.5)

if targetdate.weekday() == 5 or targetdate.weekday()==6:
    js = "document.getElementsByName('themePK')[7].value=44"
    driver.execute_script(js)
    time.sleep(0.5)

js = "var timeList = document.getElementsByName('reservationTime'); for(var idx=0; idx<timeList.length; idx++){timeList[idx].value='"+reservTime+"';}"
driver.execute_script(js)

btnClick= driver.find_element_by_id('reservationBtn')
while True:
    print(datetime.today().__str__())
    try:
        btnClick.click()
        wait.until(EC.alert_is_present())
        alert = driver.switch_to.alert
        alert.accept()
    except:
        time.sleep(0.2)
    try:
        btnClick.click()
    except:
        time.sleep(0.2)




