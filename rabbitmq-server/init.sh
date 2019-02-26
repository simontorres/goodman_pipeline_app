#!/usr/bin/env bash

rabbitmq-server &
sleep 10
rabbitmqctl delete_user guest
rabbitmqctl add_user $RABBITMQ_DEFAULT_USER $RABBITMQ_DEFAULT_PASS
rabbitmqctl add_vhost $RABBITMQ_DEFAULT_VHOST
rabbitmqctl set_permissions -p $RABBITMQ_DEFAULT_VHOST $RABBITMQ_DEFAULT_USER ".*" ".*" ".*"
echo "finished"
fg
#rabbitmqctl stop
#rabbitmq-server