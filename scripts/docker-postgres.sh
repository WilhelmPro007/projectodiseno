#!/bin/bash

# Este script extrae la configuración de PostgreSQL del archivo .env
# y crea un contenedor de Docker automáticamente.

# Cargar variables de .env
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
else
    echo "Error: Archivo .env no encontrado."
    exit 1
fi

if [ "$DB_TYPE" != "postgresql" ]; then
    echo "Aviso: DB_TYPE no es 'postgresql'. Cambia DB_TYPE en .env para usar este script."
    exit 0
fi

# Parsear DATABASE_URL para extraer componentes
# Formato esperado: postgresql://USER:PASSWORD@HOST:PORT/DBNAME
# Nota: Este parseo es básico y asume el formato estándar.

PROTOCOL_REM=$(echo $DATABASE_URL | sed 's/postgresql:\/\///')
USER_PASS=$(echo $PROTOCOL_REM | cut -d'@' -f1)
HOST_PORT_DB=$(echo $PROTOCOL_REM | cut -d'@' -f2)

DB_USER=$(echo $USER_PASS | cut -d':' -f1)
DB_PASSWORD=$(echo $USER_PASS | cut -d':' -f2)

HOST_PORT=$(echo $HOST_PORT_DB | cut -d'/' -f1)
DB_NAME=$(echo $HOST_PORT_DB | cut -d'/' -f2 | cut -d'?' -f1)

DB_PORT=$(echo $HOST_PORT | cut -d':' -f2)
[ -z "$DB_PORT" ] && DB_PORT=5432

echo "--- Configuración PostgreSQL detectada ---"
echo "Usuario: $DB_USER"
echo "Puerto:  $DB_PORT"
echo "Base de Datos: $DB_NAME"
echo "------------------------------------------"

CONTAINER_NAME="projecto-diseno-postgres"

# Verificar si el contenedor ya existe
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo "El contenedor $CONTAINER_NAME ya existe. Reiniciando..."
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
fi

echo "Iniciando contenedor Docker para PostgreSQL..."

docker run --name $CONTAINER_NAME \
  -e POSTGRES_USER=$DB_USER \
  -e POSTGRES_PASSWORD=$DB_PASSWORD \
  -e POSTGRES_DB=$DB_NAME \
  -p $DB_PORT:5432 \
  -d postgres:15-alpine

if [ $? -eq 0 ]; then
    echo "✅ Contenedor PostgreSQL iniciado correctamente en el puerto $DB_PORT."
    echo "Usa 'npm run seed' para poblar la base de datos una vez que esté lista."
else
    echo "❌ Error al iniciar el contenedor Docker."
fi
