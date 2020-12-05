FROM node:12 as base

RUN sudo apt-get update && \
    sudo apt-get install -y \
        ca-certificates \
        fonts-liberation \
        libappindicator3-1 \
        libasound2 \
        libatk-bridge2.0-0 \
        libatk1.0-0 \
        libc6 \
        libcairo2 \
        libcups2 \
        libdbus-1-3 \
        libexpat1 \
        libfontconfig1 \
        libgbm1 \
        libgcc1 \
        libglib2.0-0 \
        libgtk-3-0 \
        libnspr4 \
        libnss3 \
        libpango-1.0-0 \
        libpangocairo-1.0-0 \
        libstdc++6 \
        libx11-6 \
        libx11-xcb1 \
        libxcb1 \
        libxcomposite1 \
        libxcursor1 \
        libxdamage1 \
        libxext6 \
        libxfixes3 \
        libxi6 \
        libxrandr2 \
        libxrender1 \
        libxss1 \
        libxtst6 \
        lsb-release \
        wget \
        xdg-utils && \
    sudo rm -rf /var/lib/apt/lists/*

FROM base as build

COPY package.json
RUN npm install --pure-lockfile
RUN rm -f .npmrc
COPY . ./
RUN yarn run build \
 && yarn pack \
 && tar -xzf *.tgz

FROM base as install

ARG NPM_TOKEN

COPY --from=build /usr/src/app/package/package.json ./usr/src/app/package/yarn.lock ./
RUN echo '//registry.npmjs.org/:_authToken=${NPM_TOKEN}' > .npmrc
RUN yarn install --production --pure-lockfile
RUN rm -f .npmrc
COPY --from=build /usr/src/app/package .

FROM base

COPY --from=install /usr/src/app .

ENV NODE_ENV=production \
    PORT=8080

EXPOSE 8080

ENTRYPOINT ["node"]

CMD ["server.js"]

USER node
