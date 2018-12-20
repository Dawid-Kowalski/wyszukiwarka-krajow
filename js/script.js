const countryUrl = "https://restcountries.eu/rest/v1/name/";
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

	let countryNameFirstBig = (countryName.charAt(0)).toUpperCase() + countryName.substring(1);

	for(let i=0; i<resp.length; i++){

		console.log(countryNameFirstBig);
		console.log(resp[i].name);

		if ((resp[i].name).indexOf(countryNameFirstBig) != -1) {
			results.push(resp[i]);
		}
	}

	let countryNameFirstSmall = (countryNameFirstBig.charAt(0)).toLowerCase() + countryNameFirstBig.substring(1);

	for(let i=0; i<resp.length; i++){

		console.log(countryNameFirstSmall);
		console.log(resp[i].name);

		if ((resp[i].name).indexOf(countryNameFirstSmall) != -1) {
			results.push(resp[i]);
		}
	}
	

	while(countryResults.firstChild){
		countryResults.removeChild(countryResults.firstChild);
	}

	for(let i=0; i<results.length; i++) {
		let newUl = document.createElement("li");

		for(let j=0; j<results[i].altSpellings.length-1; j++) {
			let newLi = document.createElement("li");
			newLi.innerHTML = results[i].altSpellings[j+1];
			newUl.appendChild(newLi);
		}

		countryResults.appendChild(newUl);
		let newLine = document.createElement("hr");
		countryResults.appendChild(newLine);
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