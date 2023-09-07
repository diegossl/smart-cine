# Use a imagem Node.js como base
FROM node:18

# Crie e defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json primeiro para aproveitar o cache de camadas
COPY package*.json ./

# Instale as dependências do aplicativo
RUN npm install

# Instale o Nest.js CLI globalmente
RUN npm install -g @nestjs/cli

# Copie o restante dos arquivos do aplicativo
COPY . .

# Expõe a porta em que o aplicativo Nest.js será executado
EXPOSE 3000

# Comando para iniciar o aplicativo Nest.js
CMD ["npm", "run", "start:dev"]
