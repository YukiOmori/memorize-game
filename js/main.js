function checkAnswer(answerArray, playerArray) {
  let answer = true;
  // ここはeveryで書き換えるべき
  answerArray.forEach(rowNumber, row, () => {
    row.forEach(colNumber, element, () => {
      answer = element === playerArray[rowNumber][colNumber] || answer;
    });
  });
  return answer;
}

function flip() {
  //中身あり ? 表示: 非表示
}

function hideAnswer() {

}

function generateAnswerArray(length, number) {
  let answerArray = [];

  return answerArray;
}

function generateGrid(answerArray) {

}

$(() => {
  //情報の受け取り
  let length = localStorage.getItem('length') ? localStorage.getItem('length') : 3; //マス目の長さ
  let number = 5; //●の数
  let answerArray = generateAnswerArray(length, number);
  let playerArray = [];

  //初期化&描画
  $('#gameBoard').append(('<tr>' + '<td>●</td>'.repeat(3) + '</tr>').repeat(3));
  generateGrid(answerArray);

  // 解答のフェードアウト
  hideAnswer();

  // 解答待ち
    // クリックイベント検知&解答部分に●の表示
  $('td').on('click', function() {
    flip();
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