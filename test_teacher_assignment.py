from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def run_teacher_test():

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    wait = WebDriverWait(driver, 10)

    driver.get("http://localhost:5173/teacher")

    try:
      
        title = wait.until(EC.presence_of_element_located((By.ID, "assignment-title")))
        title.send_keys("Math Homework")

        if title.get_attribute("value") == "Math Homework":
            print("Test 1: Title Input -  PASSED")
        else:
            print("Test 1: Title Input -  FAILED")


        student_dropdown = Select(driver.find_element(By.ID, "student-select"))
        student_dropdown.select_by_index(1)

        selected = student_dropdown.first_selected_option.text

        if selected != "":
            print("Test 2: Student Select - PASSED")
        else:
            print("Test 2: Student Select - FAILED")
       
        deadline = driver.find_element(By.ID, "deadline-input")
        deadline.send_keys("2026-03-20")

        if deadline.get_attribute("value") != "":
            print("Test 3: Deadline Input : PASSED")
        else:
            print("Test 3: Deadline Input : FAILED")
        
        add_btn = driver.find_element(By.ID, "add-assignment-btn")
        add_btn.click()

        print("Test 4: Button Click - PASSED")

        wait.until(
            EC.presence_of_element_located(
                (By.XPATH, "//td[contains(text(),'Math Homework')]")
            )
        )


        print("Test 5: Assignment Added : PASSED")


    except Exception as e:
        print("Teacher test case (output) FAILED ")
        print(e)

    finally:
        driver.quit()


