
export let uiUtilities = (function() {

    /**
     * @name hideFormShowResults
     * @description Hides input form and makes result divs visible.
     */
    function hideFormShowResults() {
        document.getElementById('dino-compare').style.display = 'none';
        document.getElementById('grid').style.visibility = 'visible';
        document.getElementById('highlights').style.visibility = 'visible';
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
            where: '',
            when: '',
            fact: formData.get('name')
        };
    }

    const moduleInterface = {
        hideFormShowResults: hideFormShowResults,
        formInputAsObject: formInputAsObject
    }

    return moduleInterface;

})();