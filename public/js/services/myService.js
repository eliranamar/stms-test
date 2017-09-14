app.service('myService', function ($http) {

  this.favorites = [];

  let api_key = "122c25b6054ceff575f29262ab37860c";

  //fetching the data from API
  this.getDataFromAPI = function () {
    return $http.get('https://api.themoviedb.org/3/discover/movie?api_key=' + api_key)
      .then(function (response) {
        return response;
      });
  }

  //adding a movie to favorites
  this.addToFavorites = function (movie) {
    // if movie already in favorites return
    for (var i = 0; i < this.favorites.length; i++) {
      if (movie.id === this.favorites[i].id) {
        return false;
      }      
    }
    this.favorites.push(movie);
  }

  // for getting the favorites
  this.getFavorites = function () {
    return this.favorites;
  }

  this.removeFromFavorites = function (movie) {
    console.log(this.favorites);
    console.log(movie);
    return true;
  }

  this.removeFromFavorites = function (index) {
    // this.favorites.push(movie);
    this.favorites.splice(index,1);
    return true;
  }

})