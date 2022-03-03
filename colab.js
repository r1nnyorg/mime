import {chromium} from 'playwright-chromium'
import process from 'process'

const context = await chromium.launchPersistentContext('google-chrome', {channel:'chrome', args:['--disable-blink-features=AutomationControlled'], headless:false, recordVideo:{dir:'videos'}})
const colab = await context.newPage()
await colab.goto('https://colab.research.google.com/github/chaowenGUOorg/pal/blob/main/colab.ipynb')
await colab.waitForTimeout(10 * 1000)
await colab.keyboard.press('Control+F9')
await colab.click('#ok')
await colab.waitForTimeout(10 * 1000)
await colab.goto('https://www.intel.com/content/www/us/en/my-intel/devcloud-sign-in.html')
await colab.fill('input#txtUsername', 'chaowen.guo1@gmail.com')
await colab.fill('input#txtPassword', process.argv.at(2))
await colab.click('input#formSubmit')
await colab.click('h3#promo-main-heading-2>a')
await colab.click('h3#promo-main-heading-2~p:nth-child(4)>a')
await colab.waitForTimeout(60 * 1000)
await colab.dbclick('li[title^="Name: devcloud.ipynb"]')
await colab.waitForTimeout(10 * 1000)
await context.close()
