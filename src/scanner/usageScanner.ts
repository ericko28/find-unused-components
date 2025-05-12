import fs from 'fs'
import path from 'path'
import { glob } from 'glob'

import { normalizePath } from '../utils/pathUtils'

export function scanUsage(projectRoot, components) {
  const sourceFiles = glob.sync('**/*.{vue,js,ts}', {
    cwd: projectRoot,
    absolute: true,
    ignore: [
      'node_modules/**',
      '.nuxt/**',
      'dist/**',
      '.output/**',
      '**/__tests__/**',
    ],
  })

  for (const file of sourceFiles) {
    const content = fs.readFileSync(file, 'utf-8')

    const importRegex = /import\s+([\w${},\s*]+)\s+from\s+['"]([^'"]+)['"]/g
    let match
    while ((match = importRegex.exec(content))) {
      const imported = match[1]
      const importPath = match[2]
      let resolvedPath = ''

      if (
        importPath.startsWith('@/components/') ||
        importPath.startsWith('~/components/')
      ) {
        resolvedPath = path.join(
          projectRoot,
          'components',
          importPath.replace(/^[@~]\/components\//, ''),
        )
      } else if (importPath.startsWith('.')) {
        resolvedPath = path.resolve(path.dirname(file), importPath)
      } else {
        continue
      }

      resolvedPath = normalizePath(resolvedPath).replace(/\.(vue|js|ts)$/, '')

      const comp = components.find(
        (c) =>
          normalizePath(c.absolutePath).replace(/\.(vue|js|ts)$/, '') ===
          resolvedPath,
      )
      if (!comp) continue

      const aliases = []

      if (imported.startsWith('{')) {
        const named = imported
          .replace(/[{}]/g, '')
          .split(',')
          .map((s) => s.trim().split(' as ').pop())
        aliases.push(...named)
      } else {
        aliases.push(imported.trim())
      }

      for (const alias of aliases) {
        const usageRegex = new RegExp(`\\b${alias}\\b`)
        if (usageRegex.test(content)) {
          comp.used = true
        }
      }
    }

    components.forEach((comp) => {
      if (!comp.used && comp.autoImportRegex.some((r) => r.test(content))) {
        comp.used = true
      }
    })

    const asyncImportRegex =
      /defineAsyncComponent\(\s*\(\)\s*=>\s*import\(['"]([^'"]+)['"]\)\s*\)/g
    let asyncMatch
    while ((asyncMatch = asyncImportRegex.exec(content))) {
      const asyncImportPath = asyncMatch[1]
      let resolvedPath = ''

      if (
        asyncImportPath.startsWith('@/components/') ||
        asyncImportPath.startsWith('~/components/')
      ) {
        resolvedPath = path.join(
          projectRoot,
          'components',
          asyncImportPath.replace(/^[@~]\/components\//, ''),
        )
      } else if (asyncImportPath.startsWith('.')) {
        resolvedPath = path.resolve(path.dirname(file), asyncImportPath)
      } else {
        continue
      }

      resolvedPath = normalizePath(resolvedPath).replace(/\.(vue|js|ts)$/, '')

      const comp = components.find(
        (c) =>
          normalizePath(c.absolutePath).replace(/\.(vue|js|ts)$/, '') ===
          resolvedPath,
      )
      if (comp) comp.used = true
    }
  }
}
