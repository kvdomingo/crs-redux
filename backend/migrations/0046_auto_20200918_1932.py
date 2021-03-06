# Generated by Django 3.1.1 on 2020-09-18 11:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0045_auto_20200918_1848'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='regularclass',
            name='demand',
        ),
        migrations.RemoveField(
            model_name='regularclass',
            name='enlisted',
        ),
        migrations.RemoveField(
            model_name='regularclass',
            name='waitlist',
        ),
        migrations.AddField(
            model_name='classtaken',
            name='cancelled_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='classes_cancelled', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='classtaken',
            name='status',
            field=models.CharField(blank=True, choices=[('', ''), ('D', 'Desired'), ('E', 'Enlisted'), ('W', 'Waitlisted'), ('C', 'Cancelled')], max_length=4),
        ),
        migrations.AlterField(
            model_name='classtaken',
            name='grade',
            field=models.CharField(blank=True, choices=[('1.00', '1.00'), ('1.25', '1.25'), ('1.50', '1.50'), ('1.75', '1.75'), ('2.00', '2.00'), ('2.25', '2.25'), ('2.50', '2.50'), ('2.75', '2.75'), ('3.00', '3.00'), ('4.00', '4.00'), ('5.00', '5.00'), ('INC', 'INC'), ('DRP', 'DRP'), ('P', 'P'), ('F', 'F')], max_length=4),
        ),
    ]
