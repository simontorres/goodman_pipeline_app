# from __future__ import absolute_import

from watch import FileSystemEventNotifier
import logging

log = logging.getLogger(__name__)

if __name__ == '__main__':
    log.info("Starting App")
    file_event_notify = FileSystemEventNotifier()
    file_event_notify()