import fs from 'fs-extra'
import prompts from 'prompts'
import shell from 'shelljs'
import portfinder from 'portfinder'
import chalk from 'chalk'
import address from 'address'
import chrome from 'chrome-launcher'
import { genChoicesList, log } from '../tools'

// function genAttachItem(port: number, description: string) {
//   return {
//     type: 'chrome',
//     request: 'attach',
//     name: `Attach 模式 - ${description}`,
//     port,
//   }
// }

async function startDevAndOpenBroswer(projectName: string, ip: string) {
  const port = await portfinder.getPortPromise()

  shell.exec(`pnpm --filter ${projectName} run dev --port=${port}`, { async: true })

  await chrome.launch({
    port,
    startingUrl: `${ip}:${port}`,
    chromeFlags: ['--auto-open-devtools-for-tabs'],
    // userDataDir: false,
  })
}

export async function dev(projectName: string, configPath: string): Promise<void> {
  const appListJson = fs.readJsonSync(configPath) as IAnswerType[]
  const ip = address.ip() as string
  if (projectName) {
    await startDevAndOpenBroswer(projectName, ip)
  } else {
    const appListChoices = genChoicesList(appListJson)

    const result: IChoicesType = await prompts({
      name: 'choicesList',
      type: 'multiselect',
      message: '选择启动的项目',
      choices: appListChoices,
    })

    const { choicesList } = result

    if (!choicesList || choicesList.length === 0) {
      log(chalk.red('未选择启动项目'))
      shell.exit(1)
    }
  }
}
