from __future__ import absolute_import

from worker_app import app

@app.task
def reduce(filename):
    return "Reducing {}".format(filename)
