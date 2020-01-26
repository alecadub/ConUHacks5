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
        existing_report = Report.objects.filter(name=report['name'])

        if len(existing_report) < 1:
            final_report = Report.objects.create(name=report['name'])
        else:
            final_report = existing_report[0]

        moody_message = MoodyMessage.objects.create(
            report=final_report,
            message=validated_data['message'],
            mood=validated_data['mood']
        )
        return moody_message
