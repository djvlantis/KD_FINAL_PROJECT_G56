angular.module('KRRclass', ['chart.js']).controller('MainCtrl', ['$scope', '$http', mainCtrl]);

function mainCtrl($scope, $http) {
	// // CANVAS
	// const canvas = document.querySelector('canvas');
	// console.log(canvas)



	var index = 0;
	var max = 0;

	var clickerNext = document.getElementById("click_next");
	clickerNext.onclick = function () {
		$scope.startMyAwesomeApp()
		if (index <= max) {
			index++;
		}
		console.log(index);
	}

	var clickerPrevious = document.getElementById("click_previous");
	clickerPrevious.onclick = function () {
		$scope.startMyAwesomeApp()
		if (index > max) {
			index--;
		}
		console.log(index);
	}



	// var country2 = document.getElementById("country_select_2");
	// country2.onchange = function () {
	// 	console.log(country2.value);
	// 	$scope.startMyAwesomeApp()
	// }

	$scope.startMyAwesomeApp = function () {

		// graph 1
		$scope.myDisplayMessage = "test";
		$scope.myDisplayDescription = ""
		$scope.mySparqlEndpoint = "http://192.168.18.4:7200/repositories/repo17";
		$scope.mySparqlQuery = encodeURI(`PREFIX on:<http://www.example.org/KD/FP/ontology/>
											PREFIX oon:<http://www.example.org/KD/FP/ontology#>
											PREFIX owl: <http://www.w3.org/2002/07/owl#>
											SELECT DISTINCT ?Planet ?Host
											WHERE 
											{
											?Planet a on:Planet;
													a oon:PotentiallyInhabitablePlanet;
													on:HasHostName ?Host
											
											}LIMIT 10`).replace(/#/g, '%23');

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
				$scope.myDynamicPlanet = [];
				$scope.myDynamicHost = [];
				// now iterate on the results
				angular.forEach(data.results.bindings, function (val) {
					// $scope.myDynamicLabels.push(val.country.value.split('/')[3]);
					$scope.myDynamicPlanet.push(val.Planet.value.split('/')[6]);
					$scope.myDynamicHost.push(val.Host.value);
				});
				$scope.myDynamicData = [$scope.myDynamicPlanet, $scope.myDynamicHost]
				// console.log($scope.myDynamicPlanet)
				// console.log("myDynamicPlanet")

				// for (const row of $scope.myDynamicData) {
				// 	// console.log(row);
				// 	console.log(row[index])
				// }

				console.log($scope.myDynamicPlanet[index]);
				$scope.Planet = $scope.myDynamicPlanet[index];

				console.log($scope.myDynamicHost[index]);
				$scope.PlanetHost = $scope.myDynamicHost[index];

				max = $scope.myDynamicPlanet.length



			})
			.error(function (error) {
				console.log('Error running the input query!' + error);
			});


	};
	$scope.startMyAwesomeApp()


}