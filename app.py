from flask import Flask, jsonify, request
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import numpy as np

# Initialize the VADER Sentiment Analyzer
analyzer = SentimentIntensityAnalyzer()
# text = "I absolutely love this product! It's amazing."
# # Get the sentiment scores
# scores = analyzer.polarity_scores(text)
# print(scores)

app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        text = data.get("text", "Guest")
        prediction = analyzer.polarity_scores(text)
        if(prediction['neg'] >= 0.5):
            # return jsonify({"prediction": f"{prediction}"})
            return jsonify({'prediction': 'negative'})
        elif(prediction['pos'] >= 0.5):
            return jsonify({'prediction': 'positive'})
        else:
            return jsonify({'prediction': 'neutral'})
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
if __name__ == "__main__":
    app.run(debug=True)