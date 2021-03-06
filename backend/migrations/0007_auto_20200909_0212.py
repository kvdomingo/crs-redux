# Generated by Django 3.1.1 on 2020-09-08 18:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_userregistrationstatus_user'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='userregistrationstatus',
            options={'verbose_name_plural': 'User registration status'},
        ),
        migrations.AlterField(
            model_name='userregistrationstatus',
            name='user',
            field=models.OneToOneField(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='registration_status', to='backend.userprofile'),
        ),
    ]
