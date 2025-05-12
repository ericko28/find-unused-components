import fs from "node:fs";

export function saveUnusedReport(components, outputFile) {
    const unused = components
        .filter(c => !c.used)
        .map(c => ({ path: c.relativePath }));

    fs.writeFileSync(outputFile, JSON.stringify(unused, null, 2), 'utf-8');

    console.log(`\n📦 Componentes totales: ${components.length}`);
    console.log(`✅ Usados: ${components.filter(c => c.used).length}`);
    console.log(`❌ No usados: ${unused.length}`);
    console.log(`📄 Resultado guardado en: ${outputFile}`);
}
