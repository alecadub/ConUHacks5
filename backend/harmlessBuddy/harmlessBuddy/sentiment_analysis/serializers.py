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

    def create(self, validated_data):
        report = validated_data.pop('report')
        report_object = Report.objects.create(name=report['name'])
        moody_message = MoodyMessage.objects.create(
            report=report_object,
            message=validated_data['message'],
            mood=validated_data['mood']
        )
        return moody_message
