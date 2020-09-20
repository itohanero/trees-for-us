const express = require('express')
var request = require('request');
const app = express()
const port = 80

const TREE_LIST = require('./treelist.json');


function getTreesInCounty(county) {

	let finalList = [];
 var options = {
  'method': 'GET',
  'url': `https://plants.usda.gov/api/plants/search?county=${county}`,
  'headers': {
    'Accept': 'application/json'
  }
	};



	return new Promise((resolve, reject) => {
	request(options, function (error, response) {

	  if (error) throw new Error(error);  


	console.log("Got some plants");

	let data = JSON.parse(response.body);
	const fs = require('fs');

fs.writeFile("./search.json", JSON.stringify(response.body), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 
//	console.log(response.body);
  for (let tree_index in data.basic_plant_list.plant_list) {
	  let current_plant = data.basic_plant_list.plant_list[tree_index];
	  //console.log("are we here?");
		for (index in TREE_LIST) {
			//console.log(current_plant + " " + TREE_LIST[index]);
			if (TREE_LIST[index] === current_plant.accepted_plant.symbol) {
				finalList.push(current_plant);
				break;
			}
		}
	

	 }
         resolve(finalList);

});

});

}

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('<b>Hello World!</b>')
})



app.post('/post',(req,res) => {
	console.log(req.body);
	getTreesInCounty(req.body.county)
	.then((resultingList) => {
		console.log(`Got some trees: ${resultingList}`);
		res.json(resultingList);

	}		);
	
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



