var app = angular.module('gameOfLifeApp', []);
app.controller('gameOfLifeCtrl', function($scope, $interval) {
  
  //grid size
  var rowMax = 25;
  var colMax = 30;
  
  // create grid
  $scope.rows = [];
  for(var i=0; i<rowMax; i++){
    var col = [];
    for(var j=0; j<colMax; j++){
      var elem = {'active': 0};
      col.push(elem);
    }
    $scope.rows.push({'cols': col});
  }
   
  
  //generate seeds
  var randomSeeds = function(){
    for(var i=0; i<(rowMax*colMax/2); i++){
      var row = Math.floor(Math.random() * (rowMax -  1));
      var col = Math.floor(Math.random() * (colMax -  1));
      $scope.activate(row,col);
    }
  }
 
  // count live neighbors
   var checkNeighbours = function(row, col){
     var count = 0;
     for(var i = row-1; i<=row+1; i++){
       for(var j= col-1; j<=col+1; j++){
         if((i!=row || j!=col) &&($scope.rows[i]) && ($scope.rows[i].cols[j]) ){
           if($scope.rows[i].cols[j].active >= 1){
             count++;
           }
         }
       }
     }
     return count;
   }
  
  $scope.stopGame = function(){
    $interval.cancel(interval);
  }
  
  $scope.activate = function(row, col){
    $scope.rows[row].cols[col].active = 1;
  }
  
  var interval;
  $scope.startGame = function(random){
    $scope.generation = 0;
    if(random){
      randomSeeds();
    }      
     interval = $interval(function(){
       $scope.generation++;
       for(var i=0; i<rowMax; i++){
         for(var j=0; j<colMax; j++){
           var noOfNeighbours = checkNeighbours(i,j);
           $scope.rows[i].cols[j].neighbours = noOfNeighbours;
         }
       }
       for(var i=0; i<rowMax; i++){
         for(var j=0; j<colMax; j++){
           if($scope.rows[i].cols[j].active >= 1){
             if($scope.rows[i].cols[j].neighbours >=4 || $scope.rows[i].cols[j].neighbours <=1){
               $scope.rows[i].cols[j].active = 0;
             }else{
               $scope.rows[i].cols[j].active++;
             }
           }else{
             if($scope.rows[i].cols[j].neighbours == 3){
               $scope.rows[i].cols[j].active = 1;
             }
           }
         }
       }     
   }, 100);
  }
  
  $scope.startGame(true);

  $scope.clear = function(){
    for(var i=0; i<rowMax; i++){
      for(var j=0; j<colMax; j++){
        $scope.rows[i].cols[j].active=0;
      }    
    }
  }
  
 });
// board size
// optimize code please
