
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def run_teacher_test():
    
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

    driver.get("http://localhost:5173/teacher")

    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "assignment-title"))
    )

    driver.find_element(By.ID, "assignment-title").send_keys("Math Homework")

    student_dropdown = Select(driver.find_element(By.ID, "student-select"))
    student_dropdown.select_by_index(1)

    driver.find_element(By.ID, "deadline-input").send_keys("2026-03-20")
    driver.find_element(By.ID, "add-assignment-btn").click()

    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//td[contains(text(),'Math Homework')]"))
    )
    print("Assignment test case Passed")
    driver.quit()