import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, StaleElementReferenceException

def test_navegacao_registro_chef():
    chrome_options = Options()
    chrome_options.add_argument("--start-maximized")

    driver = webdriver.Chrome(options=chrome_options)
    wait = WebDriverWait(driver, 30)  # timeout maior para páginas lentas

    try:
        # 1️⃣ Acessa a página inicial
        driver.get("http://localhost:8081")
        time.sleep(1)  # pequena pausa para JS carregar

        # 2️⃣ Clica no botão "Sou Chef"
        botao_chef_xpath = "//*[contains(text(), 'Sou Chef')] | //button[contains(., 'Sou Chef')]"
        for _ in range(5):
            try:
                elemento_chef = wait.until(EC.element_to_be_clickable((By.XPATH, botao_chef_xpath)))
                driver.execute_script("arguments[0].click();", elemento_chef)
                break
            except StaleElementReferenceException:
                time.sleep(0.5)

        # 3️⃣ Clica no botão "Não tenho conta (Registrar Chef)"
        registro_xpath = (
            "//*[contains(text(), 'Não tenho conta')] | "
            "//*[contains(text(), 'Registrar Chef')] | "
            "//a[contains(@href, 'register')] | "
            "//span[contains(., 'Criar conta')]"
        )
        link_registro = wait.until(EC.element_to_be_clickable((By.XPATH, registro_xpath)))
        driver.execute_script("arguments[0].scrollIntoView(true);", link_registro)
        driver.execute_script("arguments[0].click();", link_registro)

        # 4️⃣ Espera o modal de registro abrir
        modal_xpath = "//*[contains(text(), 'Registrar Novo Chef')]"
        WebDriverWait(driver, 20).until(
            EC.visibility_of_element_located((By.XPATH, modal_xpath))
        )

        # 5️⃣ Espera os inputs do modal ficarem visíveis
        input_email_xpath = "//input[@placeholder='Novo email']"
        input_senha_xpath = "//input[@placeholder='Nova senha']"

        WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.XPATH, input_email_xpath))
        )
        WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.XPATH, input_senha_xpath))
        )

        # 6️⃣ Screenshot garantido
        time.sleep(1)  # espera final para animações JS
        driver.save_screenshot("registro_chef_aberto.png")
        print("✅ Modal de cadastro aberto e screenshot salvo!")

        # Pausa opcional para ver o navegador antes de fechar
        print("💡 Pausa de 5 segundos antes de fechar o navegador...")
        time.sleep(5)

    except TimeoutException:
        driver.save_screenshot("erro_registro_chef.png")
        print("❌ Timeout: Modal de cadastro não carregou a tempo.")
        raise
    except Exception as e:
        driver.save_screenshot("erro_registro_chef.png")
        print(f"❌ Erro detectado: {e}")
        raise
    finally:
        driver.quit()

if __name__ == "__main__":
    test_navegacao_registro_chef()