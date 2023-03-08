import prompts from 'prompts'
import validate from 'validate-npm-package-name'
import fs from 'fs-extra'
import path from 'path'

interface IAnswerType {
  projectName: string
  dirname: string
  description: string
}

function validatePackageName(projectName: string) {
  if (!validate(projectName).validForNewPackages) {
    return '包名不合法'
  }

  if (!projectName.startsWith('@apps/')) {
    return '包名称格式不正确(exp: @apps/react-app)'
  }

  return true
}

export async function init(projectName: string, configPath: string): Promise<void> {
  const appListJson = fs.readJsonSync(configPath) as IAnswerType[]

  const projectRes: IAnswerType = await prompts(
    [
      {
        type: validatePackageName(projectName) !== true ? 'text' : null,
        name: 'projectName',
        message: '请输入包名称',
        validate(value: string) {
          const res = validatePackageName(value)
          if (res !== true) {
            return res
          }

          if (appListJson.findIndex(appItem => appItem.projectName === value) >= 0) {
            return '包名已存在'
          }

          return true
        },
        initial: projectName,
      },
      {
        type: 'text',
        message: '项目文件夹名称',
        name: 'dirname',
        validate(value: string) {
          if (!fs.pathExistsSync(path.resolve(process.cwd(), './apps/', value))) {
            return '当前目录已存在'
          }
          return true
        },
      },
      {
        type: 'text',
        message: '项目项目描述',
        name: 'description',
        validate(value: string) {
          if (value === '') {
            return '项目描述不能为空'
          }
          return true
        },
      },
    ],
    {
      onCancel() {
        return false
      },
    }
  )

  console.log(projectRes)

  appListJson.push(projectRes)

  await fs.writeJSON(configPath, appListJson)
  console.log(new Date().getTime())

  await fs.ensureDir(path.resolve(process.cwd(), './apps/', projectRes.dirname))
  console.log(new Date().getTime())
}
