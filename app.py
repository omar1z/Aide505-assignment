from flask import Flask, jsonify, request
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import numpy as np

# Initialize the VADER Sentiment Analyzer
analyzer = SentimentIntensityAnalyzer()
text = "I absolutely love this product! It's amazing."
# Get the sentiment scores
scores = analyzer.polarity_scores(text)
print(scores)

