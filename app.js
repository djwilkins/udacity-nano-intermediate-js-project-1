import { dinoModule } from './scripts/dino-data.js';

(function() {

    function emptyGrid() {
        let gridItems = document.querySelectorAll('div.grid-item');
        gridItems.forEach(function(element) {
            element.remove();
        });
    }

    function hideFormShowGrid() {
        document.getElementById('dino-compare').style.display = "none";
        document.getElementById('grid').style.visibility = "visible";
    }

    function formInputAsObject() {
        const formData = new FormData(document.querySelector('form'));
        return {
            species: "human",
            weight: parseInt(formData.get('weight')),
            height: `${(parseInt(formData.get('feet')) * 12) + parseInt(formData.get('inches'))}`,
            diet: formData.get('diet').toLowerCase(),
            where: "",
            when: "",
            fact: formData.get('name')
        };
    }

    // DJ: Refactor renderTileElements into createTileElements and renderTileElements?
    function renderTileElements(tileData) {
        tileData.forEach(function(dino) {
            let gridItem, image, heading, paragraph, name, fact;
            // Create elements
            gridItem = document.createElement('div');
            image = document.createElement('img');
            heading = document.createElement('h3');
            paragraph = document.createElement('p');

            // Define elements
            switch(dino.species) {
                case "human":
                    name = dino.fact;
                    break;
                case "pigeon":
                    name = dino.species;
                    fact = "All birds are Dinosaurs";
                    break;
                default:
                    name = dino.species;
                    fact = dino.fact;
            }

            gridItem.classList.add('grid-item');
            heading.innerHTML = name;
            image.setAttribute('src', `images/${dino.species.toLowerCase()}.png`);
            paragraph.innerHTML = fact;

            gridItem.appendChild(heading);
            gridItem.appendChild(image);
            if (dino.species != "human") { gridItem.appendChild(paragraph); }

            // Append div parent element to DOM section element
            document.getElementById('grid').appendChild(gridItem);

        });

    }

    function renderComparisonHighlights(tileData) {

        let comparisonHighlights = [];

        let thisHuman = tileData.filter(function(dino) {
            return dino.species === "human";
        })[0];

        // Join the array into comma separated string with "and" for last comma
        function sentencify(array) {
            return array.join(', ').replace(/, ([^,]*)$/, ' and $1');
            // Credit for regex solution here:
            // https://stackoverflow.com/questions/15069587/is-there-a-way-to-join-the-elements-in-an-js-array-but-let-the-last-separator-b
        }

        // Weight comparison logic:

        let weightLess = tileData.filter(function(dino) {
            return dino.weight < thisHuman.weight;
        }).sort(function(a,b) {
            return b.weight - a.weight;
        }).map(function (dino) {
            let string = `${dino.species} (${dino.weight} lbs)`;
            return string;
        });

        let weightComparison;

        if (weightLess.length > 0) {
            weightComparison = `You weight more at ${thisHuman.weight} lbs than the ${sentencify(weightLess)}. Interesting... Are you on a jurassic diet?`;
        } else {
            weightComparison = "You weight less than every dinosaur shown above. Way to not be pre-historic."
        }

        comparisonHighlights.push(weightComparison);

        // Height comparison logic:

        let lessTall = tileData.filter(function(dino) {
            return dino.height < thisHuman.height;
        }).sort(function(a,b) {
            return b.height - a.height;
        }).map(function (dino) {
            let string = `${dino.species} (${dino.height} inches)`;
            return string;
        });

        let heightComparison;

        if (lessTall.length > 0) {
            heightComparison = `You're tall enough at ${thisHuman.height} inches to pet the ${sentencify(lessTall)}, but I wouldn't recommend it.`;
        } else {
            heightComparison = "You're short enough to be pet by all the dinosaurs shown above. Things may go poorly."
        }

        comparisonHighlights.push(heightComparison);

        // Diet comparison logic:

        let dietComparison, restaurantDate;

        let sameDiet = sentencify(tileData.filter(function(dino) {
            return ((dino.species != 'human') && (dino.diet == thisHuman.diet));
        }).map(function (dino) {
            return dino.species;
        }));

        if (thisHuman.diet == 'herbavor') {
            restaurantDate = ` like the ${sameDiet}, you should all meet at a salad bar!`;
        } else if (thisHuman.diet == 'carnivor') {
            restaurantDate = ` like the ${sameDiet}, you should all meet a steak house!`;
        } else {
            restaurantDate = `, you should meet your favorite dinos at a restaurant that serves meat and veggies.`;
        }

        dietComparison = `Since you're a ${thisHuman.diet}${restaurantDate}`;

        comparisonHighlights.push(dietComparison);

        // Render as paragraph / bullet list elements
        // Add to bottom of grid div or new div beneath it
        let highlightSection = document.getElementById('highlights');
        let highlightList = document.createElement('ul');
        let highlightHeading = document.createElement('h2');
        highlightHeading.innerHTML = "Comparison Highlights";
        highlightSection.appendChild(highlightHeading);


        comparisonHighlights.forEach(function(item) {
            let highlightItem = document.createElement('li');
            highlightItem.innerHTML = item;
            highlightList.appendChild(highlightItem);
        });

        // Append div parent element to DOM section element
        highlightSection.appendChild(highlightList);
    }

    function createResults() {
        emptyGrid(); // Empty grid of any prior results
        hideFormShowGrid();
        let tileData = dinoModule.generateTileData(formInputAsObject());
        renderTileElements(tileData);
        renderComparisonHighlights(tileData);
    }

    document.getElementById('btn').addEventListener("click", function() {
        createResults();
    })

})();