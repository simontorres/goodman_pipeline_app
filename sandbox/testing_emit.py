from __future__ import absolute_import
from publisher import Publisher
from loremipsum import get_sentence

import time

config = {'userName': 'guest',
          'password': 'guest',
          'host': 'localhost',
          'port': 5672,
          'virtualHost': 'rvhost',
          'exchangeName': 'exchange',
          'routingKey': 'routingkey',
          }


if __name__ == '__main__':

    pub = Publisher(config)
    for i in range(100):
        sentence = get_sentence()
        sentence = sentence.replace("b'", "")
        pub.publish(message=get_sentence())
        time.sleep(1)
