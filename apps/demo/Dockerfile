FROM node:20-bookworm-slim

# évite d'installer des dev deps
ENV NODE_ENV=production
ENV PORT=8080

WORKDIR /app

# installe les deps; npm ci exige un lockfile → on utilise install
COPY package*.json ./
RUN npm install --omit=dev --no-audit --no-fund

# copie le code
COPY . .

EXPOSE 8080
CMD ["npm", "start"]
