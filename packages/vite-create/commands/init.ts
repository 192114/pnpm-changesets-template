import inquirer from 'inquirer'
import validate from 'validate-npm-package-name'
import fs from 'fs-extra'
import path from 'path'

interface IAnswerType {
  projectName: string
  description: string
}

// type AnswerType = ReturnType<typeof Answers>

function validatePackageName(projectName: string) {
  if (!validate(projectName).validForNewPackages) {
    return '包名不合法'
  }

  if (!projectName.startsWith('@apps/')) {
    return '包名称格式不正确(exp: @apps/react-app)'
  }

  console.log(projectName)
  return true
}

export async function init(projectName: string, configPath: string): Promise<void> {
  const configFileBuffer = await fs.readFile(configPath)

  const configJson = JSON.parse(configFileBuffer.toString()) as IAnswerType[]

  console.log(configJson)

  const projectRes = (await inquirer.prompt([
    {
      type: 'input',
      message: '包名称',
      default: projectName,
      name: 'projectName',
      when: validatePackageName(projectName) !== true,
      validate(input: string) {
        return validatePackageName(input)
      },
    },
    {
      type: 'input',
      message: '项目文件夹名称',
      name: 'dirname',
      validate(input: string) {
        return !fs.pathExistsSync(path.resolve(process.cwd(), './apps/', input))
      },
    },
    {
      type: 'input',
      message: '项目描述',
      name: 'description',
      validate(input: string) {
        return input !== ''
      },
    },
  ])) as IAnswerType

  console.log(projectRes)
}
