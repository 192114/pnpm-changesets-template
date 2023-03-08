import { Command } from 'commander'
import { init } from '../commands/init'
import path from 'path'

interface IActionOptionType {
  c: string
}

const excutePath = process.cwd()

const program = new Command()

program
  .command('init [projectName]')
  .option('-c', '--config', path.resolve(excutePath, './configs/appList.json'))
  .description('初始化项目')
  .action(async (projectName: string, option: IActionOptionType) => {
    const configPath = option.c
    await init(projectName, configPath)
  })

program.parse()
