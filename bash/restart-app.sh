#!/bin/bash
export HOME=/root
cd /var/www/event-loop-js/app/
node_modules/.bin/pm2 kill
npm start
