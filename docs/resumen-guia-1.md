# Guía Didáctica N° 1: Explorando Ecosistema NestJS

Este documento detalla los pasos seguidos para la creación y configuración del primer proyecto utilizando NestJS y Prisma con SQLite, siguiendo la Guía Didáctica N° 1.

## 1. Verificación del Entorno
Se verificó la instalación de Node.js y npm en el sistema.
```bash
node -v
npm -v
```

## 2. Creación del Proyecto NestJS
Debido a problemas de permisos con la instalación global de `@nestjs/cli`, se utilizó `npx` para crear el proyecto en el directorio actual:
```bash
npx -y @nestjs/cli new . --package-manager npm
```

#### Archivo: `package.json` (Fragmento inicial)
```json
{
  "name": "projectodiseno",
  "version": "0.0.1",
  "dependencies": {
    "@nestjs/common": "^11.0.1",
    "@nestjs/core": "^11.0.1"
    // ...
  }
}
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
*Este comando genera la carpeta `prisma/` y el archivo `.env` inicial.*

## 5. Configuración de SQLite (Prisma 7)
Dado que estamos utilizando **Prisma 7.4.0**, se realizaron ajustes específicos para el cumplimiento de los nuevos estándares:

#### Archivo: `prisma/schema.prisma`
Se configuró el proveedor como `sqlite` y se definió un modelo inicial (`User`).
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

#### Archivo: `.env`
Se configuró la ruta del archivo de base de datos SQLite:
```env
DATABASE_URL="file:./dev.db"
DB_TYPE="sqlite"
```

#### Archivo: `src/main.ts`
Se habilitó la carga de variables de entorno al inicio del archivo para dar soporte a configuraciones dinámicas:
```typescript
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ... rest of the file
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();
```

## 6. Sincronización de Base de Datos
Se utilizaron migraciones para crear la base de datos y sincronizar el esquema:
```bash
npx prisma migrate dev --name init
```
Esto crea una carpeta `prisma/migrations` con el historial de cambios y genera el **Prisma Client**.

## 7. Ejecución del Proyecto
Se inició el servidor de desarrollo de NestJS:
```bash
npm run start:dev
```
La aplicación es accesible en el puerto configurado en el `.env` (ej: [http://localhost:3006](http://localhost:3006)).

## 8. Estructura de Carpetas Generada
Al finalizar la Guía 1, el proyecto tiene la siguiente estructura clave:
```
projectodiseno/
├── prisma/
│   ├── schema.prisma      # Definición de modelos
│   └── migrations/        # Historial de cambios en BD
├── src/
│   ├── main.ts            # Punto de entrada (Configuración .env)
│   └── app.module.ts      # Módulo raíz
├── .env                   # Variables de entorno
├── dev.db                 # Base de datos SQLite (Generada)
└── package.json           # Dependencias y scripts
```

## 9. Herramientas de Gestión
Para visualizar la base de datos de forma interactiva:
```bash
npx prisma studio
```
