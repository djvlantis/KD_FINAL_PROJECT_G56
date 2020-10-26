


## Setting up
* Download all files and subdirectories from this repository (by downloading https://github.com/djvlantis/KD_FINAL_PROJECT_G56 as zip or cloning with git.):
  
* Start your GraphDB Workbench

## Steps
* Create a new repository in GraphDB, and name it `repo-G56`
* Import the `v3_1_with_inferals.ttl` dataset into this repository (Import --> RDF --> Upload RDF Files) and
  click import.
* Copy the IRI of your repository and place it in main.js file as such:
    $scope.mySparqlEndpoint = "your IRI";
* Open `index.html` in your browser

## Usage
* Use little arrows above the planet image to cycle through planets.
* See data available about this planet on the left of the planet image.
* To the right of the image of the planet is a checkbox to only show habitable planets.
  The habitability of the planet has been determined through class restrictions in the underlying ontology that you have uploaded into graphdb.


