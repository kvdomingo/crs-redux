# Generated by Django 3.1.1 on 2020-09-14 12:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0041_auto_20200914_1819'),
    ]

    operations = [
        migrations.AddField(
            model_name='regularclass',
            name='days_held',
            field=models.CharField(blank=True, default='TBA', max_length=8),
        ),
        migrations.AddField(
            model_name='regularclass',
            name='end_time',
            field=models.TimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='regularclass',
            name='start_time',
            field=models.TimeField(blank=True, null=True),
        ),
    ]
