import pika

class Consumer(object):

    def __init__(self, config):
        self.config = config

    def __enter__(self):
        self.connection = self._create_connection()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.connection.close()

    def _create_exchange(self, channel):
        exchange_options = self.config['exchangeOptions']
        channel.exchange_declare(exchange=self.config['exchangeName'],
                                 exchange_type=self.config['exchangeType'],
                                 passive=exchange_options['passive'],
                                 durable=exchange_options['durable'],
                                 auto_delete=exchange_options['autoDelete'],
                                 internal=exchange_options['internal'])

    def _create_queue(self, channel):
        queue_options = self.config['queueOptions']
        channel.queue_declare(queue=self.config['queueName'],
                              passive=queue_options['passive'],
                              durable=queue_options['durable'],
                              exclusive=queue_options['exclusive'],
                              auto_delete=queue_options['autoDelete'])

    def _create_connection(self):
        credentials = pika.PlainCredentials(self.config['userName'],
                                            self.config['password'])

        parameters = pika.ConnectionParameters(self.config['host'],
                                               self.config['port'],
                                               self.config['virtualHost'],
                                               credentials,
                                               ssl=True)

        return pika.BlockingConnection(parameters)

