# Guía Didáctica N° 1: Explorando Ecosistema NestJS

Este documento detalla los pasos seguidos para la creación y configuración del primer proyecto utilizando NestJS y Prisma con SQLite, siguiendo la Guía Didáctica N° 1.

## 1. Verificación del Entorno
Se verificó la instalación de Node.js y npm en el sistema.

## 2. Creación del Proyecto NestJS
Debido a problemas de permisos con la instalación global de `@nestjs/cli`, se utilizó `npx` para crear el proyecto en el directorio actual:
```bash
npx -y @nestjs/cli new . --package-manager npm
```

## 3. Instalación de Dependencias de Base de Datos
Se instalaron Prisma y `dotenv` como dependencias de desarrollo:
```bash
npm install prisma -D
npm install dotenv -D
```

## 4. Inicialización de Prisma
Se inicializó el recurso de configuración de Prisma:
```bash
npx prisma init
```

## 5. Configuración de SQLite (Prisma 7)
Dado que estamos utilizando **Prisma 7.4.0**, se realizaron ajustes específicos para el cumplimiento de los nuevos estándares:

### `prisma/schema.prisma`
Se configuró el proveedor como `sqlite` y se definió un modelo inicial (`User`). Nota: En Prisma 7, el campo `url` ya no se incluye en el `datasource` del esquema.
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

### `.env`
Se configuró la ruta del archivo de base de datos SQLite:
```env
DATABASE_URL="file:./dev.db"
```

### `src/main.ts`
Se habilitó la carga de variables de entorno al inicio del archivo:
```typescript
import 'dotenv/config';
// ... rest of the file
await app.listen(process.env.PORT ?? 3000);
```

## 6. Sincronización de Base de Datos
Se utilizó `db push` para crear la base de datos y sincronizar el esquema:
```bash
npx prisma db push
```

## 7. Ejecución del Proyecto
Se inició el servidor de desarrollo de NestJS:
```bash
npm run start:dev
```
La aplicación es accesible en el puerto configurado en el `.env` (ej: [http://localhost:3001](http://localhost:3001)).


## 8. Herramientas de Gestión
Para visualizar la base de datos:
```bash
npx prisma studio
```
