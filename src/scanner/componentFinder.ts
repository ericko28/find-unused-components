import path from 'node:path'
import { glob } from 'glob'
import { normalizePath, pascalCase } from '../utils/pathUtils'

export function findComponents(projectRoot, componentsDir) {
  const files = glob.sync('**/*.{vue,js,ts}', {
    cwd: componentsDir,
    absolute: true,
  })

  return files.map((file) => {
    const relative = normalizePath(path.relative(projectRoot, file))
    const short = relative
      .replace(/^components\//, '')
      .replace(/\.(vue|js|ts)$/, '')
    return {
      absolutePath: file,
      relativePath: relative,
      shortPath: short,
      used: false,
      autoImportRegex: [
        new RegExp(`<${pascalCase(short)}[\\s/>]`),
        new RegExp(
          `<${pascalCase(short)
            .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
            .toLowerCase()}[\\s/>]`,
        ),
      ],
    }
  })
}
