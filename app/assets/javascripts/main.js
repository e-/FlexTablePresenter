$(function(){
  var app = angular.module('FlexTablePresenter', ['ngSanitize']);

  app.controller('MainController', function MainController($scope){

    function autoLogin(){
      if(localStorage.flexTableId) {
        return {
          id: parseInt(localStorage.flexTableId)
        }
      }
      return {};
    }

		function shuffle(a) {
  	  var j, x, i;
    	for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
	    }
      return a;
		}
    
    function createNewSequence(other){
      if(other === 'Tableau') {
        // Tableau: 1 2 3 4 6 7 8 9
		    return shuffle([1, 2, 3, 4]).concat(shuffle([6, 7, 8, 9]));
      }
      else {
        // Excel: 1 2 3 5 6 7 8 10
        return shuffle([1, 2, 3, 5]).concat(shuffle([6, 7, 8, 10]));
      }
    }

    function login(){
      if($scope.tempId){
        localStorage.flexTableId = $scope.tempId;
        $scope.info = autoLogin();

        var flexTable = 'FlexTable',
            other;

        // 100 이상이면 Excel
        if($scope.info.id < 100) other = 'Tableau';
        else other = 'Excel';

        // 홀수면 FlexTable 부터 아니면 상대 인터페이스 부터
        if($scope.info.id % 2) {
          $scope.info.interfaces = [flexTable, other];
        }
        else {
          $scope.info.interfaces = [other, flexTable];
        }
        
        // create new random sequences

        $scope.info.sequences = [
          createNewSequence(other),
          createNewSequence(other)
        ];
        
        $scope.info.answers = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0]
        ];

        $scope.info.times = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0]
        ];

        // save it
        $scope.status = 'summary';
      }  
    }

    function logout(){
      $scope.info.id = null;
      delete localStorage.flexTableId;
      $scope.status = 'welcome';
    }

    $scope.info = autoLogin();

    if($scope.info.id) {
      $scope.status = 'summary';
    }
    else 
    {
      $scope.status = 'welcome';
    }
    //$scope.problem = '<b>asdf</b>';

    function problem(){
      $scope.status = 'solve';
      $scope.problemStatement = '<strong>어머니 학력</strong>에 따른 <strong>기말 점수</strong>의 <i>평균</i>은 최대 몇 점입니까?';
      $scope.possibleAnswers = ['10점', '20점', '30점', '40점', '50점'];
      $scope.beforeTimer = true;
    }

    function startTimer() {
      $scope.beforeTimer = false;
      $scope.startTime = +new Date();
    }

    function check() {
      if($scope.beforeTimer) return;

      var endTime = +new Date();

      // confirm 넣기

      $scope.info.times[0][0] = (endTime - $scope.startTime) / 1000;
      $scope.info.answers[0][0] = 1;
      $scope.status = 'summary';
    }

    $scope.login = login;
    $scope.logout = logout;
    $scope.problem = problem;
    $scope.startTimer = startTimer;
    $scope.check = check;
  });
});
