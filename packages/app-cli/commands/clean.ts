/**
 * 清除项目的 node_modules
 */
import prompts from 'prompts'
import fs from 'fs-extra'
import shell from 'shelljs'
import chalk from 'chalk'
import path from 'path'
import ora from 'ora'

const log = console.log

export async function clean(projectName: string, configPath: string): Promise<void> {
  const appListJson = fs.readJsonSync(configPath) as IAnswerType[]

  if (projectName) {
    const target = appListJson.find(item => item.projectName === projectName)

    if (!target) {
      log(chalk.red('文件夹不存在！'))
      shell.exit(1)
    } else {
      const targetDir = path.resolve(process.cwd(), 'apps', target.dirname, 'node_modules')
      const delOra = ora(`${targetDir} 删除中`).start()
      await fs.remove(targetDir)
      delOra.succeed(`${targetDir}删除成功`)
    }
  } else {
    const appListChoices = appListJson.map(item => ({
      title: `${item.projectName}(${item.dirname})`,
      value: item.dirname,
    }))

    const result: IChoicesType = await prompts({
      type: 'multiselect',
      message: '选择清除的项目',
      name: 'choicesList',
      choices: appListChoices,
    })

    const { choicesList } = result

    if (!choicesList || choicesList.length === 0) {
      log(chalk.red('无删除项'))
      shell.exit(1)
    }

    for (const deleteItem of choicesList) {
      const targetDir = path.resolve(process.cwd(), 'apps', deleteItem, 'node_modules')
      const delOra = ora(`删除${targetDir}`).start()
      await fs.remove(targetDir)
      delOra.succeed(`${targetDir}删除成功`)
    }
  }
}
