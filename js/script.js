const countryUrl = "https://restcountries.eu/rest/v1/name/";
let countryResults = document.getElementById("country-results");
let showResultsButton = document.getElementById("show-results-button");


showResultsButton.addEventListener("click", function() {
	let countryName = document.getElementById("country-name").value;

	if(countryName == "") {
		countryName = "Poland";
	}

	fetch(countryUrl + countryName)
		
		.then(function(resp) {
			return resp.json();
		})

		.then(showCountrysList);
})

function showCountrysList(resp) {
	console.log(resp);
}