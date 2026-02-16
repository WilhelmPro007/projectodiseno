# Resumen de Finalización - Guía Didáctica N° 2

Este documento detalla los puntos clave y los pasos técnicos seguidos para la implementación exitosa del CRUD profesional de usuarios utilizando NestJS y Prisma, cumpliendo con todos los requisitos de la Guía Didáctica N° 2.

## Puntos Clave del Proyecto

### 1. Arquitectura Singleton con Prisma
Se centralizó la conexión a la base de datos en un módulo global para evitar múltiples instancias innecesarias.

#### Archivo: `src/core/database/database.module.ts`
```typescript
@Global()
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class DatabaseModule { }
```

### 2. Documentación Automatizada con Swagger
Se integró Swagger para generar una interfaz interactiva que permite probar los endpoints directamente.

#### Archivo: `src/main.ts` (Configuración Swagger)
```typescript
const config = new DocumentBuilder()
  .setTitle('API Diseño de Sistemas')
  .setDescription('CRUD de Usuarios para Guía 2/3')
  .setVersion('1.0')
  .addBearerAuth() // Soporte para JWT
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
```

### 3. Seguridad y Serialización (Exclusión de Password)
Se utilizó `class-transformer` para asegurar que datos sensibles como la contraseña no se envíen en las respuestas.

#### Archivo: `src/users/entities/user.entity.ts`
```typescript
export class UserEntity {
    @ApiProperty()
    email: string;

    @Exclude() // Oculta este campo al serializar
    password?: string;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
```

### 4. Validaciones Estrictas con DTOs
Se implementaron decoradores de `class-validator` para asegurar la integridad de los datos de entrada.

#### Archivo: `src/users/dto/create-user.dto.ts`
```typescript
export class CreateUserDto {
    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    password: string;

    @IsInt()
    @IsNotEmpty()
    roleId: number;
}
```

### 5. Manejo Global de Errores de Prisma
Se creó un filtro de excepciones para capturar errores específicos de base de datos (como duplicados) y convertirlos en respuestas HTTP limpias.

#### Archivo: `src/common/filters/prisma-client-exception.filter.ts`
```typescript
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        // ... switch case para códigos como 'P2002' (Unique Constraint)
        if (exception.code === 'P2002') {
            response.status(HttpStatus.CONFLICT).json({
                message: 'El registro con este valor ya existe',
            });
        }
    }
}
```

## Pasos Realizados para Completar la Guía

### Fase 1: Configuración Inicial
*   Se configuró el entorno con variables dinámicas (`.env`).
*   Se activaron interceptores y filtros globales en `main.ts`:
```typescript
app.useGlobalPipes(new ValidationPipe({ transform: true }));
app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
app.useGlobalFilters(new PrismaClientExceptionFilter());
```

### Fase 2: Desarrollo del CRUD de Usuarios
*   Se implementó la lógica en `src/users/users.service.ts` utilizando el `PrismaService` inyectado.
*   Se incluyó el borrado lógico y la relación con Roles en el esquema:

#### Archivo: `prisma/schema.prisma` (Fragmento)
```prisma
model User {
  id        Int       @id @default(autoincrement())
  isActive  Boolean   @default(true)
  deletedAt DateTime?
  role      Role      @relation(fields: [roleId], references: [id])
}
```

---
*Este resumen registra la evolución tecnológica del proyecto desde un CRUD básico hasta una arquitectura de servicios lista para producción.*
