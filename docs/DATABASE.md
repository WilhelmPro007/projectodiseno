# 🗄️ Infraestructura de Base de Datos Flexible

Este proyecto está diseñado con una **arquitectura agnóstica de base de datos**, permitiendo alternar entre un entorno de desarrollo rápido con **SQLite** y un entorno de producción o pruebas avanzadas con **PostgreSQL**.

## 🔄 Cambio de Motor de BD

La configuración se centraliza en el archivo `.env`. El `PrismaService` detectará automáticamente el motor basándose en el prefijo de la URL o la variable `DB_TYPE`.

### Escenario A: SQLite (Default para Desarrollo)
Ideal para desarrollo local sin dependencias externas.
```bash
DB_TYPE="sqlite"
DATABASE_URL="file:./dev.db"
```

### Escenario B: PostgreSQL (Producción / Docker)
Ideal para consistencia con entornos de despliegue.
```bash
DB_TYPE="postgresql"
DATABASE_URL="postgresql://user:password@localhost:5432/projecto_db?schema=public"
```

---

## 🐋 Gestión con Docker (PostgreSQL)

Si has configurado PostgreSQL en el `.env`, puedes levantar la infraestructura con un solo comando:

```bash
npm run db:docker:postgresql
```

**¿Qué hace este script?**
1. Lee las credenciales (usuario, password, puerto, nombre de BD) directamente de tu `.env`.
2. Descarga la imagen oficial de PostgreSQL (v15-alpine).
3. Levanta el contenedor mapeando los puertos dinámicamente según tu configuración.

---

## ⚡ Sincronización y Poblado (Seed)

Una vez que la base de datos esté activa, debes preparar el esquema y los datos iniciales.

### 1. Push del Esquema
Sincroniza tu modelo de Prisma con la base de datos:
```bash
npx prisma db push
```

### 2. Ejecutar Seeding
Puebla la base de datos con roles y usuarios maestros:
```bash
npm run seed
```

**Datos creados por defecto:**
- **Roles**: `Admin`, `User`.
- **Admin**: `admin@example.com` / `AdminPassword123!`
- **User**: `user@example.com` / `UserPassword123!`

---

## 🏗️ Estructura Técnica (Core Module)
La lógica reside en `src/core/database/prisma.service.ts`, la cual utiliza una **Factory estática** para inyectar los adaptadores necesarios (como `better-sqlite3` para SQLite) solo cuando son requeridos, manteniendo el bundle limpio en producción.
