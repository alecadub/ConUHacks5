# import os
# os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="apikey.json"

"""Demonstrates how to make a simple call to the Natural Language API."""

import argparse

from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types


def print_result(annotations):
    score = annotations.document_sentiment.score
    magnitude = annotations.document_sentiment.magnitude

    for index, sentence in enumerate(annotations.sentences):
        sentence_sentiment = sentence.sentiment.score
        print('Sentence {} has a sentiment score of {}'.format(
            index, sentence_sentiment))

    print('Overall Sentiment: score of {} with magnitude of {}'.format(score, magnitude))
    # f= open("AnaysisResult.txt", "w+")
    # f.write(score)

    return score


def analyze(content):
    client = language.LanguageServiceClient()

    document = types.Document(
        content=content,
        type=enums.Document.Type.PLAIN_TEXT)
    annotations = client.analyze_sentiment(document=document)

    # Print the results
    print_result(annotations)

def getText(filename):
    """Run a sentiment analysis request on text within a passed filename."""
    
    with open(filename, 'r') as review_file:
        # Instantiates a plain text document.
        content = review_file.read()

    analyze(content)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument(
        'filename',
        help='The filename of the text you would like to analyse.')
    args = parser.parse_args()

    getText(args.filename)