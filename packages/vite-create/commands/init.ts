import prompts from 'prompts'
import validate from 'validate-npm-package-name'
import fs from 'fs-extra'
import path from 'path'
import clone from 'git-clone/promise.js'
import ora from 'ora'
import Handlebars from 'handlebars'
import chalk from 'chalk'
import shell from 'shelljs'

const log = console.log

interface IAnswerType {
  projectName: string
  dirname: string
  description: string
}

interface IInstallAnsType {
  isInstall: boolean
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
  if (!projectRes.projectName || !projectRes.dirname || !projectRes.description) {
    return
  }

  const { projectName: pName, dirname, description } = projectRes

  // 创建文件夹
  const targetDir = path.resolve(process.cwd(), './apps/', dirname)
  const spinForCreateDir = ora(`创建${targetDir}目录`).start()
  await fs.ensureDir(targetDir)
  spinForCreateDir.succeed('目录创建成功！')
  // 从github上下载工程
  const spinCloneTemplate = ora('模版下载中').start()
  await clone('https://github.com/192114/vite-react-ts-template-for-monorepo.git', targetDir)
  spinCloneTemplate.succeed('模版下载成功！')

  // 修改模版
  const spinTemplate = ora('模板生成中')
  const targetPackageFile = await fs.readFile(path.resolve(targetDir, './package.json'))

  const packageJsonStr = targetPackageFile.toString()

  const packageJsonTemplate = Handlebars.compile(packageJsonStr)

  packageJsonTemplate({ projectName: pName, description })

  spinTemplate.succeed('模板生成成功！')

  appListJson.push(projectRes)

  await fs.writeJSON(configPath, appListJson)

  log(chalk.green('项目生成成功！'))

  const installRes: IInstallAnsType = await prompts({
    type: 'confirm',
    message: '是否自动安装依赖？',
    name: 'isInstall',
  })

  if (installRes.isInstall) {
    const pnpmInstallRes = shell.exec(`pnpm --filter @apps/${pName} install`)

    if (pnpmInstallRes.code === 0) {
      log(chalk.green('pnpm install 命令执行成功'))
    } else {
      log(chalk.red('pnpm install 命令执行失败'))
    }
  }

  log(`启动:${chalk.blue.bold.underline(`pnpm --filter @apps/${pName} run dev`)}`)
}
