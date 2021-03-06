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

The commands in steps [2.1 Server](#2.1-Server) and [2.2 Camera node](#2.2-Camera-node) will open a nano shell editor. After editing the document press **ctrl + o** to save changes and **ctrl + x** to close.

### 2.1 Server

Set HTTP server, database and server password
```bash
npm run config:server
```
### 2.2 Camera node

Set URL connection and server password
```bash
npm run config:client
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

If you want to finish execution press **ctrl + c** on the linux shell

## 5. Update project
In the near future will be new updates, in order to download the new features execute the following commands:

```bash
git pull
```
After downloaded the features execute steps [1.2 Project setup](#1.2-Project-setup), [3. Build project](#3.-Build-project) and [4. Launch project](#4.-Launch-project).

NOTE: If the changes only affect to **App** project is not necessary stop the server instance. Just execute this:

```bash
npm run build:app
```
