import { dinoModule } from './scripts/dino-data.js';
import { uiUtilities } from './scripts/ui-utilities.js';
import { createElements } from './scripts/create-elements.js';

(function() {

    /**
     * @name renderElements
     * @description Creates and adds result elements to the DOM.
     * @param {object} tileData - An array of Dino objects (includes human)
     * @param {function} createElementsFunction - a method of the createElements module
     * @param {string} parentElementId - the DOM element to add elements to
     */
    function renderElements(tileData, createElementsFunction, parentElementId) {
        let elementArray = createElementsFunction(tileData);
        let parentElement = document.getElementById(parentElementId);

        elementArray.forEach(function(element){
            // Append element to parent element
            parentElement.appendChild(element);
        });
    }

    /**
     * @name createResults
     * @description Runs all steps required to generate and render results for user.
     */
    function createResults() {
        let tileData = dinoModule.generateTileData(uiUtilities.formInputAsObject());
        renderElements(tileData, createElements.createTileElements, 'grid');
        renderElements(tileData, createElements.createComparisonElements, 'highlights');
        uiUtilities.hideFormShowResults();
    }

    /*
     * Input validation as condition on button click handling.
     * If user provides all input, proceed with generating results.
     * Otherwise, alert user all fields are required.
     */
    let [button, form, name, feet, inches, weight] = [
        document.getElementById('btn'), document.getElementById('dino-compare'),
        document.getElementById('name'), document.getElementById('feet'),
        document.getElementById('inches'), document.getElementById('weight')
    ];

    button.disabled = true;

    function validateInput() {
        button.disabled = true;
        if ((name.value != '') && (feet.value != '') && (inches.value != '') && (weight.value != '')) {
            button.disabled = false;
        }
    }

    form.addEventListener('change', function() {
        validateInput();
    })

    button.addEventListener('click', function() {
        button.disabled == false ? createResults() : window.alert('All input fields must be completed.');
    })

})();