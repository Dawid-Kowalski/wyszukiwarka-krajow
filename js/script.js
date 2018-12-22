const countryUrl = "https://restcountries.eu/rest/v2/name/";

let countryTemplate = document.getElementById("country-template").innerHTML;
Mustache.parse(countryTemplate);

let countryResults = document.getElementById("country-results");
let showResultsButton = document.getElementById("show-results-button");



showResultsButton.addEventListener("click", function() {

	let countryName = getCountryName();

	fetch(countryUrl + countryName)
		
		.then(function(resp) {
			return resp.json();
		})

		.then(showCountrysList);

	return countryName;
})

function showCountrysList(resp) {

	let results = [];

	let countryName = getCountryName();

	filtrName(countryName, resp, results);


	while(countryResults.firstChild){
		countryResults.removeChild(countryResults.firstChild);
	}

	for(let i=0; i<results.length; i++) {
		let generatedCountry = Mustache.render(countryTemplate, results[i]);
		countryResults.insertAdjacentHTML("beforeend", generatedCountry);
	}
}

function getCountryName() {
	let countryName = document.getElementById("country-name").value;

	if(countryName == "") {
		countryName = "Poland";
	}

	countryName.toLowerCase();

	return countryName;
}

function filtrName(countryName, resp, results) {

	let countryNameFirstBig = (countryName.charAt(0)).toUpperCase() + countryName.substring(1);


	for(let i=0; i<resp.length; i++){

		if ((resp[i].name).indexOf(countryNameFirstBig) != -1) {
			results.push(resp[i]);
		}
	}

	let countryNameFirstSmall = (countryNameFirstBig.charAt(0)).toLowerCase() + countryNameFirstBig.substring(1);

	for(let i=0; i<resp.length; i++){

		if ((resp[i].name).indexOf(countryNameFirstSmall) != -1) {
			results.push(resp[i]);
		}
	}
}