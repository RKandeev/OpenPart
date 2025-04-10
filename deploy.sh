#!/bin/bash

LOCAL_BUILD_FOLDER="./"
REMOTE_USER="root"
REMOTE_SERVER="efficlub.ru"
REMOTE_PATH="/var/www/efficlub.ru/public"

read -p $'\e[33;1m Вы уверены? Вы собираетесь задеплоится на '$REMOTE_SERVER'? (да/нет): '  CONFIRM

if [[ $CONFIRM != "да" ]]; then
    echo $'\e[31;1m Деплой отменен'
    exit 1
fi


sshpass rsync -avz "$LOCAL_BUILD_FOLDER/" "$REMOTE_USER@$REMOTE_SERVER:$REMOTE_PATH"

if [ $? -eq 0 ]; then
    echo $'\e[32;1m Успешный деплой: https://'$REMOTE_SERVER
else
    echo $'\e[31;1m Деплой не удался. Проверьте SSH ключ на серваке и что в системе установлен sshpass'
fi