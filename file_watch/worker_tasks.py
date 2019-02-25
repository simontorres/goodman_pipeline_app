from __future__ import absolute_import

import os
from ccdproc import CCDData
import requests
import json

from worker_app import app

@app.task
def reduce(filename):
    if os.path.isfile(filename):
        ccd = CCDData.read(filename, unit='adu')
        raw_data = {}
        raw_data["file_name"] = os.path.basename(filename)
        raw_data["object"] = ccd.header['OBJECT']
        raw_data["obstype"] = ccd.header['OBSTYPE']
        raw_data["ra"] = ccd.header['RA']
        raw_data["dec"] = ccd.header['DEC']

        json_data = json.dumps(raw_data)

        post_header = {"Content-type": "application/json"}

        r = requests.post('http://api:8080/api/files',
                          data=json_data,
                          headers=post_header)

        print(r.status_code, r.reason)

        print(json_data)
    return "Reducing {}".format(filename)
