# Generated by Django 3.0.2 on 2020-01-25 20:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sentiment_analysis', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='report',
            name='data',
        ),
        migrations.AddField(
            model_name='moodymessage',
            name='report',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='report', to='sentiment_analysis.Report'),
        ),
        migrations.AddField(
            model_name='report',
            name='name',
            field=models.CharField(default='report 0', max_length=256),
        ),
    ]
