FROM node:22.12.0-alpine AS builder

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn --ignore-scripts
COPY . .
RUN yarn generate && yarn build && rm -rf node_modules && yarn --production

FROM node:22.12.0-alpine
WORKDIR /app
COPY --from=builder /usr/src/app /app

ENV NODE_ENV=production
ENV PORT=80

EXPOSE 80

CMD ["node", "./build/server.js"]
