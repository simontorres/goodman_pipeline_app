from __future__ import absolute_import

from pika.exceptions import ConnectionClosed
from consumer import Consumer

import time


def callback_ftn(arg):
    print(arg)


config = {'userName': 'user',
          'password': 'pass',
          'host': 'rabbit',
          'port': 5672,
          'virtualHost': 'rvhost',
          'queueName': 'default',
          'exchangeName': 'exchange',
          'routingKey': 'routingkey',
          'exchangeType': 'direct',
          'exchangeOptions': {'passive': False,
                              'durable': True,
                              'autoDelete': True,
                              'internal': False},
          'queueOptions': {'passive': False,
                           'durable': False,
                           'exclusive': False,
                           'autoDelete': True}
          }

# print(config)
if __name__ == '__main__':
    while True:
        try:
            with Consumer(config) as csmr:
                print("1 test print from consumer instantiated")
                csmr.consume(message_received_callback=callback_ftn)
        except ConnectionClosed:
            print("Unable to connect")
            print("Retry in 5")
            time.sleep(5)
