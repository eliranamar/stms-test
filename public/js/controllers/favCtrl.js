app.controller('favCtrl', function ($scope, myFactory) {
  
    $scope.data = [];
  
    // fetch all beers from DB
    // myFactory.getBeersFromDB()
    //   .then(function (beers) {
    //     $scope.beers = beers;
    //     console.log($scope.beers);
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   });
    

  
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
      $scope.beers.sort(dynamicSort('avarage', flag));
      flag = !flag;
    }
  
  })