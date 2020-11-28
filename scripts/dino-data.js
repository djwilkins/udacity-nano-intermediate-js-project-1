import { loadLocalJson } from './load-local-json.js';

export let dinoModule = (function () {

    /*
     * Define Dino class and dinoObjects array
     * Dependencies of dinoDataHandler IIFE
     */

    class Dino {
        constructor(newDino) {
            Object.assign(this, newDino);
        }
    }

    let dinoObjects = [];

    /**
     * @name ingestDinoData
     * @description Creates a Dino class object for each element in array.
     * @param {array} dinoData - An array of objects from the dino json.
     */
    let ingestDinoData = function(dinoData) {
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
        let dinoDataHandler = function(data) {
            let dinoData = data.Dinos;
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
    const humanDino = (function() {
        let humanDefaults = { species: 'human', weight: 0, height: 0, diet: '', where: '', when: '', fact: '' };
        let theHumanDino = new Dino(humanDefaults);

        function update(human) {
            Object.assign(theHumanDino, human);
        }

        return {
            update: update,
            get: () => theHumanDino
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
        humanDino.update(humanFromUI);
        return addHumanToDinos(shuffleDinos(), humanDino.get());
    }

    const moduleInterface = {
        generateTileData: generateTileData
    };

    return moduleInterface;

})();