import path from 'path'
import { type Choice } from 'prompts'

export function genChoicesList(appList: IAnswerType[]): Choice[] {
  return appList.map(item => ({
    title: `${item.projectName}(${item.dirname})`,
    value: item.dirname,
  }))
}

export const log = console.log

export const appsDirPath = path.resolve(process.cwd(), 'apps')

export const packagesDirPath = path.resolve(process.cwd(), 'packages')
