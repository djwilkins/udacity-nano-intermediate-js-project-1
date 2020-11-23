import { loadLocalJson } from './load-local-json.js';

export let dinoModule = (function () {

    // DEFINE DEPENCIES OF IIFE CALLING DINO JSON LOAD (loadLocalJsoN)

    let dinoObjects = [];

    class Dino {
        constructor(newDino) {
            Object.assign(this, newDino);
        }
    }

    // (2) Add each dino object to dinoObjects array as Dino class object
    let ingestDinoData = function(dinoData) {
        dinoData.forEach(function(dino) {
            var dinoClassObject = new Dino(dino);
            dinoObjects.push(dinoClassObject);
        })
    };

    // (1) Immediately load dino json data and pass to ingestDinoData function
    (function() {
        let dinoDataHandler = function(data) {
            let dinoData = data.Dinos;
            ingestDinoData(dinoData);
        }
        loadLocalJson("./dino.json", dinoDataHandler);
    })();

    // DEFINE PRIVATE FUNCTIONS THAT THE INTERFACE METHOD (generateTileData) WILL CALL (shuffleDinos, humanDino.update and .get, addHumanToDinos)

    function shuffleDinos() {
        return _.shuffle(dinoObjects);
    }

    // Singleton human object with update and get methods
    const humanDino = (function() {
        let humanDefaults = { species: "human", weight: 0, height: 0, diet: "", where: "", when: "", fact: "" };
        let theHumanDino = new Dino(humanDefaults);

        function update(human) {
            Object.assign(theHumanDino, human);
        }

        return {
            update: update,
            get: () => theHumanDino
        };
    })();

    function addHumanToDinos(arrayOfDinos, human) {
        arrayOfDinos.splice(4, 0, human);
        return arrayOfDinos;
    }

    function generateTileData(humanFromUI) {
        humanDino.update(humanFromUI);
        return addHumanToDinos(shuffleDinos(), humanDino.get());
    }

    const moduleInterface = {
        generateTileData: function(humanFromUI) {
            return generateTileData(humanFromUI);
        }
    };

    return moduleInterface;

})();