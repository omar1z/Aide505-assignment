const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));  // Change to support form submissions

app.get('/', (req, res) => {
    res.send(`
        <html>
            <body>
                <h1>Write a sentence to test its sentiment :) </h1>
                <form action="/analyze-sentiment" method="POST">
                    <label for="text">Sentence:</label>
                    <input type="text" id="text" name="text" required> <!-- Corrected name -->
                    <br>
                    <button type="submit">Submit</button>
                </form>
            </body>
        </html>
    `);
});

app.post("/analyze-sentiment", (req, res) => {
    console.log("calling ML api ...");
    const itext = req.body.text;  // Adjusted to match the form field name
    axios.post("http://127.0.0.1:5000/predict", {
        "text": itext
    }).then((mlRes) => {
        console.log("ML api response: ", mlRes.data);
        res.send(`
            <html>
                <body>
                    <h1>Sentiment Analysis Result:</h1>
                    <p>${JSON.stringify(mlRes.data)}</p> <!-- Display ML API response -->
                    <a href="/">Go back</a> <!-- Link back to the form -->
                </body>
            </html>
        `);
    }).catch(error => console.error(error));
});

app.listen(4000, () => {
    console.log("running on port 4000");
});
