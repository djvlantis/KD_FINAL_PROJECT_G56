angular.module('KRRclass', ['chart.js']).controller('MainCtrl', ['$scope', '$http', mainCtrl]);

function mainCtrl($scope, $http) {
	// CANVAS
	const canvas = document.querySelector('canvas');
	console.log(canvas)




	var country1 = document.getElementById("country_select_1");
	country1.onchange = function () {
		console.log(country1.value);
		$scope.startMyAwesomeApp()


	}

	var country2 = document.getElementById("country_select_2");
	country2.onchange = function () {
		console.log(country2.value);
		$scope.startMyAwesomeApp()
	}

	$scope.startMyAwesomeApp = function () {

		// graph 1
		$scope.myDisplayMessage = "";
		$scope.myDisplayDescription = ""
		$scope.mySparqlEndpoint = "http://dbpedia.org/sparql";
		$scope.mySparqlQuery = encodeURI(`PREFIX dbp: <http://dbpedia.org/property/>
											PREFIX dbo: <http://dbpedia.org/ontology/>
											PREFIX dbr: <http://dbpedia.org/resource/>
											
											SELECT DISTINCT ?gdpPerCapitaCountry1 ?gdpPerCapitaCountry2
												WHERE {
															dbr:${country1.value} dbp:gdpNominalPerCapita ?gdpPerCapitaCountry1 .
															dbr:${country2.value} dbp:gdpNominalPerCapita ?gdpPerCapitaCountry2 . 
													}
											LIMIT 10`).replace(/#/g, '%23');

		$http({
				method: "GET",
				url: $scope.mySparqlEndpoint + "?query=" + $scope.mySparqlQuery,
				headers: {
					'Accept': 'application/sparql-results+json',
					'Content-Type': 'application/sparql-results+json'
				}
			})
			.success(function (data, status) {
				$scope.myDynamicLabels = [];
				$scope.myDynamicgdpPerCapitaCountry1 = [];
				$scope.myDynamicgdpPerCapitaCountry2 = [];

				// now iterate on the results
				angular.forEach(data.results.bindings, function (val) {
					// $scope.myDynamicLabels.push(val.country.value.split('/')[4]);
					$scope.myDynamicgdpPerCapitaCountry1.push(val.gdpPerCapitaCountry1.value);
					$scope.myDynamicgdpPerCapitaCountry2.push(val.gdpPerCapitaCountry2.value);
				});
				$scope.myDynamicData = [$scope.myDynamicgdpPerCapitaCountry1, $scope.myDynamicgdpPerCapitaCountry2]
			})
			.error(function (error) {
				console.log('Error running the input query!' + error);
			});


	};


}