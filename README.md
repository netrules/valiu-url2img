[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/netrules/valiu-url2img)

# valiu-url2img
Microservice that converts requests with URL address to images

## How to use
There's three ways to get the microservice running, either with vanilla nodejs, docker or online devops.

## Setting up

### DOWNLOAD:
Open up a command line or shell terminal and `cd` to a directory root for your project files, then run the following command:
```sh
git clone https://github.com/netrules/valiu-url2img.git
```

### CONFIGURATION:
Make a file named `.env` in the project directory with the following data:
```sh
# using 32696 but you can use any :)
URL2IMG_PORT=32696
```

### INSTALLING AND RUNNING:

#### Using Node.JS

1. Instructions

```sh
cd valiu-url2img
npm install
npm start server
```

#### Using the `Dockerfile`:

1. Instructions
```sh
docker build -t valiu-url2img/1.0 .
docker run -ti -p $HOST_AVAILABLE_PORT:$URL2IMG_PORT --name valiu-url2img valiu-url2img/1.0
```
2. Notes:
    - Replace `$HOST_AVAILABLE_PORT` for an available port to listen to the node.js service.
        - e.g.: `docker run -ti -p 32696:32696 --name valiu-url2img valiu-url2img/1.0`
    - Do `source .env` if on linux, or replace `$URL2IMG_PORT` in the second line for the value in the `.env` file.

#### Deploying on gitpod
Check out the badge at the top.... [𝓸𝓻 𝓼𝓲𝓶𝓹𝓵𝔂 𝓬𝓵𝓲𝓬𝓴 𝓶𝓮](https://gitpod.io/#https://github.com/netrules/valiu-url2img) 💩🤓


### USAGE
    Look at the example.js file :)
