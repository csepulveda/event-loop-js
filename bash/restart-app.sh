#!/bin/bash
export HOME=/root
rsync -av --delete-after /var/www/event-loop-js/deploy/ /var/www/event-loop-js/app/
pgrep PM2
if [ $? != 0 ]; then
    cd /var/www/event-loop-js/app/
    npm start
else
    cd /var/www/event-loop-js/app/
    node_modules/.bin/pm2 gracefulReload all
fi