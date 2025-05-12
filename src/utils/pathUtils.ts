export function normalizePath(p: string) {
    return p.replace(/\\/g, '/');
}

export function pascalCase(str: string) {
    return str
        .split(/[\/\-]/)
        .map((s: string) => s.charAt(0).toUpperCase() + s.slice(1))
        .join('');
}

