# Generated by Django 3.2.5 on 2021-07-29 01:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_availability_slots'),
    ]

    operations = [
        migrations.AlterField(
            model_name='availability',
            name='name',
            field=models.CharField(max_length=100),
        ),
    ]