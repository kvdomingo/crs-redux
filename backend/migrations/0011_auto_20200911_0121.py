# Generated by Django 3.1.1 on 2020-09-10 17:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0010_auto_20200910_0532'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='regularclass',
            options={'ordering': ['-class_code'], 'verbose_name_plural': 'Regular classes'},
        ),
        migrations.AlterField(
            model_name='regularclass',
            name='description',
            field=models.TextField(blank=True),
        ),
    ]
