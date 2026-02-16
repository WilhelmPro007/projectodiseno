# Resumen de Finalización - Guía Didáctica N° 3

Este documento detalla la implementación del sistema de autenticación basado en JWT (JSON Web Tokens) para el proyecto, cumpliendo con los objetivos de la Guía Didáctica N° 3.

## Puntos Clave de la Implementación

### 1. Módulo de Autenticación (`AuthModule`)
Centraliza la lógica de seguridad integrando `Passport` y `JwtModule`.

#### Archivo: `src/auth/auth.module.ts`
```typescript
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule { }
```

### 2. Estrategia JWT y Validación
Se implementó una estrategia para extraer y validar el token de los encabezados de las peticiones.

#### Archivo: `src/auth/strategies/jwt.strategy.ts`
```typescript
export class JwtStrategy extends PassportStrategy(Strategy) {
    async validate(payload: any) {
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
        });

        if (!user) throw new UnauthorizedException();

        return { id: user.id, email: user.email, role: payload.role };
    }
}
```

### 3. Guardia de Seguridad (`JwtAuthGuard`)
Protege las rutas para que solo usuarios autenticados puedan acceder.

#### Archivo: `src/auth/guards/jwt-auth.guard.ts`
```typescript
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { }
```

### 4. Lógica de Autenticación y Generación de Token
El servicio valida las credenciales y genera el payload firmado.

#### Archivo: `src/auth/auth.service.ts` (Login)
```typescript
async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password) throw new UnauthorizedException();

    const payload = { sub: user.id, email: user.email, role: user.role.name };
    return {
        access_token: this.jwtService.sign(payload),
        user: new UserEntity(user),
    };
}
```

## Integración con Swagger
Para probar los endpoints protegidos, se habilitó el botón **Authorize** en Swagger.

#### Archivo: `src/main.ts`
```typescript
const config = new DocumentBuilder()
  // ...
  .addBearerAuth()
  .build();
```

## Configuración de Entorno
Variables críticas añadidas al `.env`:
```env
JWT_SECRET="mi_llave_secreta_pro"
JWT_EXPIRATION="24h"
```

---
*Este módulo completa la tríada de guías iniciales, dotando al sistema de una capa de seguridad profesional y escalable.*
