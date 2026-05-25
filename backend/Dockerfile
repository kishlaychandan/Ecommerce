FROM node:22-alpine

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

RUN chown node:node /app

USER node

COPY --chown=node:node package*.json ./

RUN npm ci --omit=dev

COPY --chown=node:node . .

RUN mkdir -p uploads

EXPOSE 3000

CMD ["node", "index.js"]
