from __future__ import absolute_import

import logging
import os

import pyinotify

from worker_tasks import reduce


class EventHandler(pyinotify.ProcessEvent):

    def __init__(self):
        super(EventHandler, self).__init__()
        self.log = logging.getLogger(__name__)

    def process_IN_DELETE(self, event):
        self.log.info("File Deleted: {:s}".format(os.path.basename(event.pathname)))

    def process_IN_CREATE(self, event):
        self.log.info("File {:s} was created".format(event.pathname))

    def process_IN_CLOSE_WRITE(self, event):
        # print("This is what I want: {:s}.".format(event.pathname))
        self.log.info("File created: {:s}.".format(
            os.path.basename(event.pathname)))
        result = reduce.delay(event.pathname)
        # print(result)


class FileSystemEventNotifier(object):

    def __init__(self):
        self.log = logging.getLogger(__name__)
        self._file_events = pyinotify.IN_OPEN | pyinotify.IN_CLOSE_WRITE | pyinotify.IN_CLOSE_NOWRITE
        self._watch_manager = pyinotify.WatchManager()
        self._event_handler = EventHandler()
        self._notifier = pyinotify.Notifier(self._watch_manager,
                                            self._event_handler)

    def __call__(self, *args, **kwargs):

        print("Starting loop")
        # print(os.getcwd())
        previous_content = os.listdir(os.environ['DATA_DIRECTORY'])
        if len(previous_content) > 0:
            for _file in previous_content:
                result = reduce.delay(os.path.join(os.environ['DATA_DIRECTORY'], _file))
        # print(os.listdir(os.environ['DATA_DIRECTORY']))
        self._watch_manager.add_watch(os.environ['DATA_DIRECTORY'], self._file_events)

        self._notifier.loop()
