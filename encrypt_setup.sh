#!/bin/bash
if [ "$(id -u)" != 0 ] ; then
	echo "Please run as root"
	exit 1
fi

echo ""
echo "********   LET'S ENCRYPT SETUP   ********"

echo ""
echo "Step 1: Updating packages"
echo ""

apt update -y

echo ""
echo "Step 2: Downloading certbot"
echo ""

apt install certbot -y

echo ""
echo "Step 3: Folder permissions"
echo ""

chmod -R 755 /etc/letsencrypt/live/
chmod -R 755 /etc/letsencrypt/archive/

echo "Done."
