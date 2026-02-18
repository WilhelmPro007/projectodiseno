# Proyecto de Diseño de Sistemas - NestJS & Prisma

Este repositorio contiene el desarrollo del proyecto de Diseño de Sistemas, organizado por etapas según las guías didácticas entregadas.

---

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js**: (Ver [Gestión de Versiones](#-gestión-de-versiones-nodejs))
- **NPM**: (Empaquetador de dependencias)
- **Docker**: (Opcional, solo si deseas usar PostgreSQL)

---

## 🟢 Gestión de Versiones Node.js

Este proyecto requiere diferentes versiones de Node.js según el componente que estés trabajando. Recomendamos usar [**fnm** (Fast Node Manager)](https://github.com/Schniz/fnm) para cambiar fácilmente entre ellas.

### Versiones Requeridas

| Componente | Carpeta | Versión de Node.js | Razón |
| :--- | :--- | :--- | :--- |
| **Backend (NestJS)** | Raíz (`/`) | **v25.x** | Compatibilidad con `better-sqlite3` native modules. |
| **CMS (Strapi)** | `cms/` | **v22.x** (LTS) | Compatibilidad oficial de Strapi v5. |

### Cómo cambiar de versión con `fnm`

Si no tienes instalada la versión necesaria:
```bash
fnm install 25
fnm install 22
```

Para activar la versión antes de correr los comandos de cada proyecto:

**Para el Backend (Root):**
```bash
fnm use 25
npm run start:dev
```

**Para el CMS (Strapi):**
```bash
cd cms
fnm use 22
npm run develop
```

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
| **Guía 4** | CMS Headless con Strapi & Render | [Resumen Guía 4](./docs/resumen-guia-4.md) |

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

### 1. Instalación
```bash
npm install
```

> [!IMPORTANT]
> **Generar Cliente Prisma**: Es obligatorio ejecutar `npx prisma generate` después de instalar las dependencias para que el editor y NestJS reconozcan los tipos de la base de datos.

### 2. Configuración de Entorno
Copia el archivo de ejemplo y ajusta las variables según tu necesidad:
```bash
cp .env.example .env
```
> [!NOTE]
> Por defecto, el proyecto está configurado para usar **SQLite**. Si deseas usar **PostgreSQL**, cambia `DB_TYPE` a `postgresql` en tu `.env`.
> 
> **Nota para SQLite**: El archivo `dev.db` ya viene incluido en el repositorio con datos iniciales para facilitar tus pruebas rápidas.

### 3. Preparación de Base de Datos
```bash
# Sincronizar esquema y generar cliente Prisma
npx prisma generate
npx prisma db push

# (Opcional) Si usas PostgreSQL con Docker
npm run db:docker:postgresql

# Poblar con datos de prueba
npm run seed
```

### 4. Ejecución
```bash
# Iniciar servidor en modo desarrollo
npm run start:dev
```

---

### 🔗 Enlaces Útiles
- **Documentación API (Swagger):** `http://localhost:3006/api` (Verificar PORT en `.env`)
- **Arquitectura Flexible**: Reside en `src/core/database`.

---
© 2026 - Proyecto de Diseño de Sistemas

