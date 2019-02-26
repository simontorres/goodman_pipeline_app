FROM rabbitmq:3.7-management

#RUN service rabbitmq-server start

ADD init.sh /init.sh
RUN chmod +x /init.sh
#RUN sh ./init.sh
CMD ["/init.sh"]