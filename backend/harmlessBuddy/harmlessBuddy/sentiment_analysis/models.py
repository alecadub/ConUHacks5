from django.db import models


class MoodyMessage(models.Model):
    message = models.CharField(max_length=256)
    mood = models.CharField(max_length=256)


class Report(models.Model):
    data = models.ForeignKey(MoodyMessage, on_delete=models.CASCADE)
