import path from 'node:path'

export function getProjectPaths() {
  const argProject = process.argv.find((arg) => arg.startsWith('--project='))
  const inputProjectPath = argProject ? argProject.split('=')[1] : null
  const projectRoot = inputProjectPath
    ? path.resolve(inputProjectPath)
    : path.resolve(__dirname, './')
  const componentsDir = path.join(projectRoot, 'components')
  const outputFile = path.join('.', 'unused-components.json')

  return { projectRoot, componentsDir, outputFile }
}
