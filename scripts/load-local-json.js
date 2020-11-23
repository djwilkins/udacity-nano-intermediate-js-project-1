
export let loadLocalJson = function (jsonFile, callback) {
  $.ajax({
    'async': true,
    'global': false,
    'url': jsonFile,
    'dataType': "json",
    'success': function (data) {
        callback(data);
    }
  });
}