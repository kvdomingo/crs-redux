# Generated by Django 3.1.1 on 2020-09-11 07:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0023_auto_20200911_1530'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='course',
        ),
        migrations.AddField(
            model_name='userregistrationstatus',
            name='course',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
    ]