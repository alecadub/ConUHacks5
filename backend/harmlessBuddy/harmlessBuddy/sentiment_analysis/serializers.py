from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Report
from .models import MoodyMessage


class MoodyMessageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MoodyMessage
        fields = ['message', 'mood']


class ReportSerializer(serializers.HyperlinkedModelSerializer):
    moody_message = MoodyMessageSerializer(many=True)

    class Meta:
        model = Report
        fields = ['data', 'moody_message']

    def create(self, validated_data):
        data = validated_data.pop('moody_message')
        report = Report.objects.create(**validated_data)
        for moody_message in data:
            MoodyMessage.objects.create(**moody_message)
        Report.objects.create(**data)
        return report
