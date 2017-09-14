app.controller('favCtrl', function ($scope, myService) {

  $scope.favorites = myService.getFavorites();

  $scope.removeFromFavorites = function () {
    console.log(this.fav);
    let deleted = myService.removeFromFavorites(this.$index);
    if (deleted) {
      $scope.favorites = myService.getFavorites();
    }
  }


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

  // Sort Favs By Rating
  $scope.sortFavs = function (prop) {
    $scope.favorites.sort(dynamicSort(prop, flag));
    flag = !flag;
  }
})