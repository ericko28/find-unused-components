import path from 'node:path'
import { program } from 'commander'

export function getProjectPaths() {
  program
    .name('find-unused-components')
    .description('Analiza componentes no usados en un proyecto Nuxt 3')
    .option('-p, --project <path>', 'Ruta del proyecto Nuxt', '.')
    .option('--reporter <type>', 'Generar reporte HTML', 'html')
    .parse()

  const options = program.opts()

  const reporter = options.reporter

  const projectRoot = options.project
    ? path.resolve(options.project)
    : path.resolve(__dirname, './')
  const componentsDir = path.join(projectRoot, 'components')
  const outputFile = path.join('.', 'unused-components.json')

  return { projectRoot, componentsDir, outputFile, reporter }
}
