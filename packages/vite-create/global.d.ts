interface IAnswerType {
  projectName: string
  dirname: string
  description: string
}

interface IInstallAnsType {
  isInstall: boolean
}

interface IRemoveAnsType {
  deleteList: string[]
}
