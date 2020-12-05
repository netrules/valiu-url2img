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

WORKDIR /usr/src/app

FROM base as build

COPY package.json
RUN npm install
COPY . ./
RUN npm run build

FROM base as install

COPY --from=build /usr/src/app/package.json ./usr/src/app/package-lock.json ./
RUN npm install

FROM base

COPY --from=install /usr/src/app .

#ENV NODE_ENV=production \
#    PORT=8080

#EXPOSE 8080

ENTRYPOINT ["node"]

CMD ["server.js"]

USER node
