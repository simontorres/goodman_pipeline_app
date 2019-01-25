from __future__ import absolute_import

from consumer import Consumer


def callback_ftn(arg):
    print(arg)


config = {'userName': 'guest',
          'password': 'guest',
          'host': 'localhost',
          'port': 5672,
          'virtualHost': 'rvhost',
          'queueName': 'default',
          'exchangeName': 'exchange',
          'routingKey': 'routingkey',
          'exchangeType': 'direct',
          'exchangeOptions': {'passive': False,
                              'durable': False,
                              'autoDelete': True,
                              'internal': False},
          'queueOptions': {'passive': False,
                           'durable': False,
                           'exclusive': False,
                           'autoDelete': True}
          }

print(config)
if __name__ == '__main__':

    with Consumer(config) as csmr:

        csmr.consume(message_received_callback=callback_ftn)