// import chalk from 'chalk'
// import ora from 'ora'
// import prompts from 'prompts'
// import shell from 'shelljs'
// import fs from 'fs-extra'

// const log = console.log

// export async function remove(projectName: string, configPath: string) {
//   const appListJson = await fs.readJson(configPath)

//   const removeRes = await prompts({
//     type: 'confirm',
//     message: `是否删除${projectName}?`,
//     name: 'isSure',
//     validate(value) {
//       return true
//     }
//   })

//   if (removeRes.isSure) {
//     const deleteSpin = ora('项目删除中').start()

//   } else {
//     log(chalk.red('取消删除！'))
//     shell.exit(1)
//   }
// }
