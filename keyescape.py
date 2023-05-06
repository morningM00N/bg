import sys
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.expected_conditions import presence_of_element_located
import time
import selenium.common.exceptions
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from datetime import datetime, timedelta, date

if len(sys.argv)!=5:
   print("2021-07-06 이성훈 010-1234-5678 1724")
   sys.exit()

driver = webdriver.Chrome()
wait = WebDriverWait(driver, 10)

target = sys.argv[1]
reservName = sys.argv[2]
reservPhone=sys.argv[3]
reservTime = sys.argv[4]


targetdate = date.fromisoformat(target)
today = date.today()
referdate = today + timedelta(6)
while referdate.weekday() == 6 or referdate.weekday() == 5:
    referdate = referdate - timedelta(1)

driver.get("https://keyescape.co.kr/web/home.php?go=rev.make")
wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, 'body')))

time.sleep(0.5)

jsCommand = "javascript:fun_days_select('" + target + "','" + str(targetdate.day - 1) + "')"
driver.execute_script(jsCommand)
time.sleep(0.5)

jsCommand = "javascript:fun_theme_select('55','0')"

driver.execute_script(jsCommand)
time.sleep(0.5)

jsCommand = "javascript:fun_days_select('" + referdate.__str__() + "','" + str(referdate.day - 1) + "')"
driver.execute_script(jsCommand)
time.sleep(0.5)

jsCommand = "javascript:fun_theme_select('5','0')"
driver.execute_script(jsCommand)
time.sleep(0.5)

emptyTimeTable = driver.find_element_by_id("theme_time_data").find_elements_by_css_selector("a")
if len(emptyTimeTable) > 0:
    driver.execute_script(emptyTimeTable[0].get_attribute('href'))

time.sleep(0.5)

driver.execute_script("fun_submit()")

jsCommand = "document.getElementsByName('rev_days')[0].value='" + target + "';"

driver.execute_script(jsCommand)
time.sleep(0.5)

jsCommand = "f = eval('document.register'); f.rev_days.value='__reserve_date__';f.theme_time_num.value='__reserve_time__';f.name.value='__reserve_name__'; f.mobile1.value='__reserve_phone1__'; f.mobile2.value='__reserve_phone2__'; f.mobile3.value='__reserve_phone3__'; document.getElementsByName('person')[0].selectedIndex=0; while (document.getElementsByName('person')[0].value!='2'){document.getElementsByName('person')[0].selectedIndex++;} $('#but_exe').hide(); param = 'prm1=' + f.name.value + '&prm2=' + f.mobile1.value + '-' + f.mobile2.value + '-' + f.mobile3.value; $.ajax({type: 'POST',url: 'rev.make2.ajax.php',data: param,dataType:'html',error: function(){alert('Ajax fail');},success: function(d){if( String( d ) == '0000' ){alert( '' );}else {f.submit();}}});"
jsCommand = jsCommand.replace("__reserve_date__",target)
jsCommand = jsCommand.replace("__reserve_name__",reservName)
phoneNumber = reservPhone.split('-')
jsCommand = jsCommand.replace("__reserve_phone1__",phoneNumber[0])
jsCommand = jsCommand.replace("__reserve_phone2__",phoneNumber[1])
jsCommand = jsCommand.replace("__reserve_phone3__",phoneNumber[2])
jsCommand = jsCommand.replace("__reserve_time__",reservTime)


while True:

    try:
        driver.execute_script(jsCommand)
        wait.until(EC.alert_is_present())
        alert = driver.switch_to.alert
        alert.accept()
    except selenium.common.exceptions.JavascriptException:
        print("예약 성공")
        driver.execute_script("javascript:fun_payment_mutong()")
        break

    except:
        print("excep 1")
        time.sleep(0.2)
    try:
        driver.execute_script(jsCommand)
    except selenium.common.exceptions.JavascriptException:
        print("예약 성공")
        driver.execute_script("javascript:fun_payment_mutong()")
        break

    except:
        print("excep 2")
        time.sleep(0.2)
