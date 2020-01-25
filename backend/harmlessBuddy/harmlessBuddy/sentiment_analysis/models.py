from django.db import models

DEFAULT = 0


class Report(models.Model):
    name = models.CharField(max_length=256, default='report 0')


class MoodyMessage(models.Model):
    report = models.ForeignKey(Report, related_name='report', on_delete=models.CASCADE, default=DEFAULT)
    message = models.CharField(max_length=256)
    mood = models.CharField(max_length=256)
