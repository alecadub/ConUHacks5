# Generated by Django 3.0.2 on 2020-01-26 10:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sentiment_analysis', '0004_auto_20200126_1025'),
    ]

    operations = [
        migrations.AlterField(
            model_name='moodymessage',
            name='confidence',
            field=models.CharField(max_length=256),
        ),
    ]
