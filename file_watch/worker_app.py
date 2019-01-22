import os

from celery import Celery

app = Celery('worker',
             broker=os.environ['CELERY_BROKER_URL'],
             include='worker_tasks')

# app.conf.

