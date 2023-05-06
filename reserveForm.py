from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import datetime
import tkinter.simpledialog
import tkinter.messagebox
import selenium 
from time import sleep
from selenium.webdriver.common.alert import Alert
import chromedriver_autoinstaller    

from selenium.webdriver.support import expected_conditions as EC
import sys
from selenium.common.exceptions import JavascriptException
from selenium.common.exceptions import UnexpectedAlertPresentException
import random

COMPANY = True

if len(sys.argv)<5:
    print('이정환 2876 1575 2023-04-22 "http://dreampicnicescape.com/layout/res/home.php?go=rev.make.input&rev_days=2023-04-22.5&theme_time_num=989"')
    sys.exit()

revName = sys.argv[1]
revMobile2 = sys.argv[2]
revMobile3 = sys.argv[3]
revDate = sys.argv[4]
address= sys.argv[5]

chrome_options = Options()
chrome_options.add_argument('--start-maximized')


if COMPANY==False:
    path = chromedriver_autoinstaller.install(cwd=True)
    driver = webdriver.Chrome( executable_path=path, chrome_options=chrome_options)
else:
    driver = webdriver.Chrome( chrome_options=chrome_options)

wait = WebDriverWait(driver, 10)

driver.get(address)

jsCommand=f"\
document.getElementsByName('rev_days')[0].value='{revDate}';\
document.getElementsByName('name')[0].value='{revName}';\
document.getElementsByName('mobile2')[0].value='{revMobile2}';\
document.getElementsByName('mobile3')[0].value='{revMobile3}';\
document.getElementsByName('ck_agree')[0].checked=true;\
fun_submit();\
"

tkinter.simpledialog.askstring('start','start')

while True:
    driver.execute_script(jsCommand)
    sleep(0.5)
    try:
        alert_obj = driver.switch_to.alert
        alert_obj.accept()
    except:
        break

jsCommand = "fun_payment()"
while True:
    try:
        sleep(0.5)    
        driver.execute_script(jsCommand)
    except:
        pass
