FROM node:22-alpine

WORKDIR /app

COPY --chown=node:node package.json server.mjs index.html VERSION README.md ./
COPY --chown=node:node data ./data
COPY --chown=node:node src ./src
COPY --chown=node:node assets ./assets

USER node

ENV NODE_ENV=production
ENV PORT=8787
EXPOSE 8787

CMD ["node", "server.mjs"]
