const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    let crypto = req.body.crypto;
    let fiat = req.body.fiat;
    let amount = req.body.amount;
    let options = {
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        headers: {
            "x-ba-key": "YTNiYjJhMzk4MDdiNDQxNjg5OGNmNWU1ZjhjZjFmZDI"
        },
        method: "GET",
        qs: {
            from: crypto,
            to: fiat,
            amount: amount
            }
        }

    request(options, function(error, response, body){
        let data = JSON.parse(body);      
        let price = data.price;
        let time = data.time;
        
        console.log(price);
        console.log(time);
        
        if (!error && response.statusCode == 200) {
            console.log(price);
            console.log(time);
            res.send(`<h1>${amount} ${crypto} is currently worth ${price}${fiat} at ${time}</h1>`);
        }else{
            console.log(error);
            res.send(error);
        }
    });

});

app.listen(3000, function() {
    console.log("Server running on port 3000.");
});
