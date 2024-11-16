FROM node:22

USER node

WORKDIR /frontend

ENTRYPOINT [ "npm" ]