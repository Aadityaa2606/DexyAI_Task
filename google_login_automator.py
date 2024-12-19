from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time

chrome_profile_path = "/home/aadityaa/.var/app/com.google.Chrome/config/google-chrome"

profile_name = "Default" 

chrome_options = Options()

chrome_options.add_argument(f"user-data-dir={chrome_profile_path}")
chrome_options.add_argument(f"profile-directory={profile_name}")

driver = webdriver.Chrome(options=chrome_options)

driver.get("https://wellfound.com/jobs/messages/966456197")

time.sleep(20)  

cookies = driver.get_cookies()

print(cookies)

driver.quit()
