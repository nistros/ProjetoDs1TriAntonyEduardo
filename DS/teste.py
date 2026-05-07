from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

chrome_options = Options()
chrome_options.add_argument("--start-maximized")
driver = webdriver.Chrome(options=chrome_options)

try:
    driver.get("http://localhost:8081")
    wait = WebDriverWait(driver, 10)

    # Clicar no botão "Sou Cliente"
    wait.until(
        EC.element_to_be_clickable((By.XPATH, '//*[contains(text(),"Sou Cliente")]'))
    ).click()  # clique imediatamente sem armazenar

    # Clicar no botão "Entrar como Cliente"
    wait.until(
        EC.element_to_be_clickable((By.XPATH, '//*[contains(text(),"Entrar como Cliente")]'))
    ).click()

    # Tirar screenshot
    driver.save_screenshot("screenshot_login.png")
    print("Screenshot salva como screenshot_login.png")

finally:
    driver.quit()