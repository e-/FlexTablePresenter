$(function(){
  var app = angular.module('FlexTablePresenter');

  app.controller('ResultsController', function ResultsController($scope){
    $scope.results = results;
    $scope.getProblem = getProblem;
    
    var stat = {};
    $scope.stat = stat;

    stat.trial = {
      FlexTable: [0, 0],
      Excel: [0, 0],
      Tableau: [0, 0]
    };

    stat.correct = {
      FlexTable: [0, 0],
      Excel: [0, 0],
      Tableau: [0, 0]
    };

    stat.timeSum = {
      FlexTable: [0, 0],
      Excel: [0, 0],
      Tableau: [0, 0]
    };

    results.forEach(function(result) {
      if(result[1] == null) return;
      result = result[1];
      for(var i=1;i<=6;++i) {
        var pnum = result.sequences[1][i];
        var ans = result.answers[1][i];
        var correct = getProblem(1, pnum).correctAnswer;

        var difficulty = i <= 3 ? 0 : 1;
        var inter = result.interface;

        stat.trial[inter][difficulty]++;

        if(ans == correct) {
          stat.correct[inter][difficulty]++;
          stat.timeSum[inter][difficulty] += result.times[1][i];
        }

      }
    })
  });
});
 
