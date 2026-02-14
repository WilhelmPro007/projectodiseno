# Proyecto de Diseño de Sistemas - NestJS & Prisma

Este repositorio contiene el desarrollo del proyecto de Diseño de Sistemas, organizado por etapas según las guías didácticas entregadas.

---

## 🛠️ Tecnologías y Dependencias

El proyecto utiliza un stack moderno y profesional para garantizar escalabilidad y tipado fuerte:

- **Core**: [NestJS (v11)](https://nestjs.com/) para una arquitectura modular sólida.
- **ORM**: [Prisma (v7)](https://www.prisma.io/) para la gestión de base de datos.
- **Documentación**: [Swagger](https://swagger.io/) para una API auto-documentada.
- **Seguridad**: [Passport.js](http://www.passportjs.org/) & [JWT](https://jwt.io/) para autenticación robusta.
- **Validación**: `class-validator` & `class-transformer` para tipado y validación de DTOs en tiempo de ejecución.

---

## 📚 Guías del Proyecto

| Guía | Tema | Documentación |
| :--- | :--- | :--- |
| **Guía 1** | Configuración Inicial de NestJS | [Resumen Guía 1](./docs/resumen-guia-1.md) |
| **Guía 2** | CRUD Profesional con Prisma & Swagger | [Resumen Guía 2](./docs/resumen-guia-2.md) |
| **Guía 3** | Autenticación JWT & Passport | [Resumen Guía 3](./docs/resumen-guia-3.md) |

---

## 🗄️ Navegación de Base de Datos

Este proyecto soporta **Multi-DB Architecture**. Puedes alternar entre motores sin cambiar el código.

### Configuración
Consulta la [**Documentación de Base de Datos**](./docs/DATABASE.md) para detalles completos.

### Comandos de Infraestructura
- `npm run db:docker:postgresql`: Levanta un contenedor de Postgres basado en tu `.env`.
- `npm run seed`: Puebla la base de datos con roles y usuarios de prueba.
- `npx prisma studio`: Abre la interfaz visual para explorar los datos.

---

## 🚀 Inicio Rápido

### Instalación
```bash
npm install
npx prisma generate
```

### Ejecución
```bash
# Sincronizar esquema y seed (primera vez)
npx prisma db push
npm run seed

# Iniciar servidor
npm run start:dev
```

---

### 🔗 Enlaces Útiles
- **Documentación API (Swagger):** `http://localhost:3006/api` (Verificar PORT en `.env`)
- **Arquitectura Flexible**: Reside en `src/core/database`.

---
© 2026 - Proyecto de Diseño de Sistemas

