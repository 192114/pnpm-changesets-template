import { Command } from 'commander'

const program = new Command()

program
  .command('init [projectName]')
  .description('初始化项目')
  .action(projectName => {
    console.log(projectName)
  })

program.parse()
