from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def run_student_test():

    print("Running Student Module Test...")

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    wait = WebDriverWait(driver, 20)

    try:

        driver.get("http://localhost:5173/student")

        student_dropdown = wait.until(
            EC.presence_of_element_located((By.ID, "student-select"))
        )

        Select(student_dropdown).select_by_index(2)

        selected = Select(student_dropdown).first_selected_option.text

        if selected != "":
            print("Test 6: Student Select - PASSED")
        else:
            print("Test 6: Student Select - FAILED")


        assignment_row = wait.until(
            EC.presence_of_element_located(
                (By.XPATH, "//td[contains(text(),'Grammar Task')]")
            )
        )

        print("Test 7: Assignment Load - PASSED")


      
        submission_input = assignment_row.find_element(
            By.XPATH, "../td/input[contains(@id,'submission-input')]"
        )

        submission_input.send_keys("https://github.com/student-homework")

        if submission_input.get_attribute("value") != "":
            print("Test 8: Submission Input - PASSED")
        else:
            print("Test 8: Submission Input - FAILED")



        submit_btn = assignment_row.find_element(
            By.XPATH, "../td/button[contains(@id,'submit-btn')]"
        )

        wait.until(EC.element_to_be_clickable(submit_btn))
        submit_btn.click()

        print("Test 9: Submit Button Click - PASSED")


        
        status = wait.until(
            lambda d: assignment_row.find_element(
                By.XPATH, "../td/span[contains(@id,'status')]"
            ).text
        )

        if status == "submitted":
            print("Test 10: Status Update - PASSED")
        else:
            print("Test 10: Status Update - FAILED")


    except Exception as e:

        print("Student Module Test FAILED")
        print("Error:", e)

    finally:

        driver.quit()


