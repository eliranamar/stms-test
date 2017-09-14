app.controller('mainCtrl', function ($scope, myService) {

  $scope.movies = [];

  // controller call for api 
  myService.getDataFromAPI()
    .then(function (response) {
      // console.log(response.data);
      $scope.movies = response.data.results;
      // console.log($scope.movies);
    })
    .catch(function (error) {
      console.log(error)
    });

  // add this movie to favorites array in app.service
  $scope.addToFavorites = function () {
    // console.log(this.movie);
    let newFav = this.movie;
    myService.addToFavorites(newFav);
  }

})