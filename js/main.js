function checkAnswer(answerArray, playerArray) {
  let answer = true;
  // ここはeveryで書き換えるべき
  answerArray.forEach((row, rowNumber) => {
    row.forEach((element, colNumber) => {
      answer = element === playerArray[rowNumber][colNumber] && answer;
    });
  });
  return answer;
}

function hideAnswer(length, miliSec) {
  let blankArray = JSON.parse(JSON.stringify((new Array(length)).fill((new Array(length)).fill(''))));
  setTimeout(generateGrid(blankArray), miliSec);
}

function generateAnswerArray(length, number) {
  let answerArray = JSON.parse(JSON.stringify((new Array(length)).fill((new Array(length)).fill(''))));

  return answerArray;
}

function generateGrid(answerArray) {
  $('#gameBoard').append(('<tr>' + '<td>●</td>'.repeat(3) + '</tr>').repeat(3));
}

$(() => {
  //情報の受け取り
  let length = localStorage.getItem('length') ? localStorage.getItem('length') : 3; //マス目の長さ
  let number = 5; //●の数
  let miliSec = 1000; // 解答が消えるまでの時間
  let diagram = '●'
  let answerArray = generateAnswerArray(length, number);
  let playerArray = JSON.parse(JSON.stringify((new Array(length)).fill((new Array(length)).fill(''))));

  //初期化&描画
  // $('#gameBoard').append(('<tr>' + '<td>●</td>'.repeat(3) + '</tr>').repeat(3));
  generateGrid(answerArray);

  // 解答のフェードアウト
  hideAnswer(length, miliSec);

  // 解答待ち
    // クリックイベント検知&解答部分に●の表示
  $('td').on('click', function() {
    if ($(this).text()) {
      $(this).text('');
    } else {
      $(this).text(diagram);
    }
  });

  $('#answerButton').on('click', function() {
    $('#answerButton').css('display', 'none');

    if (checkAnswer(answerArray, playerArray)) {
      $('#result').text('正解！');
      $('#nextButton').css('display', 'block');
    } else {
      $('#result').text('不正解');
      $('#retryButton').css('display', 'block');
    }
  });

  $('#nextButton').on('click', function() {
    localStorage.setItem('length', length + 1);
    location.reload();
  });

  $('#retryButton').on('click', function() {
    localStorage.removeItem('length');
    location.reload();
  });
});