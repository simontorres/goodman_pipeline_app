#!/usr/bin/env bash


rabbitmqctl set_permissions -p $RABBITMQ_DEFAULT_VHOST $RABBITMQ_DEFAULT_USER ".*" ".*" ".*"
rabbitmq-server