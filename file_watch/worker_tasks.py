from __future__ import absolute_import

import os
from ccdproc import CCDData

from worker_app import app

@app.task
def reduce(filename):
    if os.path.isfile(filename):
        ccd = CCDData.read(filename, unit='adu')
        info = "\nOBJECT: {:s}\n" \
               "OBSTYPE: {:s}\n" \
               "RA: {:s} \n" \
               "DEC: {:s}".format(ccd.header['OBJECT'],
                                  ccd.header['OBSTYPE'],
                                  ccd.header['RA'],
                                  ccd.header['DEC'])
        print(info)
    return "Reducing {}".format(filename)
