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
        raw_data["date"] = ccd.header['DATE']
        raw_data["ut_time"] = ccd.header['UT']
        raw_data["instrument"] = ccd.header['INSTRUME']
        raw_data["camera"] = ccd.header['INSTCONF']
        raw_data["object"] = ccd.header['OBJECT']
        raw_data["obstype"] = ccd.header['OBSTYPE']
        raw_data["ra"] = ccd.header['RA']
        raw_data["dec"] = ccd.header['DEC']
        raw_data['airmass'] = ccd.header['AIRMASS']
        raw_data['seeing'] = ccd.header['SEEING']
        raw_data['filter'] = ccd.header['FILTER']
        raw_data['filter2'] = ccd.header['FILTER2']
        raw_data['grating'] = ccd.header['GRATING']
        raw_data['slit'] = ccd.header['SLIT']
        raw_data['wavmode'] = ccd.header['WAVMODE']
        raw_data['exptime'] = ccd.header['EXPTIME']

        json_data = json.dumps(raw_data)

        post_header = {"Content-type": "application/json"}

        r = requests.post('http://api:8080/api/files',
                          data=json_data,
                          headers=post_header)

        print(r.status_code, r.reason)

        print(json_data)
    return "Reducing {}".format(filename)
