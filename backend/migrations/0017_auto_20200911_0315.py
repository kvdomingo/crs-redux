# Generated by Django 3.1.1 on 2020-09-10 19:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0016_auto_20200911_0201'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='user_status',
        ),
        migrations.AddField(
            model_name='userregistrationstatus',
            name='user_status',
            field=models.CharField(blank=True, choices=[('ST', 'Student'), ('FA', 'Faculty'), ('SF', 'Staff')], max_length=2, null=True),
        ),
    ]