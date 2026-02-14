# Resumen de Finalización - Guía Didáctica N° 3

Este documento detalla la implementación del sistema de autenticación basado en JWT (JSON Web Tokens) para el proyecto, cumpliendo con los objetivos de la Guía Didáctica N° 3.

## Puntos Clave de la Implementación

1.  **Módulo de Autenticación (`AuthModule`)**: Se creó un módulo dedicado para centralizar la lógica de seguridad, integrando `PassportModule` y `JwtModule`.
2.  **Estrategia JWT (`JwtStrategy`)**: Se implementó una estrategia personalizada que extiende `PassportStrategy`. Esta estrategia se encarga de:
    *   Extraer el token del encabezado `Authorization`.
    *   Validar la firma del token usando una clave secreta.
    *   Verificar si el usuario asociado al token existe en la base de datos.
3.  **Guardia de Seguridad (`JwtAuthGuard`)**: Se implementó una guardia global basada en Passport para proteger rutas específicas, devolviendo un error 401 (Unauthorized) si el token no es válido o no está presente.
4.  **Flujos de Auth**:
    *   **Login**: Valida credenciales contra la base de datos (Prisma) y genera un token firmado.
    *   **Registro**: Crea un nuevo usuario y devuelve automáticamente su token de acceso.
5.  **Integración con Swagger**: Se configuró la seguridad de portador (Bearer Auth) en Swagger, permitiendo a los desarrolladores probar endpoints protegidos directamente desde la interfaz.

## Funcionamiento de la Estrategia JWT

El funcionamiento se basa en el siguiente ciclo de vida:

1.  **Petición**: El cliente envía una petición con el encabezado `Authorization: Bearer <token>`.
2.  **Extracción**: Passport-JWT extrae el token automáticamente.
3.  **Validación**: NestJS verifica que el token no haya expirado y que la firma coincida con la `JWT_SECRET` del servidor.
4.  **Payload**: Una vez validado, el método `validate()` de nuestra estrategia recibe el contenido decodificado del token.
5.  **Inyección**: El objeto de usuario (o sus datos clave como el ID) se inyecta en el objeto `request`, permitiendo que los controladores accedan a `req.user`.

## Configuración de Entorno

Se han añadido las siguientes variables al archivo `.env` para facilitar la gestión del servicio:
*   `JWT_SECRET`: Llave privada para firmar tokens.
*   `JWT_EXPIRATION`: Tiempo de vida del token (ej. `1d`, `12h`).

---
*Este módulo completa la tríada de guías iniciales, dotando al sistema de una capa de seguridad profesional y escalable.*
