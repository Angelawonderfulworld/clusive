# Generated by Django 2.2.4 on 2019-10-14 13:55
import logging

from django.db import migrations

from library.admin import load_static_books

logger = logging.getLogger(__name__)


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('library', '0004_auto_20191022_1521'),
    ]

    operations = [
    ]
