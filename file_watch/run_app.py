from __future__ import absolute_import
from app import FileSystemEventNotifier


if __name__ == '__main__':
    print("starting......")
    file_event_notifier = FileSystemEventNotifier()
    file_event_notifier()