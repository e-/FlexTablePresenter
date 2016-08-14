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

function createNewSequence(){
  return [0].concat(shuffle([1, 2, 3]).concat(shuffle([4, 5, 6])));
}


function getTimeLimit(number) {
  if(number <= 3) return 5; // in seconds
  return 5; // in seconds
}


function getVideoUrl(inter, $sce) {
  var videos = {
    'FlexTable': [
      'https://www.youtube.com/embed/dLgRdBS2K_g?vq=hd1080',
      'https://www.youtube.com/embed/NnmzKgvmwhE?vq=hd1080'
    ],
    'Excel': [
      'https://www.youtube.com/embed/qGMvR3dlR4c?vq=hd1080',
      'https://www.youtube.com/embed/IqSNitHMxeY?vq=hd1080'
    ],
    'Tableau': [
      'https://www.youtube.com/embed/DmNC6BZOWaw?vq=hd1080',
      'https://www.youtube.com/embed/BajF4_4v86U?vq=hd1080'
    ]
  };

  var pivot = 'https://www.youtube.com/embed/p4AeoSR9694?vq=hd1080';

  return [
    $sce.trustAsResourceUrl(pivot), 
    $sce.trustAsResourceUrl(videos[inter][0]), 
    $sce.trustAsResourceUrl(videos[inter][1])
  ];
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
    '영화': {

    }
  };

  return problems[dataset][number];
}

