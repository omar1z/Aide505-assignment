const axios = require("axios")
const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.json())

app.post("/ml-predict", (req, res) => {
    console.log("calling ML api ...")
    const itext = req.body.text
    axios.post("http://127.0.0.1:5000/predict", {
        "text": itext
    }).then((mlRes) => {
        console.log("ML api response: ", mlRes.data)
        res.send(mlRes.data)
    }).catch(error => console.error(error))
})

app.listen(4000, () => {
    console.log("running on port 4000")
})