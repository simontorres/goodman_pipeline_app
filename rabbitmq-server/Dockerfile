FROM rabbitmq:3.6-management

RUN service rabbitmq-server start

ADD init.sh /init.sh
RUN chmod +x /init.sh
CMD ["/init.sh"]