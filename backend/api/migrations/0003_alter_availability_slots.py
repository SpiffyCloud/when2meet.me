# Generated by Django 3.2.5 on 2021-07-21 20:00

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_delete_timeslot'),
    ]

    operations = [
        migrations.AlterField(
            model_name='availability',
            name='slots',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), default=list, size=None),
        ),
    ]
