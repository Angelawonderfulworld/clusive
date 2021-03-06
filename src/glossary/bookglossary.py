import json
import logging
import os

from django.contrib.staticfiles import finders

import glossary.util as glossaryutil

logger = logging.getLogger(__name__)

# Methods for looking up words in a book's glossary


class BookGlossary:

    book = None
    data = None

    def __init__(self, book):
        self.book = book

    def init_data(self):
        self.data = {}
        pubs_directory = finders.find('shared/pubs')
        book_dir = os.path.join(pubs_directory, self.book)
        try:
            with open(os.path.join(book_dir, 'glossary.json'), 'r', encoding='utf-8') as file:
                logger.debug("Reading glossary %s", file.name)
                rawdata = json.load(file)
                self.data = {}
                for worddata in rawdata:
                    base = glossaryutil.base_form(worddata['headword'])
                    self.data[base] = worddata
                    for altform in worddata['alternateForms']:
                        self.data[altform.lower()] = worddata
        except EnvironmentError:
            logger.error("Failed to read glossary data")

    def lookup(self, word):
        if self.data is None:
            self.init_data()
        return self.data.get(word.lower())

