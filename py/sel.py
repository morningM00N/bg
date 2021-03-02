from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.expected_conditions import presence_of_element_located
import time

#This example requires Selenium WebDriver 3.13 or newer
driver = webdriver.Chrome()
wait = WebDriverWait(driver, 10)
driver.get("https://keyescape.co.kr/web/home.php?go=rev.make")
revList = driver.find_element_by_class_name('revList')
aList = revList.find_elements_by_css_selector('a')


curUrl = driver.current_url
print (curUrl)
driver.execute_script('''f = eval('document.register');
f.zizum_num.value='9';
f.rev_days.value='2021-03-08';
f.theme_num.value='38';
f.theme_time_num.value='381';
f.submit();''')
curUrl = driver.current_url
print (curUrl)
print("click")

driver.execute_script('''f = eval("document.register"); 
f.name.value="김길동"; 
f.mobile1.value="010"; 
f.mobile2.value="1234"; 
f.mobile3.value="1234"; 
$("#but_exe").hide(); 
param = "prm1=" + f.name.value + "&prm2=" + f.mobile1.value + "-" + f.mobile2.value + "-" + f.mobile3.value; 
$.ajax({type: "POST",url: "rev.make2.ajax.php",data: param,dataType:"html",error: function(){alert("Ajax fail");},success: function(d){if( String( d ) == "0000" ){alert( "" );}else {f.submit();}}});''')
print("click")
