import { createStatements } from './create-statements.js';

export const createElements = (function() {

    /**
     * @name createTileElements
     * @description Returns array of tile element divs containing all elements for dino tile/cards.
     * @param {array} tileData - Array of all dino objects for comparison with human object.
     */
    function createTileElements(tileData) {
        const tileElements = [];

        tileData.forEach(function(dino) {
            let tileElement, image, heading, paragraph, name, fact;
            // Create tile elements
            tileElement = document.createElement('div');
            image = document.createElement('img');
            heading = document.createElement('h3');
            paragraph = document.createElement('p');

            // Define element values based on species
            switch(dino.species) {
                case 'human':
                    name = dino.name;
                    break;
                case 'pigeon':
                    name = dino.species;
                    fact = 'All birds are Dinosaurs';
                    break;
                default:
                    name = dino.species;
                    fact = dino.fact;
            }

            // Define tile element, adding child elements
            tileElement.classList.add('grid-item');
            heading.innerHTML = name;
            image.setAttribute('src', `images/${dino.species.toLowerCase()}.png`);
            paragraph.innerHTML = fact;

            tileElement.appendChild(heading);
            tileElement.appendChild(image);
            if (dino.species != 'human') { tileElement.appendChild(paragraph); }

            // Add completed tile element to tile elements array
            tileElements.push(tileElement);

        });

        return tileElements;
    }

    /**
     * @name createComparisonElements
     * @description Returns array of three comparison statements.
     * @param {array} tileData - Array of all dino objects for comparison with human object.
     */
    function createComparisonElements(tileData) {

        const comparisonElements = [], comparisonStatements = [];

        const thisHuman = tileData.filter(function(dino) {
            return dino.species === 'human';
        })[0];


        // Call three createStatement methods that return comparison statements
        const weightComparison = createStatements.weightComparison(tileData, thisHuman);
        comparisonStatements.push(weightComparison);

        const heightComparison = createStatements.heightComparison(tileData, thisHuman);
        comparisonStatements.push(heightComparison);

        const dietComparison = createStatements.dietComparison(tileData, thisHuman);
        comparisonStatements.push(dietComparison);


        // Return unorder list element featuring comparison statements
        const comparisonHeading = document.createElement('h2');
        comparisonHeading.innerHTML = 'Comparison Highlights';
        comparisonElements.push(comparisonHeading);

        const comparisonList = document.createElement('ul');

        comparisonStatements.forEach(function(statement) {
            const comparisonStatement = document.createElement('li');
            comparisonStatement.innerHTML = statement;
            comparisonList.appendChild(comparisonStatement);
        });

        comparisonElements.push(comparisonList);

        return comparisonElements;
    }

    const moduleInterface = {
        createTileElements,
        createComparisonElements
    }

    return moduleInterface;

})();