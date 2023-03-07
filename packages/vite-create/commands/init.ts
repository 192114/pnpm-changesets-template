import inquirer from 'inquirer'
import validate from 'validate-npm-package-name'

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

export async function init(projectName: string): Promise<void> {
  await inquirer.prompt([
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
      message: '项目描述',
      name: 'description',
      validate(input: string) {
        return input !== ''
      },
    },
  ])
}
