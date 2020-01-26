from rest_framework import serializers
from .models import Report
from .models import MoodyMessage

import argparse

from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types
import io
from google.cloud import speech_v1
from google.cloud.speech_v1 import enums


class ReportSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Report
        fields = ['name']


class MoodyMessageSerializer(serializers.HyperlinkedModelSerializer):
    report = ReportSerializer()

    class Meta:
        model = MoodyMessage
        fields = ['message', 'mood', 'report', 'score']

    def create(self, validated_data):
        report = validated_data.pop('report')
        existing_report = Report.objects.filter(name=report['name'])

        if len(existing_report) < 1:
            final_report = Report.objects.create(name=report['name'])
        else:
            final_report = existing_report[0]

        text_score = round(analyze(validated_data['message']), 2)

        text_mood = "Bad"

        if text_score > 0.5:
            text_mood = "Good"
        elif 0.19 < text_score < 0.5:
            text_mood = "Neutral"
        else:
            text_mood = "Bad"

        moody_message = MoodyMessage.objects.create(
            report=final_report,
            message=validated_data['message'],
            mood=text_mood,
            confidence='0.95',
            score=text_score
        )
        return moody_message


def analyze(content):
    client = language.LanguageServiceClient()

    document = types.Document(
        content=content,
        type='PLAIN_TEXT')
    annotations = client.analyze_sentiment(document=document)
    return annotations.document_sentiment.score


def getText(filename):
    """Run a sentiment analysis request on text within a passed filename."""

    with open(filename, 'r') as review_file:
        # Instantiates a plain text document.
        content = review_file.read()

    analyze(content)


def sample_long_running_recognize(local_file_path):
    """
    Transcribe a long audio file using asynchronous speech recognition
    Args:
      local_file_path Path to local audio file, e.g. /path/audio.wav
    """

    client = speech_v1.SpeechClient()

    # local_file_path = 'resources/audio.raw'

    # The language of the supplied audio
    language_code = "en-US"

    # Sample rate in Hertz of the audio data sent
    sample_rate_hertz = 16000

    # Encoding of audio data sent. This sample sets this explicitly.
    # This field is optional for FLAC and WAV audio formats.
    encoding = enums.RecognitionConfig.AudioEncoding.LINEAR16
    config = {
        "language_code": language_code,
        "sample_rate_hertz": sample_rate_hertz,
        "encoding": encoding,
    }
    with io.open(local_file_path, "rb") as f:
        content = f.read()
    audio = {"content": content}

    operation = client.long_running_recognize(config, audio)

    print(u"Printing to file")
    response = operation.result()
    # f= open("textfile.txt", "w+")
    # for word in text2save.split():
    #     f.write(word + " ")
    for result in response.results:
        # First alternative is the most probable result
        alternative = result.alternatives[0]
        print(u"Transcript: {}".format(alternative.transcript))

    text2save = response.results[0].alternatives[0].transcript
    return text2save

# [END speech_transcribe_async]
