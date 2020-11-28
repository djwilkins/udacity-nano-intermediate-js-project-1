import { loadLocalJson } from './load-local-json.js';

export const dinoModule = (function () {

    /**
     * @name Species
     * @description Define Species class extended by Dino and Human classes.
     * @param {object} newSpecies - The object containing json data to utilize.
     * @constructor
     */
    class Species {
        constructor(newSpecies) {
            this.species = newSpecies.species;
            this.weight = newSpecies.weight;
            this.height = newSpecies.height;
            this.diet = newSpecies.diet;
        }

        weighsLess(otherSpecies) {
            return this.weight < otherSpecies.weight;
        }

        lessTall(otherSpecies) {
            return this.height < otherSpecies.height;
        }

        sameDiet(otherSpecies) {
            return this.diet == otherSpecies.diet;
        }
    };

    /**
     * @name Dino
     * @description Define Dino class that extends Species class.
     * @param {object} newDino - The object containing json data to uitilze.
     * @constructor
     */
    class Dino extends Species {
        constructor(newDino) {
            super(newDino);
            this.fact = newDino.fact;
        }
    }

    /**
     * @name Human
     * @description Define Human class that extends Species class.
     * @param {object} newHuman - The object containing json data to uitilze.
     * @constructor
     */
    class Human extends Species {
        constructor(newHuman) {
            super(newHuman);
            this.name = newHuman.name;
        }
    }

    const dinoObjects = [];

    /**
     * @name ingestDinoData
     * @description Creates a Dino class object for each element in array.
     * @param {array} dinoData - An array of objects from the dino json.
     */
    const ingestDinoData = function(dinoData) {
        dinoData.forEach(function(dino) {
            var dinoClassObject = new Dino(dino);
            dinoObjects.push(dinoClassObject);
        })
    };


    /**
     * @name dinoDataHandler
     * @description Immediately loads dino json data and passes it to ingestDinoData().
     * @param {array} dinoData - An array of objects from the dino json.
     */
    (function() {
        const dinoDataHandler = function(data) {
            const dinoData = data.Dinos;
            ingestDinoData(dinoData);
        }
        loadLocalJson('./dino.json', dinoDataHandler);
    })();

    /*
     * Private methods called by interface method (generateTileData)
     */

    /**
     * @name shuffleDinos
     * @description Shuffle order of dinos for more dynamic output.
     */
    function shuffleDinos() {
        return _.shuffle(dinoObjects);
    }

    // Singleton human object with update and get methods
    const human = (function() {
        const humanDefaults = { species: 'human', weight: 0, height: 0, diet: '', where: '', when: '', name: '' };
        const theHuman = new Human(humanDefaults);

        function update(human) {
            Object.assign(theHuman, human);
        }

        return {
            update: update,
            get: () => theHuman
        };
    })();

    /**
     * @name addHumanToDinos
     * @description Add human dino object to center of array of dino objects.
     * @param {array} arrayOfDinos - The array of dino objects from the json.
     * @param {object} human - The human dino object to add to it.
     */
    function addHumanToDinos(arrayOfDinos, human) {
        arrayOfDinos.splice(4, 0, human);
        return arrayOfDinos;
    }

    /**
     * @name generateTileData
     * @description A function to utilize private functions above and return dino tile data.
     * @param {object} humanFromUI - The object containing form input to convert to dino object and include in tile data.
     */
    function generateTileData(humanFromUI) {
        human.update(humanFromUI);
        return addHumanToDinos(shuffleDinos(), human.get());
    }

    const moduleInterface = {
        generateTileData
    };

    return moduleInterface;

})();