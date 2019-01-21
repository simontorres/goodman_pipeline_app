from celery import Celery

app = Celery('worker', broker='amqp://guest:guest@rabbit//')


@app.task
def reduce(filename):
    return "Reducing {}".format(filename)