# 🔍 Find Unused Components in Nuxt 3

Este CLI analiza un proyecto Nuxt 3 y genera un reporte con los **componentes no utilizados**, incluyendo soporte para:

- ✅ Imports estáticos y dinámicos (`defineAsyncComponent`)
- ✅ Auto-imports basados en directorios (`components/`)
- ✅ Alias personalizados (`@`, `~`)
- ✅ Diferencias entre nombre de archivo y nombre de importación

---

## 🚀 Instalación

### Global

```bash
pnpm install -g .
```

### Local (para desarrollo o uso interno)

```bash
pnpm install
pnpm run build
```

---

## 🧑‍💻 Uso

```bash
find-unused-components --project=./ruta/al/proyecto
```

Si lo ejecutas localmente (sin instalar globalmente):

```bash
pnpm exec find-unused-components --project=./ruta/al/proyecto
```

---

## 📦 Output

El script genera un archivo `unused-components.json` en la raíz del proyecto con todos los componentes que **no se usan**:

```json
[
  {
    "path": "components/IceCard.vue",
    "importName": "IceCard"
  },
  ...
]
```

---

## 🛠️ Scripts útiles

```bash
pnpm run build   # Compila el CLI con esbuild
pnpm run lint    # Linter con ESLint y TypeScript
pnpm run format  # Formatea el código con Prettier
```

---

## 🧪 Linting y formato

Este proyecto usa:

- [`eslint`](https://eslint.org/)
- [`@typescript-eslint`](https://typescript-eslint.io/)
- [`prettier`](https://prettier.io/)

---

## 📁 Estructura del proyecto

```
src/
├── index.ts            # CLI principal
├── config.ts           # Parseo de argumentos y rutas
├── scanner/            # Escaneo de componentes y uso
│   ├── componentFinder.ts
│   └── usageScanner.ts
└── utils/              # Utilidades generales
    ├── pathUtils.ts
    └── fileUtils.ts
```

---

## 📋 TODOs

- [ ] Soporte para componentes globales de librerías externas
- [ ] Modo interactivo para confirmar si un componente debe eliminarse
- [ ] Opcional: generar reporte en Markdown o HTML

---

## ⚖️ Licencia

MIT © TuNombre
