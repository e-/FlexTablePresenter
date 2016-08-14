$(function(){
  var app = angular.module('FlexTablePresenter', ['ngSanitize']);

  app.controller('MainController', function MainController($scope, $timeout, $http, $q, $sce){
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
      });
    }

    function getUserInfo(id){
      return $http.get('/results/' + id)
        .then(function(res){
          if(!res.data) return {};
          return JSON.parse(res.data.json);          
        }, function(){
          return {};
        });
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

              var inter;
              
              switch($scope.info.id % 3){
                case 0:
                  inter = 'FlexTable';
                  break;
                case 1:
                  inter = 'Excel';
                  break;
                case 2:
                  inter = 'Tableau';
                  break;
              }
              
              $scope.info.interface = inter;
              $scope.info.datasets = ['수능', '영화'] ;
              
              // create new random sequences

              $scope.info.sequences = [
                [0, 1, 2, 3, 4, 5, 6],
                createNewSequence()
              ];
              
              $scope.info.answers = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
              ];

              $scope.info.times = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
              ];

              // save it
              saveInfo();
            } 
            else {
              $scope.info = data;
            }
            $scope.status = 'summary';
            $scope.videoUrls = getVideoUrl($scope.info.interface, $sce);
          }, function(){
            alert('로그인 실패');
          });
      }  
    }

    function logout(){
      $scope.info.id = null;
      delete localStorage.flexTableId;
      $scope.status = 'welcome';
    }
   
    // 자동로그인
    getUserInfo(localStorage.flexTableId)
      .then(function(info){
        if(info.id) {
          $scope.info = info;
          $scope.videoUrls = getVideoUrl($scope.info.interface, $sce);
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

      $scope.problemTimer = $timeout(function(){ 
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

    function checkAnswer(num, desc) {
      $scope.answerNum = num;
      $scope.answerDesc = desc;
      $scope.answerTime = +new Date();
      console.log('answer marked', num, desc);
    }

    function answered() {
      if($scope.beforeTimer) return;
      if(!$scope.answerNum) return;

      var num = $scope.answerNum;
      $scope.answerNum = null;
      var desc = $scope.answerDesc;
      var endTime = $scope.answerTime;

      var datasetIndex = $scope.datasetIndex;
      var problemIndex = $scope.problemIndex;

      $scope.info.times[datasetIndex][problemIndex] = (endTime - $scope.startTime) / 1000;
      $scope.info.answers[datasetIndex][problemIndex] = num;
     
      console.log('answered', (endTime - $scope.startTime) / 1000);
      saveInfo()
      .success(function(){
        console.log(arguments);
      });

      $scope.status = 'summary';
    }

    function home(){
      $scope.status = 'summary';
      if($scope.problemTimer) {
        $timeout.cancel($scope.problemTimer);
        $scope.problemTimer = null;
      }
    }

    $scope.login = login;
    $scope.logout = logout;
    $scope.showProblem = showProblem;
    $scope.startTimer = startTimer;
    $scope.checkAnswer = checkAnswer;
    $scope.answered = answered;
    $scope.home = home;
  });
});
