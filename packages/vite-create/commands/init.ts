import prompts from 'prompts'
import validate from 'validate-npm-package-name'
import fs from 'fs-extra'
import path from 'path'
import clone from 'git-clone/promise.js'
import ora from 'ora'

interface IAnswerType {
  projectName: string
  dirname: string
  description: string
  port: number
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
          if (fs.pathExistsSync(path.resolve(process.cwd(), './apps/', value))) {
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
      {
        type: 'number',
        message: '项目启动端口号',
        name: 'port',
        validate(value: number) {
          if (value <= 5172 || value >= 8080) {
            return '端口限制在5172 - 8080 之间！'
          }

          if (appListJson.findIndex(item => item.port === value) >= 0) {
            return '端口号已被占用！'
          }

          return true
        },
      },
    ],
    {
      onCancel() {
        console.log('cancel')
        // false 终止所有问题 true 终止当前问题 继续下一个
        return false
      },
    }
  )

  // 处理中止的情况
  if (
    !projectRes.projectName ||
    !projectRes.dirname ||
    !projectRes.description ||
    !projectRes.port
  ) {
    return
  }

  // 创建文件夹
  const targetDir = path.resolve(process.cwd(), './apps/', projectRes.dirname)
  const spinForCreateDir = ora(`创建${targetDir}目录`).start()
  await fs.ensureDir(path.resolve(process.cwd(), './apps/', projectRes.dirname))
  spinForCreateDir.succeed('目录创建成功！')
  // 从github上下载工程
  const spinCloneTemplate = ora('模版下载中').start()
  await clone(
    'https://github.com/192114/vite-react-ts-template-for-monorepo.git',
    path.resolve(process.cwd(), './apps/', projectRes.dirname)
  )
  spinCloneTemplate.succeed('模版下载成功！')
  // 修改模版
  // handlebars 修改模版

  appListJson.push(projectRes)

  await fs.writeJSON(configPath, appListJson)
}
