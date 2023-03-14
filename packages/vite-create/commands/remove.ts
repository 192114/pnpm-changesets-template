import chalk from 'chalk'
import ora from 'ora'
import prompts from 'prompts'
import shell from 'shelljs'
import fs from 'fs-extra'
import path from 'path'

const log = console.log

export async function remove(projectName: string, configPath: string): Promise<void> {
  const appListJson = (await fs.readJson(configPath)) as IAnswerType[]

  // 如果传项目名称则直接删除
  if (projectName) {
    const current = appListJson.find(item => item.projectName === projectName)

    if (!current) {
      log(chalk.red('项目不存在！'))
      shell.exit(1)
    } else {
      const dirPathname = path.resolve(process.cwd(), './apps/', current.dirname)
      const deleteSpin = ora(`删除项目${projectName}中`).start()
      const nextAppList = appListJson.filter(item => item.projectName !== projectName)
      await fs.remove(dirPathname)
      await fs.writeJSON(configPath, nextAppList)
      deleteSpin.succeed('删除成功！')
    }
  } else {
    // 手动列表选择删除
    const appListChoices = appListJson.map(item => ({
      title: `${item.projectName}(${item.dirname})`,
      value: item.dirname,
    }))

    const removeRes: IRemoveAnsType = await prompts({
      type: 'multiselect',
      message: '请选择要删除的包！',
      choices: appListChoices,
      name: 'deleteList',
    })

    const { deleteList } = removeRes

    if (!deleteList || deleteList.length === 0) {
      log(chalk.red('无删除项'))
      shell.exit(1)
    }

    const nextAppList = appListJson.filter(item =>
      deleteList.every(deleteItem => deleteItem !== item.dirname)
    )

    for (const current of deleteList) {
      const pName = appListChoices.find(item => item.value === current)!.title
      const deleteSpin = ora(`删除${pName}中`).start()
      const dirPathname = path.resolve(process.cwd(), './apps/', current)
      await fs.remove(dirPathname)
      deleteSpin.succeed(`删除${pName}成功！`)
    }

    await fs.writeJSON(configPath, nextAppList)
  }
}
