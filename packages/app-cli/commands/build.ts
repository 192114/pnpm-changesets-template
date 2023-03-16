import shell from 'shelljs'
import fs from 'fs-extra'
import path from 'path'
import { genChoicesList, log } from '../tools'
import prompts from 'prompts'
import chalk from 'chalk'

// todo: 输出顺序

async function buildHandle(projectName: string) {
  // 清理对应项目的包
  const buildName = projectName.slice(6)
  const distPath = path.resolve(process.cwd(), 'dist', buildName)
  const isExist = await fs.pathExists(distPath)

  if (isExist) {
    await fs.remove(distPath)
  }

  shell.exec(`pnpm --filter ${projectName} run build --outDir ${distPath}`, { async: true })
}

export async function build(projectName: string, configPath: string): Promise<void> {
  if (projectName) {
    await buildHandle(projectName)
  } else {
    const appListJson = fs.readJsonSync(configPath) as IAnswerType[]
    const appListChoices = genChoicesList(appListJson, 'projectName')

    const result: IChoicesType = await prompts({
      name: 'choicesList',
      type: 'multiselect',
      message: '选择构建的项目',
      choices: appListChoices,
    })

    const { choicesList } = result

    if (!choicesList || choicesList.length === 0) {
      log(chalk.red('未选择构建项目'))
      shell.exit(1)
    }

    for (const item of choicesList) {
      await buildHandle(item)
    }
  }
}
