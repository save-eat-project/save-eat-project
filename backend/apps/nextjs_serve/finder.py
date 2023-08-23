import os
from django.conf import settings
from django.contrib.staticfiles import utils, finders
from django.core.checks.messages import CheckMessage, Error
from django.core.files.storage import FileSystemStorage
from pathlib import Path


class NextJsFinder(finders.BaseFinder):

    def __init__(self) -> None:
        self.NEXTJS_DIR: Path = settings.NEXTJS_DIR
        self.storage = FileSystemStorage(location=self.NEXTJS_DIR)

    def check(self, **kwargs) -> list[CheckMessage]:
        errors: list[CheckMessage] = []

        if not isinstance(settings.NEXTJS_DIR, Path):
            errors.append(Error('NEXTJS_DIR setting is not exist'))
            return errors

        if not os.path.isdir(settings.NEXTJS_DIR):
            errors.append(Error('NEXTJS_DIR(%s) directory not exist'))

        return errors

    def find(self, path: str, all: bool = False):
        matches = []
        if self.storage.exists(path):
            location = self.storage.path(path)
            if not all:
                return location
            matches.append(location)

        return matches

    def list(self, ignore_patterns=[]):
        for path in utils.get_files(self.storage, ['*.html', *ignore_patterns]):
            yield path, self.storage

    def list_template(self):
        for path in utils.get_files(self.storage):

            if not path.endswith('.html'):
                continue
            if path == '404.html':
                continue

            yield path
