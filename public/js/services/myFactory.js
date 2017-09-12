app.factory('myFactory', function ($http) {

  // var data = [];

  let api_key = "122c25b6054ceff575f29262ab37860c";

  //fetching the data from API
  var getDataFromAPI = function () {
    return $http.get('https://api.themoviedb.org/3/discover/movie?api_key='+api_key)
      .then(function (response) {
        return response;
      });
  }



  //return all the properties
  return {
    getDataFromAPI: getDataFromAPI
  }
})