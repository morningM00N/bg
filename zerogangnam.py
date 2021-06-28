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


driver = webdriver.Chrome()
wait = WebDriverWait(driver, 10)


target = "2021-07-18"
reservName = '김진현'
reservPhone='010-1234-5678'
reservTime = '16:25:00'

targetdate = date.fromisoformat(target)
today = date.today()
referdate = today + timedelta(14)

while referdate.weekday() == 6 or referdate.weekday()==5:
    referdate = referdate- timedelta(1)

print(referdate.__str__())

driver.get("https://zerogangnam.com/reservation")
wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, 'body')))

if today.month != referdate.month:
    driver.find_elements_by_class_name("datepicker--nav-action")[1].click()
time.sleep(1)

reservDays = driver.find_elements_by_class_name("datepicker--cell")

idx = 0

while True:
    if int(reservDays[idx].text) == referdate.day and reservDays[idx].get_attribute('class').__contains__("disabled")==False:
        reservDays[idx].click()
        break
    idx += 1

time.sleep(1)
temp = driver.find_element_by_class_name("ste1-theme")

themaList = temp.find_elements_by_css_selector('span')
time.sleep(1)

themaList[7].click()
time.sleep(1)

timeList = driver.find_element_by_id('themeTimeWrap').find_elements_by_class_name('hover2')

for _time in timeList:
    if _time.get_attribute('class').__contains__('active')==False:
        _time.click()
        break

time.sleep(1)

driver.find_element_by_id('nextBtn').click()
time.sleep(1)

inputBox = driver.find_elements_by_class_name('el-input')
inputBox[0].send_keys(reservName)
inputBox[1].send_keys(reservPhone)

driver.find_element_by_id('step2PeopleWrap').find_elements_by_css_selector('option')[1].click()
time.sleep(1)
driver.find_element_by_class_name('fw7').click()
time.sleep(1)

js = "document.getElementById('dataReservationDate').value = '"+target+"'"
driver.execute_script(js)
time.sleep(1)

if targetdate.weekday() == 5 or targetdate.weekday()==6:
    js = "document.getElementsByName('themePK')[7].value=44"
    driver.execute_script(js)
    time.sleep(1)

js = "var timeList = document.getElementsByName('reservationTime'); for(var idx=0; idx<timeList.length; idx++){timeList[idx].value='"+reservTime+"';}"
driver.execute_script(js)

btnClick = driver.find_element_by_id('reservationBtn')
while True:
    try:
        alert = driver.switch_to.alert
        alert.accept()
        btnClick.click()
    except:
        time.sleep(0.2)
    try:
        btnClick.click()
    except:
        time.sleep(0.2)

