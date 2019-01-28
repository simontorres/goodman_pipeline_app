import pika


class Consumer(object):

    def __init__(self, config):
        self.config = config

    def __enter__(self):
        self.connection = self._create_connection()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.connection.close()

    def consume(self, message_received_callback):
        self.message_received_callback = message_received_callback

        channel = self.connection.channel()
        self._create_exchange(channel)
        self._create_queue(channel)
        channel.queue_bind(queue=self.config['queueName'],
                           exchange=self.config['exchangeName'],
                           routing_key=self.config['routingKey'])

        channel.basic_consume(self._consume_message, queue=self.config['queueName'])
        channel.start_consuming()

    def _consume_message(self, channel, method, properties, body):
        self.message_received_callback(body)
        channel.basic_ack(delivery_tag=method.delivery_tag)

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
                                               ssl=False)

        return pika.BlockingConnection(parameters)

