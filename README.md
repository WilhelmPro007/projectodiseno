# Proyecto de Diseño de Sistemas - NestJS & Prisma

Este repositorio contiene el desarrollo del proyecto de Diseño de Sistemas, organizado por etapas según las guías didácticas entregadas.

## 📚 Guías del Proyecto

| Guía | Tema | Documentación |
| :--- | :--- | :--- |
| **Guía 1** | Configuración Inicial de NestJS | [Resumen Guía 1](./docs/resumen-guia-1.md) |
| **Guía 2** | CRUD Profesional con Prisma & Swagger | [Resumen Guía 2](./docs/resumen-guia-2.md) |
| **Guía 3** | Autenticación JWT & Passport | [Resumen Guía 3](./docs/resumen-guia-3.md) |

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js (v20+)
- npm

### Instalación
```bash
# Instalar dependencias
npm install

# Generar cliente de Prisma
npx prisma generate

# Ejecutar migraciones (SQLite)
npx prisma migrate dev
```

### Ejecución
```bash
# Modo desarrollo
npm run start:dev
```

### 🔗 Enlaces Útiles
- **Documentación API (Swagger):** `http://localhost:3002/api` (por defecto)
- **Base de Datos:** SQLite (`prisma/dev.db`)

---
© 2026 - Proyecto de Diseño de Sistemas
