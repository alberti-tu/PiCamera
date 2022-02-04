# **PiCamera**

This project was generated with:

Package                                 | Version
----------------------------------------|--------
[Angular CLI](https://cli.angular.io)   | 11.2.3
[Axios](https://github.com/axios/axios) | 0.21.1
[Express](https://expressjs.com)        | 4.17.1
[Maria DB](https://mariadb.org)         | 10.5.12
[Node JS](https://nodejs.org)           | 16.13.1

## 1. Installation

### 1.1 System setup
Installing NodeJS and NPM for Linux systems

```bash
sudo ./node_setup.sh
```

Installing MariaDB server and configure the access user

```bash
sudo apt install mariadb-server -y
sudo mysql_secure_installation
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
npm run server:install
npm run client:install
npm run app:install
```

## 2. Configuration

The commands in steps [2.1 Server](#2.1-Server) and [2.2 Camera node](#2.2-Camera-node) will open a nano shell editor. After editing the document press **ctrl + o** to save changes and **ctrl + x** to close.

### 2.1 Server

Set HTTP server, database connection and server password
```bash
npm run server:config
```
### 2.2 Camera node

Set URL connection and server password
```bash
npm run client:config
```

## 3. Build project

Build all projects
```bash
npm run build
```

Or build a selected project
```bash
npm run server:build
npm run client:build
npm run app:build
```

NOTE: You have to build at least the **App** project with the global build command or with the specific one.

## 4. Launch project

Command to launch server
```bash
npm run server:start
```

Command to launch camera node
```bash
npm run client:start
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
npm run app:build
```
