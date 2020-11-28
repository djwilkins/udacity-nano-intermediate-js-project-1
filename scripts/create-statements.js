
export const createStatements = (function(){

    /**
     * @name sentencify
     * @description Join the array into comma separated string with "and" for last comma.
     * @param {array} array - The array to join into a single sentence friendly formed string.
     */
    function sentencify(array) {
        return array.join(', ').replace(/, ([^,]*)$/, ' and $1');
        // Credit for regex solution here:
        // https://stackoverflow.com/questions/15069587/is-there-a-way-to-join-the-elements-in-an-js-array-but-let-the-last-separator-b
    }

    /**
     * @name weightComparison
     * @description Create a weight comparison statement for human vs dinos.
     * @param {array} tileData - Array of all dino objects for comparison with human object.
     * @param {object} thisHuman - The human object for comparison with other dinos.
     */
    function weightComparison(tileData, thisHuman) {

        const weighsLess = tileData.filter(function(dino) {
            return dino.weighsLess(thisHuman);
        }).sort(function(a,b) {
            return b.weight - a.weight;
        }).map(function (dino) {
            const string = `${dino.species} (${dino.weight} lbs)`;
            return string;
        });

        return weighsLess.length > 0 ?
            `You weight more at ${thisHuman.weight} lbs than the ${sentencify(weighsLess)}. Interesting... Are you on a jurassic diet?` :
            'You weight less than every dinosaur shown above. Way to not be pre-historic.';
    }

    /**
     * @name heightComparison
     * @description Create a height comparison statement for human vs dinos.
     * @param {array} tileData - Array of all dino objects for comparison with human object.
     * @param {object} thisHuman - The human object for comparison with other dinos.
     */
    function heightComparison(tileData, thisHuman) {

        const lessTall = tileData.filter(function(dino) {
            return dino.lessTall(thisHuman);
        }).sort(function(a,b) {
            return b.height - a.height;
        }).map(function (dino) {
            const string = `${dino.species} (${dino.height} inches)`;
            return string;
        });

        return lessTall.length > 0 ?
            `You're tall enough at ${thisHuman.height} inches to pet the ${sentencify(lessTall)} BUT I wouldn't recommend it!` :
            `You're short enough to be pet by all the dinosaurs shown above. Things may go poorly though.`;

    }

    /**
     * @name dietComparison
     * @description Create a diet comparison statement for human vs dinos.
     * @param {array} tileData - Array of all dino objects for comparison with human object.
     * @param {object} thisHuman - The human object for comparison with other dinos.
     */
    function dietComparison(tileData, thisHuman) {

        let sameDiet, restaurantDate;

        sameDiet = sentencify(tileData.filter(function(dino) {
            return (dino.species != 'human') && (dino.sameDiet(thisHuman));
        }).map(function (dino) {
            return dino.species;
        }));

        restaurantDate = thisHuman.diet == 'herbavor' ?
            ` like the ${sameDiet}, perhaps you should all meetup at a salad bar?` :
            thisHuman.diet == 'carnivor' ?
                ` like the ${sameDiet}, perhaps you should all meetup at a steak house?` :
                `, you should meet your favorite dinos at a restaurant that serves meat and veggies.`;

        return `Since you're a ${thisHuman.diet}${restaurantDate}`;

    }

    const moduleInterface = {
        weightComparison,
        heightComparison,
        dietComparison
    };

    return moduleInterface;

})();