
export const uiUtilities = (function() {

    /**
     * @name hideFormShowResults
     * @description Hides input form and makes result divs visible.
     */
    function hideFormShowResults() {
        document.getElementById('dino-compare').style.display = 'none';
    }

    /**
     * @name formInputAsObject
     * @description Takes form input and returns an object to pass to dinoModule.generateTileData().
     */
    function formInputAsObject() {
        const formData = new FormData(document.querySelector('form'));
        return {
            species: 'human',
            weight: parseInt(formData.get('weight')),
            height: `${(parseInt(formData.get('feet')) * 12) + parseInt(formData.get('inches'))}`,
            diet: formData.get('diet').toLowerCase(),
            name: formData.get('name')
        };
    }

    const moduleInterface = {
        hideFormShowResults,
        formInputAsObject
    }

    return moduleInterface;

})();