import path from 'path'
import { type Choice } from 'prompts'

export function genChoicesList(
  appList: IAnswerType[],
  valueKey: 'dirname' | 'projectName' = 'dirname'
): Choice[] {
  return appList.map(item => ({
    title: `${item.projectName}(${item.dirname})`,
    value: item[valueKey],
  }))
}

export const log = console.log

export const appsDirPath = path.resolve(process.cwd(), 'apps')

export const packagesDirPath = path.resolve(process.cwd(), 'packages')
