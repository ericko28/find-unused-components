import fs from 'fs'
import path from 'path'

interface UnusedComponent {
  path: string
}

export function generateHtmlReport(components: UnusedComponent[]) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Unused Components Report</title>
  <style>
    body { font-family: sans-serif; padding: 2rem; }
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    th, td { padding: 0.5rem; border: 1px solid #ddd; text-align: left; }
    th { background-color: #f4f4f4; }
  </style>
</head>
<body>
  <h1>Unused Components Report</h1>
  <p>Total: ${components.length} component(s)</p>
  <table>
    <thead>
      <tr><th>Path</th></tr>
    </thead>
    <tbody>
      ${components
        .map(
          (c) => `
        <tr>
          <td>${c.path}</td>
        </tr>`,
        )
        .join('')}
    </tbody>
  </table>
</body>
</html>`

  fs.writeFileSync(path.join('.', 'unused-components.html'), html, 'utf-8')
  console.log(`📄 Resultado guardado en: unused-components.html`)
}
