import {chromium} from 'playwright-chromium'
import os from 'os'
import process from 'process'

const browser = await chromium.launch({channel:'chrome', args:['--disable-blink-features=AutomationControlled'], headless:false})
globalThis.setTimeout(async () => await browser.close(), 1000 * 60 * 60 * 5.7)
const context = await browser.newContext({recordVideo:{dir:'videos'}})
const alexamaster = await context.newPage()
const client = await context.newCDPSession(alexamaster)
await client.send('Emulation.setScriptExecutionDisabled', {value:true})
await alexamaster.goto('https://cashmining.me/')
const form = await alexamaster.$('form')
await form.evaluateHandle(_ => {_.style.opacity = 1; _.style.display = 'block'})
await alexamaster.$('head').then(_ => _.evaluateHandle(_ => _.remove()))
await alexamaster.$('body').then(_ => _.evaluateHandle(_ => _.innerHTML = ''))
await alexamaster.$('body').then(_ => _.evaluateHandle((_, form) => _.append(form), form))
await alexamaster.fill('input[name="user"]', 'chaowen.guo1@gmail.com')
await alexamaster.fill('input[name="password"]', process.argv.at(2))
await alexamaster.click('button[name="connect"]')
await client.send('Emulation.setScriptExecutionDisabled', {value:false})
//const client = await context.newCDPSession(alexamaster)
//const {result} = await client.send('Runtime.evaluate', {expression:'globalThis', includeCommandLineAPI:true, objectGroup:'handler'}) //https://stackoverflow.com/questions/63059096/chrome-devtools-protocol-how-to-get-click-event-handler-name-of-a-node
//const {listeners} = await client.send('DOMDebugger.getEventListeners', {objectId:result.objectId})
//console.log(listeners)
//await client.send('Runtime.releaseObjectGroup', {objectGroup:'handler'})
const popup = await context.newPage()
await popup.goto('http://cashmining.me/mining.php')
await alexamaster.evaluateHandle(cpus => globalThis.WMP.User(globalThis.document.querySelector('div#wmp-container').getAttribute('wmp-site-key'), globalThis.document.querySelector('div#wmp-container').getAttribute('wmp-username'), {threads:cpus,autoThreads:false,throttle:globalThis.document.querySelector('div#wmp-container').getAttribute('wmp-throttle'),forceASMJS:false}).start(), os.cpus().length)
const it = await browser.newPage({recordVideo:{dir:'videos'}})
await it.goto('https://cashmining.forumforyou.it/')
await it.click('a.nav-link')
await it.fill('input[name="user"]', 'chaowen.guo1@gmail.com')
await it.fill('input[name="password"]', process.argv.at(2))
await it.click('button[name="connect"]')
await globalThis.Promise.all([it.waitForEvent('popup'), it.click('button[onclick]')])
const pro = await browser.newPage({recordVideo:{dir:'videos'}})
await pro.goto('https://cmpro.mn-shop.com/')
await pro.click('a.nav-link')
await pro.fill('input#userLogin', 'chaowen.guo1@gmail.com')
await pro.fill('input#userPass', process.argv.at(2))
await pro.click('button[onclick^=login]')
await globalThis.Promise.all([pro.waitForEvent('popup'), pro.click('button[onclick^=window]')])
