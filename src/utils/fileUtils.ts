import { generateHtmlReport } from '../report/htmlReport'

export function saveUnusedReport(components, type: 'html' | 'md') {
  const unused = components
    .filter((c) => !c.used)
    .map((c) => ({ path: c.relativePath }))

  if (type === 'html') generateHtmlReport(unused)

  console.log(`\n📦 Componentes totales: ${components.length}`)
  console.log(`✅ Usados: ${components.filter((c) => c.used).length}`)
  console.log(`❌ No usados: ${unused.length}`)
}
