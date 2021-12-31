# Build stage
FROM node:14-alpine as builder

ENV NODE_ENV=development

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm ci
COPY . /app/
RUN npm run build && npm run lint

# Runtime container
FROM node:14-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json /app/
RUN npm install --production
COPY --from=builder /app/dist /app/dist/

CMD ["npm", "run", "start"]
