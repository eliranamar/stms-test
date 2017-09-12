app.controller('mainCtrl', function ($scope, myFactory) {

  $scope.movies = [];

  // fetch all beers from DB
  // myFactory.getBeersFromDB()
  //   .then(function (beers) {
  //     $scope.beers = beers;
  //     console.log($scope.beers);
  //   })
  //   .catch(function (error) {
  //     console.log(error)
  //   });

  myFactory.getDataFromAPI()
    .then(function (response) {
      console.log(response.data);
      $scope.movies = response.data.results;
      console.log($scope.movies);
    })


  var flag = false;
  var dynamicSort = function (prop, flag) {
    return function (a, b) {
      if (flag) {
        return (a[prop] < b[prop]) ? -1 : (a[prop] > b[prop]) ? 1 : 0;
      } else {
        return (a[prop] > b[prop]) ? -1 : (a[prop] < b[prop]) ? 1 : 0;
      }
    };
  }

  // Sort Beers By Rating
  $scope.sortBeers = function () {
    $scope.beers.sort(dynamicSort('vote_average', flag));
    flag = !flag;
  }

})