import { Command } from 'commander'
import { init } from '../commands/init'

const program = new Command()

program
  .command('init [projectName]')
  .description('初始化项目')
  .action(async (projectName: string) => {
    await init(projectName)
  })

program.parse()
