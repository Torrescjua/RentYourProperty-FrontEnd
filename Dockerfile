# Etapa 1: Construcción
FROM node:20-alpine AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración de npm
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .
# Expone el puerto 4200 para el servidor de desarrollo
EXPOSE 4200

# Comando para iniciar el servidor de desarrollo de Angular
CMD ["npm", "run", "start"]



