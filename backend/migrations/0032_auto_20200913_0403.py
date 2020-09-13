# Generated by Django 3.1.1 on 2020-09-12 20:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0031_auto_20200913_0259'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userregistrationstatus',
            name='user',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='registration_status', to=settings.AUTH_USER_MODEL),
        ),
    ]