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
            height: `${parseInt(formData.get('feet'))}'${parseInt(formData.get('inches'))}`,
            diet: formData.get('diet'),
            where: "",
            when: "",
            fact: formData.get('name')
        };
    }

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

    function createResults() {
        emptyGrid(); // Empty grid of any prior results
        hideFormShowGrid();
        let tileData = dinoModule.generateTileData(formInputAsObject());
        renderTileElements(tileData);
    }

    document.getElementById('btn').addEventListener("click", function() {
        createResults();
    })

})();