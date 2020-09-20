(function(angular) {
  'use strict';
angular.module('ngRepeat', ['ngAnimate']).controller('repeatController', function($scope,$http) {
  var friends = [
    {name:'John', age:25},
    {name:'Mary', age:40},
    {name:'Peter', age:85}
  ];
  
  $scope.county = "Los Angeles";

  $scope.removeFirst = function() {
    $scope.friends.shift();
  };
  
  $scope.getTrees = function() {
    alert("THIS IS A TEST FUNCTION"); 
    $http.post('http://api.treesfor.us/post', {county: $scope.county}, {headers: {'Content-Type': 'application/json'}})
         .then((response)=>{
                                           console.log(response);
                                                                       },
              (response)=> {
                alert("We failed! "+response);}
               

     );
  }

  $scope.updateAge = function() {
    $scope.friends.forEach(function(el) {
      el.age = el.age + 5;
    });
  };

  $scope.copy = function() {
    $scope.friends = angular.copy($scope.friends);
  };

  $scope.reset = function() {
    $scope.friends = angular.copy(friends);
  };

  $scope.reset();
});
})(window.angular);

/*
Copyright 2020 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
