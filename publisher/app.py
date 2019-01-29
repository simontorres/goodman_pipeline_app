from __future__ import absolute_import

from publisher import Publisher
from loremipsum import get_sentence
from pika.exceptions import ConnectionClosed, ChannelClosed

import time

config = {'userName': 'user',
          'password': 'pass',
          'host': 'rabbit',
          'port': 5672,
          'virtualHost': 'rvhost',
          'exchangeName': 'exchange',
          'routingKey': 'routingkey',
          }


if __name__ == '__main__':

    while True:
        try:
            publisher = Publisher(config)
            for i in range(10):
                sentence = get_sentence()
                publisher.publish(message=sentence)
                time.sleep(1)
        except ConnectionClosed as ccl:
            print(ccl)
        except ChannelClosed as chc:
            print(chc)

        finally:
            print("Retry in 5")
            time.sleep(5)
        # except ChannelClosed as chc:
        #     print(chc)
        #     print("Retry in 5")
        #     time.sleep(5)

