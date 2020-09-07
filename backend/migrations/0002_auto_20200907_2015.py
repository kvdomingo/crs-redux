# Generated by Django 3.1.1 on 2020-09-07 12:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='birthday',
            field=models.DateField(blank=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='course',
            field=models.CharField(blank=True, max_length=64),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='status',
            field=models.CharField(blank=True, choices=[('ST', 'Student'), ('FA', 'Faculty'), ('SF', 'Staff')], max_length=2),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='student_number',
            field=models.PositiveIntegerField(blank=True, unique=True),
        ),
    ]
