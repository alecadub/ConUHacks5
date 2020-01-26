from rest_framework import serializers
from .models import Report
from .models import MoodyMessage
# import sentiment_analysis as sentiment_analysis
# import T2S_test as speech2text


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

        # Validated_data is a audio file
        # Get Text from Audio
        # text = speech2text.sample_long_running_recognize(validated_data)
        # Get Sentiment of text 
        # text_sentiment = sentiment_analysis.analyze(text)

        text_mood = "Bad"
        # if text_sentiment > 0.5: text_mood = "Good"
        # elif text_sentiment == 'None' : text_mood = "Neutral"
        # else : text_mood = "Bad"

        if len(existing_report) < 1:
            final_report = Report.objects.create(name=report['name'])
        else:
            final_report = existing_report[0]

        moody_message = MoodyMessage.objects.create(
            report=final_report,
            message=validated_data['message'],
            mood=text_mood
        )
        return moody_message
