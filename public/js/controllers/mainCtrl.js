app.controller('mainCtrl', function ($scope, myService) {

  $scope.movies = [];

  myService.getDataFromAPI()
    .then(function (response) {
      // console.log(response.data);
      $scope.movies = response.data.results;
      // console.log($scope.movies);
    })
    .catch(function (error) {
      console.log(error)
    });

  $scope.addToFavorites = function () {
    // console.log(this.movie);
    let newFav = this.movie;
    myService.addToFavorites(newFav);
  }

})