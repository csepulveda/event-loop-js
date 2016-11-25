#!/bin/bash
export HOME=/root
cd /var/www/event-loop-js/app/
pgrep pm2
if [ $? == 1 ] then;
    for i in $(./node_modules/.bin/pm2 status -m |awk '/pm2 id/ {print $NF}')
        do 
        ./node_modules/.bin/pm2 restart $i
        sleep 5
    done
else
    npm start
fi