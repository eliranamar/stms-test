app.controller('mainCtrl', function ($scope, beerFactory) {
  
    $scope.beers = [];
  
    // fetch all beers from DB
    beerFactory.getBeersFromDB()
      .then(function (beers) {
        $scope.beers = beers;
        console.log($scope.beers);
      })
      .catch(function (error) {
        console.log(error)
      });
  
    // add beer to DB
    $scope.addBeer = function () {
      if (typeof (this.name) != 'string' || typeof (this.style) != 'string' ||
        typeof (this.abv) != 'string' || typeof (this.image) != 'string') {
        alert('not valid inputs');
        return;
      }
      var newBeer = {
        name: this.name,
        style: this.style,
        image_url: this.image,
        abv: this.abv,
        ratings: [],
        avarage: 0
      };
  
      beerFactory.addBeer(newBeer)
        .then(function (beerFromServer) {
          $scope.beers.push(beerFromServer);
        })
        .catch(function (error) {
          console.log(error)
        });
    }
  
    // remove beer from DB
    $scope.removeBeer = function () {
      console.log($scope.beers);
      console.log(this.beer);
      beerFactory.removeBeer(this.beer._id)
        .then(function (data) {
          for (var i = 0; i < $scope.beers.length; i++) {
            if (data._id === $scope.beers[i]._id) {
              $scope.beers.splice(i, 1);
              break;
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        });
    }
  
    // rate the beer and send it to server
    $scope.rateBeer = function (event) {
      var index = this.$index;
      var beer = {
        _id: this.beer._id,
        ratings: event.rating
      }
      this.beer.ratings = event.rating;
      // console.log(angular.element(document).find('star-rating-comp')[index]);
      // angular.element(document).find('star-rating-comp')[index]
      var myEl = angular.element(document.querySelectorAll('star-rating-comp')[index]);
      var parentEl = myEl.parent();
      // parentEl.attr('ng-disabled', 'true');
      parentEl.attr("style", "width:100px;height:49.55px;");
      parentEl.empty();
      // console.log(myEl.children().children()[1]);
      // myEl.children().children()[1].setAttribute('ng-hide', 'true');
      beerFactory.rateBeer(beer)
        .then(function (beerFromServer) {
          console.log(angular.element(event.target).parent().parent().parent()[0]);
          $scope.beers[index] = beerFromServer;
        })
        .catch(function (error) {
          console.log(error)
        });
    }
  
    // calc the avrg rating per beer
    $scope.avarageRating = function (beer) {
      if (!beer.ratings.length) {
        return 0;
      }
      var avarage = 0;
      for (var i = 0; i < beer.ratings.length; i++) {
        avarage += beer.ratings[i];
      }
      avarage /= beer.ratings.length;
      beer.avarage = avarage;
      return beer.avarage.toFixed(1);
    }
  
    var flag = false;
    // Sort Beers By Rating
    $scope.sortBeers = function () {
      $scope.beers.sort(dynamicSort('avarage', flag));
      flag = !flag;
    }
  
    var dynamicSort = function (prop, flag) {
      return function (a, b) {
        if (flag) {
          return (a[prop] < b[prop]) ? -1 : (a[prop] > b[prop]) ? 1 : 0;
        } else {
          return (a[prop] > b[prop]) ? -1 : (a[prop] < b[prop]) ? 1 : 0;
        }
      };
    }
  
    $scope.editBeer = function (index) {
      this.tempBeer = angular.copy($scope.beers[index]);
  
    }
  
    $scope.updateBeer = function (beerCopy, index) {
      var self = this;
      //calling the update beer on the service to send the new info to the server
      beerFactory.updateBeer(beerCopy)
        .then(function (modifiedBeer) {
          console.log(modifiedBeer);
          //when the server finished updating successfully, replace the original beer with the modified version
          $scope.beers[index] = modifiedBeer;
          // 'self' refers to the beer scope (we assigned it earlier because in here 'this' is something else)
          self.tempBeer = null;
        })
        .catch(function (err) {
          //if something has gone wrong then alert the user
          alert(err.data.message);
        });
    }
  
  
  })