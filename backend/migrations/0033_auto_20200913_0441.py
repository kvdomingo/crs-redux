# Generated by Django 3.1.1 on 2020-09-12 20:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0032_auto_20200913_0403'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userregistrationstatus',
            name='first_enrolled',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='freshmen', to='backend.academicyear'),
        ),
    ]
