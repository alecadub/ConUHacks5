# import sentiment_analysis as sentiment_analysis
# import T2S_test as speech2text

# def getSentimentOfText(audio_file):
#     # Get text from audio
#     text = speech2text.sample_long_running_recognize(audio_file)
#     print('Text from Speech: ', text)
#     # Get Sentiment of text 
#     text_sentiment = sentiment_analysis.analyze(text)
#     print('Sentimant Found', text_sentiment)
#     print('Result => Text: {} Sentiment : {}'.format(text, text_sentiment))


# getSentimentOfText('resources/brooklyn_bridge.raw')