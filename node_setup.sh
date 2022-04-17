#!/bin/bash
if [ "$(id -u)" != 0 ] ; then
	echo "Please run as root"
	exit 1
fi

if [ "$#" -ge 2 ] ; then
	echo "Too much arguments"
	echo "Please execute: sudo ./node_setup [version | lts]"
	exit 2
elif [[ "$1" =~ ^[0-9]+$ ]] ; then
	VERSION=$1
else
	VERSION="lts"
fi

echo ""
echo "********   NODE SETUP   ********"

echo ""
echo "Step 1: Updating packages"
echo ""
apt update -y

echo ""
echo "Step 2: Removing current Node version"
echo ""
rm -r /usr/lib/node_modules/
apt remove nodejs -y

echo ""
echo "Step 3: Downloading repository"
curl -fsSL https://deb.nodesource.com/setup_$VERSION.x | sudo bash -

echo "Step 4: Updating Node"
echo ""
apt install nodejs -y

setcap 'cap_net_bind_service=+ep' /usr/bin/node

echo ""
echo "Step 5: Updating NPM"
npm i -g npm

echo ""
echo "Step 6: Cleaning installation"
echo ""
apt autoremove -y

echo ""
echo "Node: $(node -v)"
echo "NPM: $(npm -v)"

exit 0