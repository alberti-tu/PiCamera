# **PiCamera**

Security web camera based on NodeJS and Raspberry Pi

## 1. Prerequisites

This project uses the legacy stack of raspistill. For that reason the RaspiOS of the camera machine must run with a 32 bits architecture. If you want to know which system you have, execute this.

```bash
cat /etc/os-release
```
If you have Debian 10 or older skip this section, otherwise, users with RaspiOS Bullseye have to enable legacy camera support.

```bash
sudo raspi-config
```

Navigate to `Interface Options` &rarr; `Legacy Camera` &rarr; `Yes`. Press on finish button and reboot your Pi.

## 2. Installation

Process to setup the OS machine based on Linux systems

### 2.1 System setup

Installing MariaDB server and configure the access user

```bash
sudo apt update -y
sudo apt install mariadb-server -y
sudo mysql_secure_installation
```

### 2.2 Project setup

Install latest NodeJS and NPM for Linux systems

```bash
git clone https://github.com/alberti-tu/PiCamera
cd PiCamera
sudo ./node_setup.sh
```

Or install a selected version of NodeJS

```bash
sudo ./node_setup.sh [version | lts]
```
NOTE: If the server instance will be in a Raspberry Pi, the latest LTS Node version supported is 16, otherwise you can install the default version provided by the script

### 2.3 Install NPM dependences

Install NPM dependences for all projects
```bash
npm run install
```

Or install NPM dependences of selected project
```bash
npm run server:install
npm run client:install
npm run app:install
```

### 2.4 Generate SSL certificates (Optional)

This project allows you to generate a valid certificate for free by Let's Encrypt. For the verification process to work, remember to forward TCP ports 80 and 443 to your IP address.

```bash
sudo apt install certbot
npm run certificate --host=[domain]
```

## 3. Configuration

The commands in steps [3.1 Server](#3.1-Server) and [3.2 Camera node](#3.2-Camera-node) will open a nano shell editor. After editing the document press **ctrl + o** to save changes and **ctrl + x** to close.

### 3.1 Server

Set HTTP server options, database connection and server password
```bash
npm run server:config
```
### 3.2 Camera node

Set URL connection and server password
```bash
npm run client:config
```

## 4. Build project

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

NOTE: You have to build at least the **App** project
## 5. Launch project

Command to launch server
```bash
npm run server:start
```

Command to launch camera node
```bash
npm run client:start
```

If you want to finish execution press **ctrl + c** on the linux shell

## 6. Update project
In the near future will be new updates, in order to download the new features execute the following commands:

```bash
git reset --hard
git pull
```
After downloaded the features execute steps [2.3 Install NPM dependences](#2.3.-Install-NPM-dependences), [4. Build project](#4.-Build-project) and [5. Launch project](#5.-Launch-project).

NOTE: If the changes only affect to **App** project is not necessary stop the server instance. Just execute this:

```bash
npm run app:build
```
