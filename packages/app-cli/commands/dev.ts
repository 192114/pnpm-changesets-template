import fs from 'fs-extra'
import prompts from 'prompts'
import shell from 'shelljs'
import portfinder from 'portfinder'
import chalk from 'chalk'
import address from 'address'
import chrome from 'chrome-launcher'
import { genChoicesList, log } from '../tools'
import path from 'path'

interface IAttachConfigItemType {
  type: 'chrome'
  request: 'attach'
  name: string
  port: number
}

interface ILaunchType {
  configurations: IAttachConfigItemType[]
  version: string
  compounds?: {
    name: string
    configurations: string[]
  }[]
}

function genAttachItem(port: number, description: string): IAttachConfigItemType {
  return {
    type: 'chrome',
    request: 'attach',
    name: `Attach 模式 - ${description}`,
    port,
  }
}

async function startDevAndOpenBroswer(projectName: string, ip: string) {
  const port = await portfinder.getPortPromise()

  shell.exec(`pnpm --filter ${projectName} run dev --port=${port}`, { async: true })

  await chrome.launch({
    port,
    startingUrl: `${ip}:${port}`,
    chromeFlags: ['--auto-open-devtools-for-tabs'],
    // userDataDir: false,
  })

  return genAttachItem(port, projectName)
}

export async function dev(projectName: string, configPath: string): Promise<void> {
  const appListJson = fs.readJsonSync(configPath) as IAnswerType[]
  const ip = address.ip() as string

  const launchJsonPath = path.resolve(process.cwd(), '.vscode/launch.json')

  const launchJson = (await fs.readJSON(launchJsonPath)) as ILaunchType

  if (projectName) {
    const configItem = await startDevAndOpenBroswer(projectName, ip)
    launchJson.configurations = []
    launchJson.configurations.push(configItem)
    await fs.writeJSON(launchJsonPath, launchJson)
  } else {
    const appListChoices = genChoicesList(appListJson, 'projectName')

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

    launchJson.configurations = []
    for (const item of choicesList) {
      const configItem = await startDevAndOpenBroswer(item, ip)
      launchJson.configurations.push(configItem)
    }
    launchJson.compounds = [
      {
        name: '调试全部程序',
        configurations: launchJson.configurations.map(item => item.name),
      },
    ]
    await fs.writeJSON(launchJsonPath, launchJson)
  }
}
