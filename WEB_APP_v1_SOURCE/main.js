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
		index++
		console.log(index);
	}

	var clickerPrevious = document.getElementById("click_previous");
	clickerPrevious.onclick = function () {
		$scope.startMyAwesomeApp()
		index--
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
		$scope.mySparqlEndpoint = "http://192.168.18.4:7200/repositories/repo18";
		$scope.mySparqlQuery = encodeURI(`PREFIX on:<http://www.example.org/KD/FP/ontology/>
											PREFIX oon:<http://www.example.org/KD/FP/ontology#>
											PREFIX owl: <http://www.w3.org/2002/07/owl#>
											
											SELECT ?PlanetName ?Density ?Mass ?Size ?NumberOfStars ?Host ?Temp ?StellarTemp
											WHERE  { ?PlanetName a  on:Planet ;
													on:HasHostName ?Host.
												OPTIONAL { ?PlanetName  on:HasDensity  ?Density }
												OPTIONAL { ?PlanetName  on:HasMass  ?Mass }
												OPTIONAL { ?PlanetName  on:HasRadius  ?Size }
												OPTIONAL { ?PlanetName  on:HasNumberOfHosts  ?NumberOfStars }
												OPTIONAL { ?PlanetName  on:HasTemperature  ?Temp }
												OPTIONAL { ?PlanetName  on:HasHostTemperature  ?StellarTemp }
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
				$scope.myDynamicPlanetName = [];
				$scope.myDynamicDensity = [];
				$scope.myDynamicMass = [];
				$scope.myDynamicSize = [];
				$scope.myDynamicNumberOfStars = [];
				$scope.myDynamicHost = [];
				$scope.myDynamicTemp = [];
				$scope.myDynamicStellarTemp = [];

				// now iterate on the results
				angular.forEach(data.results.bindings, function (val) {
					// $scope.myDynamicLabels.push(val.country.value.split('/')[3]);
					$scope.myDynamicPlanetName.push(val.PlanetName.value.split('/')[6]);
					// $scope.myDynamicDensity.push(val.Density.value);
					$scope.myDynamicMass.push(val.Mass.value);
					$scope.myDynamicSize.push(val.Size.value);
					$scope.myDynamicNumberOfStars.push(val.NumberOfStars.value);
					$scope.myDynamicHost.push(val.Host.value);
					// $scope.myDynamicTemp.push(val.Temp.value);
					$scope.myDynamicStellarTemp.push(val.StellarTemp.value);
				});
				$scope.myDynamicData = [$scope.myDynamicPlanetName, $scope.myDynamicDensity, $scope.myDynamicMass, $scope.myDynamicSize, $scope.myDynamicNumberOfStars, $scope.myDynamicHost, $scope.myDynamicTemp, $scope.myDynamicStellarTemp]
				console.log("myDynamicData")
				console.log($scope.myDynamicData)


				// for (const row of $scope.myDynamicData) {
				// 	// console.log(row);
				// 	console.log(row[index])
				// }

				console.log($scope.myDynamicPlanetName[index]);
				$scope.Planet = $scope.myDynamicPlanetName[index].replace(/%20/gi, ' ');

				console.log($scope.myDynamicDensity[index]);
				$scope.PlanetDensity = $scope.myDynamicDensity[index];

				console.log($scope.myDynamicMass[index]);
				$scope.PlanetMass = $scope.myDynamicMass[index];

				console.log($scope.myDynamicSize[index]);
				$scope.PlanetSize = $scope.myDynamicSize[index];

				console.log($scope.myDynamicNumberOfStars[index]);
				$scope.PlanetNumberOfStars = $scope.myDynamicNumberOfStars[index];

				console.log($scope.myDynamicHost[index]);
				$scope.PlanetHost = $scope.myDynamicHost[index];

				console.log($scope.myDynamicTemp[index]);
				$scope.PlanetTemp = $scope.myDynamicTemp[index];

				console.log($scope.myDynamicStellarTemp[index]);
				$scope.StellarTemp = $scope.myDynamicStellarTemp[index];



			})
			.error(function (error) {
				console.log('Error running the input query!' + error);
			});


	};
	$scope.startMyAwesomeApp()


}