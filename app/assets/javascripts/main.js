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
          html: '<b>지리점수</b>의 <i>평균</i>의 가장 높은 <b>출신지역</b>은 어디인가요?',
          possibleAnswers: [
            '경남',
            '광주',
            '인천',
            '전북',
            '충남'
          ],
          correctAnswer: 2
        },
        1: {
          html: '<b>수리점수</b>의 <i>합계</i>가 가장 높은 <b>언어등급</b>은 무엇인가요? 또, <b>윤리점수</b>의 <i>합계</i>가 가장 높은 <b>언어등급</b>은 무엇인가요?',
          possibleAnswers: [
            '1등급',
            '3등급',
            '5등급',
            '7등급',
            '9등급'
          ],
          correctAnswer: 3
        },
        2: {
          html: '학생들을 <b>성별</b>과 <b>윤리등급</b>에 따라 나눴을 때, 가장 많은 학생들이 속한 조합에는 몇 명의 학생이 있나요?',
          possibleAnswers: [
            '15명',
            '18명',
            '23명',
            '28명',
            '32명'
          ],
          correctAnswer: 4
        },
        3: {
          html: '<b>출신지역</b>이 <u>경남</u>인 학생들의 <b>언어점수</b>의 <i>최댓값</i>은 얼마인가요?',
          possibleAnswers: [
            '최대 129점',
            '최대 132점',
            '최대 135점',
            '최대 138점',
            '최대 141점'
          ],
          correctAnswer: 1
        },
        4: {
          html: '학생들의 <b>언어점수</b>와 <b>영어점수</b>의 관계를 보려고 한다. 이를 볼 수 있는 <i>분산형 그래프 (산점도)</i>를 그리세요.',
          possibleAnswers: [
            'a',
            'b',
            'c',
            'd',
            'e'
          ],
          correctAnswer: 4
        },
        5: {
          html: '<b>지리점수</b>의 <i>평균</i>의 가장 높은 <b>지역</b>은 어디인가요?',
          possibleAnswers: [
            'a',
            'b',
            'c',
            'd',
            'e'
          ],
          correctAnswer: 4
        },
        6: {
          html: '<b>출신지역</b>이 <u>서울</u>인 학생들을 제외했을 때, <b>윤리점수</b>의 <i>최솟값</i>이 가장 높은 <b>언어등급</b>은 무엇인가요?',
          possibleAnswers: [
            '1등급',
            '2등급',
            '5등급',
            '6등급',
            '9등급'
          ],
          correctAnswer: 1
        },
        7: {
          html: '학생들을 <b>성별</b>과 <b>출신지역</b>에 따라 나눴을 때, <b>영어점수</b>의 <i>평균</i>이 가장 낮은 조합의 점수는 얼마인가요?',
          possibleAnswers: [
            '평균 82.59점',
            '평균 83.86점',
            '평균 84.25점',
            '평균 86.51점',
            '평균 88.93점'
          ],
          correctAnswer: 5
        },
        8: {
          html: '<b>출신지역</b>이 <u>서울</u>인 학생들과 <b>성별</b>이 <u>남성</u>인 학생들을 제외했을 때, <b>언어등급</b>이 <u>5등급</u>인 학생들의 <b>수리점수</b>의 <i>평균</i>은 얼마인가요?',
          possibleAnswers: [
            '평균 90.84점',
            '평균 91.72점',
            '평균 92.81점',
            '평균 93.45점',
            '평균 94.53점'
          ],
          correctAnswer: 2
        },
        9: {
          html: '<b>지리점수</b>의 <i>평균</i>의 가장 높은 <b>지역</b>은 어디인가요?',
          possibleAnswers: [
            'a',
            'b',
            'c',
            'd',
            'e'
          ],
          correctAnswer: 4
        },
        10: {
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
          });
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
