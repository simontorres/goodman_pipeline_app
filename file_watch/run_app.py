import sys

import logging

from watch import FileSystemEventNotifier

logging.basicConfig(stream=sys.stdout, level=logging.INFO)

if __name__ == '__main__':
    print("Instantiating Event Notifier")
    file_event_notifier = FileSystemEventNotifier()
    file_event_notifier()
