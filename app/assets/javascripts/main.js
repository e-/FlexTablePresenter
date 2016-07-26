$(function(){
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
      return [0].concat(shuffle([1, 2, 3, 4]).concat(shuffle([6, 7, 8, 9])));
    }
    else {
      // Excel: 1 2 3 5 6 7 8 10
      return [0].concat(shuffle([1, 2, 3, 5]).concat(shuffle([6, 7, 8, 10])));
    }
  }
  
  function getProblem(dataset, number){
    var problems = {
      '수능': {
        0: {
          html: '<b>지리점수</b>의 <i>평균</i>의 가장 높은 <b>지역</b>은 어디인가요?',
          possibleAnswers: [
            'a',
            'b',
            'c',
            'd',
            'e'
          ],
          correctAnswer: 4
        }
      },
      '시험': {

      }
    };

    return problems[dataset][number];
  }
  
  function getTimeLimit(number) {
    if(number <= 5) return 5;
    return 5;
  }

  var app = angular.module('FlexTablePresenter', ['ngSanitize']);

  app.controller('MainController', function MainController($scope, $timeout, $http, $q){
    function saveInfo(){
      return $http.post('/results', 
                        {
                          result: {
                            pid: $scope.info.id,
                            json: JSON.stringify($scope.info)

                          }
                        })
      .error(function(){
        alert('저장 중에 에러가 발생했습니다');
        console.log(arguments);
      })
    }

    function getUserInfo(id){
      return $http.get('/results/' + id)
        .then(function(res){
          if(!res.data) return {};
          return JSON.parse(res.data.json);          
        }, function(){
          return {};
        })
    }

    function login(){
      if($scope.tempId){
        localStorage.flexTableId = $scope.tempId;
        
        getUserInfo($scope.tempId)
          .then(function(data){
            if(!data.id) {
              $scope.info = {
                id: parseInt($scope.tempId)
              };

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
              
              if($scope.info.id % 4 === 1 || $scope.info.id % 4 === 2) { // 수능 데이터셋 먼저 
                $scope.info.datasets = ['수능', '시험'];
              } else {
                $scope.info.datasets = ['시험', '수능'];
              }
              
              // create new random sequences

              $scope.info.sequences = [
                createNewSequence(other),
                createNewSequence(other)
              ];
              
              $scope.info.answers = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]
              ];

              $scope.info.times = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]
              ];

              // save it
              saveInfo();
            } 
            else {
              $scope.info = data;
            }
            $scope.status = 'summary';
          }, function(){
            alert('로그인 실패');
          })
      }  
    }

    function logout(){
      $scope.info.id = null;
      delete localStorage.flexTableId;
      $scope.status = 'welcome';
    }
    
    getUserInfo(localStorage.flexTableId)
      .then(function(info){
        if(info.id) {
          $scope.info = info;
          $scope.status = 'summary';
        } else {
          $scope.status = 'welcome';
        }
      });

    function showProblem(dataset, datasetIndex, num, problemIndex){
      $scope.status = 'solve';
      var problem = getProblem(dataset, num);
      console.log(dataset, num, 'started', problem);
      $scope.problemStatement = problem.html;
      $scope.possibleAnswers = problem.possibleAnswers;
      $scope.beforeTimer = true;
      $scope.datasetIndex = datasetIndex;
      $scope.problemIndex = problemIndex;
      $scope.problemNumber = num;

      var id = Math.random();
      $scope.problemSessionId = id;
    }

    function startTimer() {
      $scope.beforeTimer = false;
      $scope.startTime = +new Date();
      
      var limit = getTimeLimit($scope.problemNumber);
      var id = $scope.problemSessionId;

      $timeout(function(){ 
        if($scope.problemSessionId === id && $scope.status === 'solve') {
          var datasetIndex = $scope.datasetIndex;
          var problemIndex = $scope.problemIndex;

          $scope.info.times[datasetIndex][problemIndex] = limit;
          $scope.info.answers[datasetIndex][problemIndex] = 6;

          alert(limit + '초 시간 종료!');
          $scope.status = 'summary';
        }
      }, limit * 1000);
    }

    function check(num, answer) {
      if($scope.beforeTimer) return;

      var endTime = +new Date();

      if(!confirm('답이 ' + num + '. ' + answer + '가 맞습니까?')) {
        return;
      }

      var datasetIndex = $scope.datasetIndex;
      var problemIndex = $scope.problemIndex;

      $scope.info.times[datasetIndex][problemIndex] = (endTime - $scope.startTime) / 1000;
      $scope.info.answers[datasetIndex][problemIndex] = num;
     
      saveInfo()
      .success(function(){
        console.log(arguments);
      })

      $scope.status = 'summary';
    }

    $scope.login = login;
    $scope.logout = logout;
    $scope.showProblem = showProblem;
    $scope.startTimer = startTimer;
    $scope.check = check;
  });
});
