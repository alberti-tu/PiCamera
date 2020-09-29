# PiCamera

This project was generated with:

Package                               | Version | Optional
--------------------------------------|---------|---------
[Node JS](https://nodejs.org)         | 12.18.4 | &#x2718;
[Maria DB](https://mariadb.org)       | 10.1.44 | &#x2718;
[Angular CLI](https://cli.angular.io) | 10.1.3  | &#x2714;

## 1. Installation

Installing NodeJS and NPM for Linux systems

```bash
sudo apt update -y
sudo apt upgrade -y

sudo apt install nodejs -y

sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

Installing MariaDB server and set execution permitions

```bash
sudo apt install mariadb-server -y
mysql --user="root" --database="mysql" --execute="update user set plugin='' where User='root'; flush privileges;"
```

Installing Angular CLI (optional)

```bash
sudo npm install -g @angular/cli@10.1.3
```

## 2. User interface (optional)

If you want to add a different user interface (UI) in order to manage the system, execute the following commands in a shell window after editing the folder project PiCamera-client.

```bash
cd PiCamera-client
npm install
ng build --prod
```

## 3. Configuration

Open the configuration file and set your token keys and params before start the server.

```bash
nano PiCamera-server/src/config.ts
```


## 4. Start server

Install the dependences and start the program.

```bash
cd PiCamera-server
npm install
npm start
```