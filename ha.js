import {chromium} from 'playwright-chromium'

const browser = await chromium.launch({executablePath:'/usr/bin/google-chrome', args:['--disable-blink-features=AutomationControlled'], headless:false})
const context = await browser.newContext({recordVideo:{dir:'videos'}})
const alexamaster = await context.newPage()
await alexamaster.goto('https://cashmining.me/')
await alexamaster.waitForSelector('a.nav-link').then(_ => _.evaluateHandle(_ => _.click()))//
/*await alexamaster.waitForSelector('iframe#_0x57m21').then(_ => _.evaluateHandle(_ => _.remove()))
await alexamaster.fill('input[name="user"]', 'chaowen.guo1@gmail.com')
await alexamaster.fill('input[name="password"]', 'HL798820y+')
await alexamaster.click('button[name="connect"]')
await alexamaster.click('a#wmp-start')
const [popup] = await globalThis.Promise.all([alexamaster.waitForEvent('popup'), alexamaster.click('button[onclick]')])
await popup.bringToFront()
await alexamaster.evaluate(() => globalThis.scrollTo(0, globalThis.document.body.scrollHeight))
const it = await context.newPage()
await it.goto('https://cashmining.forumforyou.it/')
await it.click('a.nav-link')
await it.fill('input[name="user"]', 'chaowen.guo1@gmail.com')
await it.fill('input[name="password"]', 'HL798820y+')
await it.click('button[name="connect"]')
const [popupit] = await globalThis.Promise.all([it.waitForEvent('popup'), it.click('button[onclick]')])
await popupit.bringToFront()*/
await alexamaster.waitForTimeout(1000 * 60 * 2)
await browser.close()
