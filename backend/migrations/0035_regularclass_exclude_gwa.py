# Generated by Django 3.1.1 on 2020-09-13 08:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0034_auto_20200913_1554'),
    ]

    operations = [
        migrations.AddField(
            model_name='regularclass',
            name='exclude_gwa',
            field=models.BooleanField(default=False),
        ),
    ]
