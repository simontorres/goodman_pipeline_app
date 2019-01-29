import os

from celery import Celery

app = Celery('worker',
             backend=os.environ['CELERY_BACKEND_URL'],
             broker=os.environ['CELERY_BROKER_URL'],
             include='worker_tasks')

# app.conf.

