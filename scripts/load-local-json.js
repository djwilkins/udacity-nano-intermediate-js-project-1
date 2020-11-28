
/**
 * @name loadLocalJson
 * @description Loads a local json file and passes data to callback function.
 * @param {string} jsonFile - Path to jsonFile to load.
 * @param {string} callback - function to run once successfully loaded.
 */
export const loadLocalJson = function (jsonFile, callback) {
  $.ajax({
    'async': true,
    'global': false,
    'url': jsonFile,
    'dataType': 'json',
    'success': function (data) {
        callback(data);
    }
  });
}