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
  if(number <= 3) return 60; // in seconds
  return 90; // in seconds
}


function getVideoUrl(inter, $sce) {
  var videos = {
    'FlexTable': [
      'https://www.youtube.com/embed/s5trtkW6Kjg?vq=hd1080',
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

function getProblem(phase, number){
  var problems = [
		{
        0: {
          html: 'empty',
          possibleAnswers: [],
          correctAnswer: -1
        },
        1: {
          html: '학생들을 <b>성별</b>과 <b>윤리등급</b>에 따라 나눴을 때, 가장 많은 학생들이 속한 조합에는 몇 명의 학생이 있나요?',          
          possibleAnswers: [
            '14명',
            '19명',
            '24명',
            '28명',
            '35명'
          ],
          correctAnswer: 4
        },
        2: {
          html: '<b>출신지역</b>이 <u>경남</u>인 학생들의 <b>언어점수</b>의 <i>최댓값</i>은 얼마인가요?',
          possibleAnswers: [
            '98점',
            '109점',
            '116점',
            '123점',
            '129점'
          ],
          correctAnswer: 5
        },
        3: {
          html: '<b>지리등급</b>의 변화에 따른 <b>영어점수</b>의 <i>최솟값</i>의 변화를 보려고 한다. 이를 볼 수 있는 <i>꺾은선 형 차트</i>를 만드세요.',
          possibleAnswers: [],
          correctAnswer: 6
        },
        4: {
          html: '<b>출신지역</b>이 <u>서울</u>인 학생들을 제외했을 때, <b>윤리점수</b>의 <i>최솟값</i>이 가장 높은 <b>언어 등급</b>은 무엇인가요?',
          possibleAnswers: [
            '1등급',
            '2등급',
            '3등급',
            '4등급',
            '5등급'
          ],
          correctAnswer: 1
        },
        5: {
          html: '<b>출신지역</b>이 <u>서울</u>인 학생들과 <b>성별</b>이 <u>남학생</u>인 학생들을 제외했을 때, <b>언어 등급</b>이 <u>5등급</u>인 학생들의 <b>수리점수</b>의 <i>평균</i>은 얼마인가요? (소수 둘째자리까지 표현)',
          possibleAnswers: [
            '84.29점',
            '91.72점',
            '101.32점',
            '106.10점',
            '110.85점'
          ],
          correctAnswer: 2
        },
        6: {
          html: '<b>수리등급</b>과 <b>성별</b>에 따른 <b>지리점수</b>의 <i>평균</i>의 변화를 비교하려고 한다. 이를 볼 수 있는 <i>꺾은선 형 차트</i>를 만드세요.',
          Tableau: '(선을 <b>성별</b>에 따라서 색으로 구분하세요.)',
          Excel: '(선을 <b>성별</b>에 따라서 색으로 구분하세요.)',
          possibleAnswers: [],
          correctAnswer: 6
        }
      },
			{
        0: {
          html: '<b>제작비</b>의 <i>평균</i>이 가장 높은 <b>장르</b>는 무엇인가요? ',
          possibleAnswers: [
            '드라마',
            '스릴러',
            '어드벤처',
            '코미디',
            '호러'
          ],
          correctAnswer: 3
        },
        1: {
          html: '영화들을 <b>시대</b>와 <b>등급</b>에 따라 나눴을 때, 가장 많은 영화들이 속한 조합에는 몇 개의 영화가 있나요?',
          possibleAnswers: [
            '38개',
            '45개',
            '50개',
            '54개',
            '62개'
          ],
          correctAnswer: 4
        },
        2: {
          html: '<b>원작</b>이 <u>책</u>인 영화들의 <b>수익(전세계)</b>의 <i>최댓값</i>은 얼마인가요?',
          possibleAnswers: [
            '3,484억원',
            '5,210억원',
            '7,915억원',
            '8,319억원',
            '9,198억원'
          ],
          correctAnswer: 5
        },
        3: {
          html: '<b>시대</b>의 변화에 따른 <b>제작비</b>의 <i>평균</i>의 변화를 보려고 한다. 이를 볼 수 있는 <i>꺾은선 형 차트</i>를 만드세요.',
          possibleAnswers: [],
          correctAnswer: 6
        },
        4: {
          html: '<b>원작</b>이 <u>만화</u>인 영화들을 제외했을 때, <b>수익(미국)</b>의 <i>최솟값</i>이 가장 높은 <b>창작유형</b>은 무엇인가요?',
          possibleAnswers: [
            '공상과학',
            '아동소설',
            '역사소설',
            '판타지',
            '현대소설'
          ],
          correctAnswer: 2
        },
        5: {
          html: '<b>장르</b>가 <u>어드벤처</u>인 영화들과 <b>시대</b>가 <u>2000년대</u>인 영화들을 제외했을 때, <b>등급</b>이 <u>전체관람가</u>인 영화들의 <b>로튼토마토 평점</b>의 <i>평균</i>은 얼마인가요? (소수 둘째자리까지 표현)',
          possibleAnswers: [
            '62.16점',
            '65.94점',
            '69.91점',
            '71.25점',
            '75.82점'
          ],
          correctAnswer: 1
        },
        6: {
          html: '<b>등급</b>에 따른 <b>시대</b>별 <b>IMDB 평점</b>의 <i>평균</i>의 변화를 비교하려고 한다. 이를 볼 수 있는 <i>꺾은선 형 차트</i>를 만드세요.',
          Tableau: '(선을 <b>시대</b>에 따라서 색으로 구분하세요.)',
          Excel: '(선을 <b>시대</b>에 따라서 색으로 구분하세요.)',
          possibleAnswers: [],
          correctAnswer: 6
        }
      }
	];

  return problems[phase][number];
}

