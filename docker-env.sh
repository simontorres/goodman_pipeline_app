export RABBITMQ_DEFAULT_USER=user
export RABBITMQ_DEFAULT_PASS=pass
export RABBITMQ_DEFAULT_VHOST=rvhost

# file watch
export CELERY_BACKEND_URL=rpc://
export CELERY_BROKER_URL=amqp://$RABBITMQ_DEFAULT_USER:$RABBITMQ_DEFAULT_PASS@rabbit/$RABBITMQ_DEFAULT_VHOST
export DATA_DIRECTORY=/app/pipeline/data

# printing values

echo "RABBITMQ_DEFAULT_USER " $RABBITMQ_DEFAULT_USER
echo "RABBITMQ_DEFAULT_PASS " $RABBITMQ_DEFAULT_PASS
echo "RABBITMQ_DEFAULT_VHOST " $RABBITMQ_DEFAULT_VHOST

echo "CELERY_BACKEND_URL " $CELERY_BACKEND_URL
echo "CELERY_BROKER_URL " $CELERY_BROKER_URL
echo "DATA_DIRECTORY " $DATA_DIRECTORY

