angular.module('KRRclass', ['chart.js']).controller('MainCtrl', ['$scope', '$http', mainCtrl]);

function mainCtrl($scope, $http) {
	// // CANVAS
	// const canvas = document.querySelector('canvas');
	// console.log(canvas)



	var index = 0;

	var clickerNext = document.getElementById("click_next");
	clickerNext.onclick = function () {
		$scope.startMyAwesomeApp()
		if (index < max - 1) {
			index++
			console.log(index);
		}


	}

	var clickerPrevious = document.getElementById("click_previous");
	clickerPrevious.onclick = function () {
		$scope.startMyAwesomeApp()
		if (index > 0) {
			index--
			console.log(index);
		}
	}
	var req1_text = '?PlanetName a oon:PotentiallyInhabitablePlanet.'
	var blank1 = ''
	var blank2 = 'K'
	var inhabitable_cb = document.getElementById('check_inhabitable');
	inhabitable_cb.onclick = function () {
		if (document.querySelector('#check_inhabitable:checked') !== null) {
			console.log('inhabitable filter on')
			blank1 = req1_text
			console.log(blank1)
			$scope.startMyAwesomeApp()

		} else {
			console.log('inhabitable filter off')
			blank1 = ''
			console.log(blank1)
			$scope.startMyAwesomeApp()
		}
	}






	// var country2 = document.getElementById("country_select_2");
	// country2.onchange = function () {
	// 	console.log(country2.value);
	// 	$scope.startMyAwesomeApp()
	// }

	$scope.startMyAwesomeApp = function () {

		// graph 1
		$scope.myDisplayDescription = ""
		$scope.mySparqlEndpoint = "http://192.168.18.4:7200/repositories/repo18";
		$scope.mySparqlQuery = encodeURI(`PREFIX on:<http://www.example.org/KD/FP/ontology/>
		PREFIX oon:<http://www.example.org/KD/FP/ontology#>
		PREFIX owl: <http://www.w3.org/2002/07/owl#>
		PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
		PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
		SELECT ?PlanetName (SAMPLE (?Density) AS ?Density)  (SAMPLE (?Mass) AS ?Mass) (SAMPLE (?Size) AS ?Size) 
		(SAMPLE (?NumberOfStars) AS ?NumberOfStars) (SAMPLE (?Host) AS ?Host) (SAMPLE (?Temp) AS ?Temp) (SAMPLE (?StellarTemp) AS ?StellarTemp)
													WHERE  { ?PlanetName a  on:Planet .
														${blank1}
														OPTIONAL { ?PlanetName  on:HasDensity  ?Density }
														OPTIONAL { ?PlanetName  on:HasMass  ?Mass }
														OPTIONAL { ?PlanetName  on:HasRadius  ?Size }
														OPTIONAL { ?PlanetName  on:HasNumberOfHosts  ?NumberOfStars }
														OPTIONAL { ?PlanetName  on:HasTemperature  ?Temp }
														OPTIONAL { ?PlanetName  on:HasHostTemperature  ?StellarTemp }
		}
		
		GROUP BY ?PlanetName
		LIMIT 50
		`).replace(/#/g, '%23');

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

					//replace missing data with n/a to avioud undefined error
					if (val.Density === undefined) {

						$scope.myDynamicDensity.push('n/a')
					} else {
						$scope.myDynamicDensity.push(val.Density.value);
					}

					if (val.Mass === undefined) {

						$scope.myDynamicMass.push('n/a')
					} else {
						$scope.myDynamicMass.push(val.Mass.value);
					}

					if (val.Size === undefined) {

						$scope.myDynamicSize.push('n/a')
					} else {
						$scope.myDynamicSize.push(val.Size.value);
					}

					if (val.NumberOfStars === undefined) {

						$scope.myDynamicNumberOfStars.push('n/a')
					} else {
						$scope.myDynamicNumberOfStars.push(val.NumberOfStars.value);
					}

					if (val.Host === undefined) {

						$scope.myDynamicHost.push('n/a')
					} else {
						$scope.myDynamicHost.push(val.Host.value);
					}

					if (val.Temp === undefined) {

						$scope.myDynamicTemp.push('n/a')
					} else {
						$scope.myDynamicTemp.push(val.Temp.value);
						document.getElementById("CarouselImg").src = "img/SeekPng.com_crying-emoji-png_189202.png";
						document.getElementById("CarouselImg2").src = "img/SeekPng.com_crying-emoji-png_189202.png";
						if ($scope.myDynamicTemp[index] < 273) {
							document.getElementById("CarouselImg").src = "img/cold_planet_img.png";
							document.getElementById("CarouselImg2").src = "img/cold_planet_img.png";
						} else if ($scope.myDynamicTemp[index] > 373) {
							document.getElementById("CarouselImg").src = "img/hot_planet_img.png";
							document.getElementById("CarouselImg2").src = "img/hot_planet_img.png";
						} else {
							document.getElementById("CarouselImg").src = "img/SeekPng.com_crying-emoji-png_189202.png";
							document.getElementById("CarouselImg2").src = "img/SeekPng.com_crying-emoji-png_189202.png";
						}
					}
					// console.log($scope.myDynamicTemp[index])

					if (val.StellarTemp === undefined) {

						$scope.myDynamicStellarTemp.push('n/a')
					} else {
						$scope.myDynamicStellarTemp.push(val.StellarTemp.value);
					}



				});
				$scope.myDynamicData = [$scope.myDynamicPlanetName, $scope.myDynamicDensity, $scope.myDynamicMass, $scope.myDynamicSize, $scope.myDynamicNumberOfStars, $scope.myDynamicHost, $scope.myDynamicTemp, $scope.myDynamicStellarTemp]
				console.log("myDynamicData")
				console.log($scope.myDynamicData)

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

				max = $scope.myDynamicPlanetName.length
			})
			.error(function (error) {
				console.log('Error running the input query!' + error);
			});

		//QUERY 2
		$scope.mySparqlEndpoint = "http://dbpedia.org/sparql";
		$scope.mySparqlQuery = encodeURI(`prefix dbpedia: <http://dbpedia.org/resource/>
											prefix dbpedia-owl: <http://dbpedia.org/ontology/>
											
											select ?abstract where { 
											dbpedia:${blank2}-type_main-sequence_star dbpedia-owl:abstract ?abstract .
											filter(langMatches(lang(?abstract),"en"))
											}`).replace(/#/g, '%23');

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
				$scope.myDynamicabstract = [];

				// now iterate on the results
				angular.forEach(data.results.bindings, function (val) {
					$scope.myDynamicabstract.push(val.abstract.value);
				});
				$scope.myDynamicData = [$scope.myDynamicabstract]
				$scope.PlanetAbstract = $scope.myDynamicabstract[0]
				console.log($scope.PlanetAbstract)

			})
			.error(function (error) {
				console.log('Error running the input query!' + error);
			});



	};
	$scope.startMyAwesomeApp()


}