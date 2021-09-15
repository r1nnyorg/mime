import {chromium} from 'playwright-chromium'

const browser = await chromium.launch({channel:'chrome', args:['--disable-blink-features=AutomationControlled'], headless:false})
const context = await browser.newContext({recordVideo:{dir:'videos'}})
const ytuner = await context.newPage()
await ytuner.goto('https://www.ytuner.com/user/login')
await ytuner.click('a.tos-agree')
await ytuner.fill('input#email','fedoxox338@silbarts.com')
await ytuner.fill('input#pass', '1qazxsw2')
await ytuner.click('a.form-submit')
await ytuner.waitForNavigation()
await ytuner.goto('https://www.ytuner.com/dashboard/credits/work')
await ytuner.click('a[href^="work"]')
while (!globalThis.Object.is(await ytuner.url(), 'https://www.ytuner.com/dashboard/credits/work/finish'))
{
    const id = await ytuner.waitForSelector('input#code').then(_ => _.getAttribute('value'))
    const youtube = await context.newPage()
    await youtube.goto('https://www.youtube.com/watch?v=' + id)
    const moviePlayer = await youtube.$('div#movie_player')
    await moviePlayer.evaluateHandle(_ => _.style.display = 'block')
    await moviePlayer.waitForElementState('visible')
    await moviePlayer.evaluateHandle(_ => _.playVideo())
    const duration = await moviePlayer.evaluateHandle(_ => _.getDuration()).then(_ => _.jsonValue())
    console.log(duration)
    const startStep = await ytuner.$('button#start_step')
    await startStep.getProperty('classList').then(_ => _.evaluateHandle(_ => _.remove('disabled')))
    await startStep.waitForElementState('visible')
    await startStep.click()
    //await ytuner.evaluate(() => globalThis.scrollTo(0, globalThis.document.body.scrollHeight))
    //await new globalThis.Promise(_ => globalThis.setTimeout(_, 1000))
    const restart = await ytuner.waitForSelector('button.restartProcess')
    await restart.evaluateHandle(_ => _.parentElement.nextElementSibling.querySelector('button')).then(_ => _.asElement().click())
    //await ytuner.evaluate(() => globalThis.scrollTo(0, globalThis.document.body.scrollHeight))
    //await new globalThis.Promise(_ => globalThis.setTimeout(_, 1000))
    await ytuner.fill('input#url','https://youtu.be/' + id)
    await ytuner.click('button#validate-url')
    await ytuner.click('button#openForm')
    const industry = await ytuner.$('select#industry')
    await industry.evaluateHandle(_ => _.style.display = 'block')
    await industry.waitForElementState('visible')
    await industry.selectOption('CP')
    let option = [null, globalThis.Number.POSITIVE_INFINITY]
    const select = await ytuner.$('select#time')
    await select.evaluateHandle(_ => _.style.display = 'block')
    await select.waitForElementState('visible')
    for await (const _ of await select.$$(':scope>option').then(_ => _.map(_ => _.getAttribute('value'))))
    {
        const [hour, minute, second] = _.split(':').map(globalThis.Number)
	const distance = globalThis.Math.abs(hour * 3600 + minute * 60 + second - duration)
        if (distance < option[1]) option = [_, distance]
    }
    await select.selectOption(option[0])
    await ytuner.waitForSelector('input#form-agree').then(_ => _.evaluateHandle(_ => _.click()))
    while (!globalThis.Object.is(await moviePlayer.evaluateHandle(_ => _.getPlayerState()).then(_ => _.jsonValue()), 0))
    {
        await youtube.waitForTimeout(1000 * 60)
	console.log(await moviePlayer.evaluateHandle(_ => _.getPlayerState()).then(_ => _.jsonValue()))
    }
    await youtube.close()
    await ytuner.click('a#submit')
}
await browser.close()
