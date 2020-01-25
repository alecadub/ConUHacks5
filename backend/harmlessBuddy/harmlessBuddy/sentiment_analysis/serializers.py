from rest_framework import serializers
from .models import Report
from .models import MoodyMessage


class ReportSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Report
        fields = ['name']


class MoodyMessageSerializer(serializers.HyperlinkedModelSerializer):
    report = ReportSerializer()

    class Meta:
        model = MoodyMessage
        fields = ['message', 'mood', 'report']
