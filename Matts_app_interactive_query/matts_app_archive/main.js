angular.module('KRRclass', ['chart.js']).controller('MainCtrl', ['$scope', '$http', mainCtrl]);

function mainCtrl($scope, $http) {

	$scope.startMyAwesomeApp = function () {

		// graph 1
		$scope.myDisplayMessage = "VIS 1 - Countries with most spoken, unofficial languges";
		$scope.myDisplayDescription = "the above graph shows the top 10 countries in terms of the number of spoken, yet unofficial languages."
		$scope.mySparqlEndpoint = "http://dbpedia.org/sparql";
		$scope.mySparqlQuery = encodeURI("PREFIX dbo: <http://dbpedia.org/ontology/>\
											PREFIX dbr: <http://dbpedia.org/resource/>\
											SELECT ?country (COUNT(?language) AS ?language) \
												WHERE {\
														?country a dbo:Country ;\
														dbo:language ?language .   \
														MINUS {?country dbo:officialLanguage ?language }\
													}  \
												ORDER BY DESC(?language)\
											LIMIT 10").replace(/#/g, '%23');

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
				$scope.myDynamicData = [];

				// now iterate on the results
				angular.forEach(data.results.bindings, function (val) {
					$scope.myDynamicLabels.push(val.country.value.split('/')[4]);
					$scope.myDynamicData.push(val.language.value);
				});
			})
			.error(function (error) {
				console.log('Error running the input query!' + error);
			});

		// graph 2
		$scope.myDisplayMessage2 = "VIS 2 - Comparison of percentageOfAreaWater, populationDensity, populationTotal of countries.";
		$scope.myDisplayDescription2 = "the above graph shows a comparison of percentageOfAreaWater, populationDensity, populationTotal of countries."
		$scope.mySparqlEndpoint2 = "http://dbpedia.org/sparql";
		$scope.mySparqlQuery2 = encodeURI(`PREFIX dbo: <http://dbpedia.org/ontology/>
											PREFIX dbr: <http://dbpedia.org/resource/>
											
											
											SELECT DISTINCT ?country ?poaWater ?pDensity ?pTotal
												WHERE {
														?country a dbo:Country;
																dbo:percentageOfAreaWater ?poaWater;
																dbo:populationDensity ?pDensity;
																dbo:populationTotal ?pTotal
													}
											GROUP BY (?pTotal)
											LIMIT 5`).replace(/#/g, '%23');

		$http({
				method: "GET",
				url: $scope.mySparqlEndpoint2 + "?query=" + $scope.mySparqlQuery2,
				headers: {
					'Accept': 'application/sparql-results+json',
					'Content-Type': 'application/sparql-results+json'
				}
			})
			.success(function (data, status) {
				$scope.myDynamicLabels2 = [];
				$scope.myDynamiccountry = [];
				$scope.myDynamicpoaWater = [];
				$scope.myDynamicpDensity = [];
				$scope.myDynamicpTotal = [];

				// now iterate on the results
				angular.forEach(data.results.bindings, function (val) {
					$scope.myDynamicLabels2.push(val.country.value.split('/')[4]);
					$scope.myDynamicpoaWater.push(val.poaWater.value);
					$scope.myDynamicpDensity.push(val.pDensity.value);
					$scope.myDynamicpTotal.push(val.pTotal.value);
				});
				$scope.myDynamicData2 = [$scope.myDynamicpoaWater, $scope.myDynamicpDensity, $scope.myDynamicpTotal]
			})
			.error(function (error) {
				console.log('Error running the input query!' + error);
			});

	};
	$scope.startMyAwesomeApp()

}