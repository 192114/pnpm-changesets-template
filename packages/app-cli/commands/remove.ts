/**
 * 删除项目
 */
import chalk from 'chalk'
import ora from 'ora'
import prompts from 'prompts'
import shell from 'shelljs'
import fs from 'fs-extra'
import path from 'path'

import { log, genChoicesList, appsDirPath } from '../tools'

export async function remove(projectName: string, configPath: string): Promise<void> {
  const appListJson = (await fs.readJson(configPath)) as IAnswerType[]

  // 如果传项目名称则直接删除
  if (projectName) {
    const current = appListJson.find(item => item.projectName === projectName)

    if (!current) {
      log(chalk.red('项目不存在！'))
      shell.exit(1)
    } else {
      const dirPathname = path.resolve(appsDirPath, current.dirname)
      const deleteSpin = ora(`删除项目${projectName}中`).start()
      const nextAppList = appListJson.filter(item => item.projectName !== projectName)
      await fs.remove(dirPathname)
      await fs.writeJSON(configPath, nextAppList)
      deleteSpin.succeed('删除成功！')
    }
  } else {
    // 手动列表选择删除
    const appListChoices = genChoicesList(appListJson)

    const removeRes: IChoicesType = await prompts({
      type: 'multiselect',
      message: '请选择要删除的包！',
      choices: appListChoices,
      name: 'choicesList',
    })

    const { choicesList } = removeRes

    if (!choicesList || choicesList.length === 0) {
      log(chalk.red('无删除项'))
      shell.exit(1)
    }

    const nextAppList = appListJson.filter(item =>
      choicesList.every(deleteItem => deleteItem !== item.dirname)
    )

    for (const current of choicesList) {
      const dirPathname = path.resolve(appsDirPath, current)
      const deleteSpin = ora(`删除${dirPathname}中`).start()
      await fs.remove(dirPathname)
      deleteSpin.succeed(`删除${dirPathname}成功！`)
    }

    await fs.writeJSON(configPath, nextAppList)
  }
}
