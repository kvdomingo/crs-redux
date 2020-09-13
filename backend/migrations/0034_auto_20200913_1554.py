# Generated by Django 3.1.1 on 2020-09-13 07:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0033_auto_20200913_0441'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='userprofile',
            options={'ordering': ['-registration_status__student_number']},
        ),
        migrations.AlterField(
            model_name='userregistrationstatus',
            name='user_status',
            field=models.CharField(blank=True, choices=[('', ''), ('STD', 'Student'), ('JFC', 'Junior Faculty'), ('SFC', 'Senior Faculty'), ('STF', 'Staff')], max_length=4, null=True),
        ),
    ]
