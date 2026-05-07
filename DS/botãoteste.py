import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import StaleElementReferenceException

def test_navegacao_sou_chef():
    # Configurações iniciais (seguindo seu modelo com adição de options)
    chrome_options = Options()
    chrome_options.add_argument("--start-maximized")
    
    driver = webdriver.Chrome(options=chrome_options)
    wait = WebDriverWait(driver, 20)
    
    try:
        # 1. Navega até a URL
        driver.get("http://localhost:8081")

        # 2. Localiza e clica no botão "Sou Chef"
        # Usamos uma estratégia de XPATH robusta similar ao seu modelo de login
        botao_chef_xpath = "//*[contains(text(), 'Sou Chef')] | //button[contains(., 'Sou Chef')] | //*[@id='btn-chef']"
        
        for _ in range(10):
            try:
                # Espera o botão estar clicável
                elemento_botao = wait.until(EC.element_to_be_clickable((By.XPATH, botao_chef_xpath)))
                
                # Usa JS Click (como no seu modelo) para garantir o clique mesmo com sobreposições
                driver.execute_script("arguments[0].click();", elemento_botao)
                break
            except StaleElementReferenceException:
                time.sleep(0.5)

        # 3. Verificação (Assert)
        # Aqui verificamos se a página mudou ou se algum elemento da área do Chef apareceu
        # Vou usar um texto genérico que costuma aparecer após o clique, ajuste conforme seu app
        verificacao_xpath = "//*[contains(text(), 'Login Chef')] | //*[contains(text(), 'Bem-vindo')] | //h1"
        
        sucesso_elemento = wait.until(EC.presence_of_element_located((By.XPATH, verificacao_xpath)))
        
        assert sucesso_elemento.is_displayed()
        print("Sucesso: A navegação para 'Sou Chef' funcionou corretamente.")
        
        # 4. Finalização e Screenshot
        time.sleep(2)
        driver.save_screenshot("navegacao_chef_sucesso.png")

    except Exception as e:
        # Tira print do erro se algo falhar
        driver.save_screenshot("erro_navegacao_chef.png")
        print(f"Erro detectado: {e}")
        raise e

    finally:
        # Fecha o navegador sempre
        driver.quit()

if __name__ == "__main__":
    test_navegacao_sou_chef()