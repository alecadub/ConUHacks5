from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Report


class ReportSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Report
        fields = ['message', 'mood']
