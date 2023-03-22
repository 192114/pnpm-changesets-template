import shell from 'shelljs'
import fs from 'fs-extra'
import prompts from 'prompts'
import chalk from 'chalk'
import ora from 'ora'
import { genChoicesList, log } from '../tools'

export async function build(projectName: string, configPath: string): Promise<void> {
  if (projectName) {
    const command = `pnpm run --parallel -r --filter ${projectName} build`
    const buildSpin = ora(`执行命令:${command}`).start()
    shell.exec(command, { async: true })
    buildSpin.succeed('构建成功')
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

    const projectFilterStr = choicesList.map(item => `--filter ${item}`).join(' ')

    const command = `pnpm run --parallel -r --aggregate-output ${projectFilterStr} build`
    const buildSpin = ora(`执行命令:${command}\n`).start()
    shell.exec(command, { async: true }, code => {
      if (code === 0) {
        buildSpin.succeed('构建成功')
      }
    })
  }
}
