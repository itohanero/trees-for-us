const express = require('express')
const app = express()
const port = 80

app.get('/', (req, res) => {
  res.send('<b>Hello World!</b>')
})

app.post('/post',(req,res) => {
	console.log(req);
	res.send("Hi");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://plants.usda.gov/api/plants/search?county=Adams',
  'headers': {
    'Accept': 'application/json'
  }
};

request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

