from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.support import expected_conditions as EC



def run_student_test():

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

    driver.get("http://localhost:5173/student") 
    wait = WebDriverWait(driver, 20)  

    student_dropdown = wait.until(lambda d:d.find_element(By.ID, "student-select") 

    if len(d.find_elements(By.XPATH, "//select[@id='student-select']/option")) > 1 
    else False)

    Select(student_dropdown).select_by_index(2)  

    assignment_row = wait.until(
    lambda d: d.find_element(By.XPATH, "//td[contains(text(),'Grammar Task')]"))

    submission_input = assignment_row.find_element(
    By.XPATH, "../td/input[contains(@id,'submission-input')]")
    wait.until(EC.element_to_be_clickable(submission_input))


    submission_input.send_keys("https://github.com/student-homework")
    submit_btn = assignment_row.find_element(
    By.XPATH, "../td/button[contains(@id,'submit-btn')]")

    wait.until(EC.element_to_be_clickable(submit_btn))
    submit_btn.click()


    wait.until(lambda d: 
    assignment_row.find_element(By.XPATH, "../td/span[contains(@id,'status')]").text == "submitted")
    print("Student submit test case passed!")
    driver.quit()  

 





    



























    
