# **PiCamera**

This project was generated with:

Package                                 | Version
----------------------------------------|--------
[Angular CLI](https://cli.angular.io)   | 11.2.3
[Axios](https://github.com/axios/axios) | 0.21.1
[Express](https://expressjs.com)        | 4.17.1
[Maria DB](https://mariadb.org)         | 10.1.44
[Node JS](https://nodejs.org)           | 14.15.1

## 1. Installation

### 1.1 System setup
Installing NodeJS and NPM for Linux systems

```bash
sudo apt update -y
sudo apt upgrade -y

sudo apt install nodejs npm -y

sudo npm install -g npm
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

Installing MariaDB server and set execution permitions

```bash
sudo apt install mariadb-server -y
sudo mysql --user="root" --database="mysql" --execute="update user set plugin='' where User='root'; flush privileges;"
```

### 1.2 Project setup

Installing all NPM dependences
```bash
cd PiCamera
npm run install
```

Or install only NPM dependences of selected project
```bash
cd PiCamera
npm run install:server
npm run install:client
npm run install:app
```

## 2. Configuration

### 2.1 Server

Set HTTP server, database and server password
```bash
nano Server/src/config.ts
```
### 2.2 Camera node

Set URL connection and server password
```bash
nano Client/src/config.ts
```

## 3. Build project

Build all projects
```bash
npm run build
```

Or build a selected project
```bash
npm run build:server
npm run build:client
npm run build:app
```

NOTE: You have to build at least the **App** project with the global build command or with the specific one.

## 4. Launch project

Command to launch server
```bash
npm run start:server
```

Command to launch camera node
```bash
npm run start:client
```