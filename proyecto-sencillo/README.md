# Proyecto Sencillo

Aplicación CRUD mínima construida con Node.js, Express y SQLite.

## Requisitos

- Node.js 18+

## Configuración

1. Copia `.env.example` a `.env` si deseas personalizar las variables de entorno.
2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor:

   ```bash
   npm start
   ```

El servidor expone los archivos estáticos en `public/` y una API REST en `/api/registros`.

### Endpoints básicos

- `GET /api/registros` – Lista todos los registros.
- `GET /api/registros/:id` – Obtiene un registro por ID.
- `POST /api/registros` – Crea un nuevo registro.
- `PUT /api/registros/:id` – Actualiza un registro existente.
- `DELETE /api/registros/:id` – Elimina un registro.

La base de datos se almacena en un archivo SQLite (`data.db`). Para MySQL se incluye `db.sql` con la estructura de la tabla.
