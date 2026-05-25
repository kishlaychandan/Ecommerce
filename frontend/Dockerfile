FROM node:22-alpine

ENV NODE_ENV=development
ENV HOST=0.0.0.0
ENV PORT=5173

WORKDIR /app

RUN chown node:node /app

USER node

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
