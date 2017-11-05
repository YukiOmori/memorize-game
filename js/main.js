function sleepByPromise(miliSec) { 
  return new Promise((resolve) => setTimeout(resolve, miliSec));
}

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

async function hideAnswer(length, miliSec) {
  let blankArray = JSON.parse(JSON.stringify((new Array(length)).fill((new Array(length)).fill(''))));
  await sleepByPromise(miliSec);
  generateGrid(blankArray, 'gameBoard');
}

function generateAnswerArray(length, number, diagram) {
  let answerArray = JSON.parse(JSON.stringify((new Array(length)).fill((new Array(length)).fill(''))));
  // numberを使ってランダムに配置
  let occupied = 0;
  let col;
  let row;
  while(occupied <= number) {
    row = Math.floor(Math.random() * length);
    col = Math.floor(Math.random() * length);
    if (!answerArray[row][col]) {
      answerArray[row][col] = diagram;
      occupied++;
    }
  }
  console.log(answerArray);
  return answerArray;
}

function generateGrid(squareArray, boardName) {
  let tableCode = '<table id="' + boardName + '"><tr>';
  squareArray.forEach((row, rowNumber) => {
    row.forEach((element, colNumber) => {
      tableCode += '<td id="' + rowNumber + colNumber + '">' + element + '</td>';
    });
      if (rowNumber === squareArray.length - 1) {
        tableCode += '</tr>';
      } else {
        tableCode += '</tr><tr>';
      }
  });
  $('#gameArea').html(tableCode);
}

$(() => {
  //情報の受け取り
  let length = localStorage.getItem('length') ? JSON.parse(localStorage.getItem('length')) : 3; //マス目の長さ
  let number = localStorage.getItem('number') ? JSON.parse(localStorage.getItem('number')) : 5; //●の数
  let miliSec = 1000; // 解答が消えるまでの時間
  let diagram = '●'
  let answerArray = generateAnswerArray(length, number, diagram);
  let playerArray = JSON.parse(JSON.stringify((new Array(length)).fill((new Array(length)).fill(''))));

  $('td').on('click', function() {
    let clickedId = $(this).attr('id');
    if ($(this).text()) {
      $(this).text('');
      playerArray[clickedId[0]][clickedId[1]] = '';
    } else {
      playerArray[clickedId[0]][clickedId[1]] = diagram;
      $(this).text(diagram);
    }
    console.log(clickedId, playerArray);
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
    localStorage.setItem('number', number + 1);
    location.reload();
  });

  $('#retryButton').on('click', function() {
    localStorage.removeItem('length');
    localStorage.removeItem('number');
    location.reload();
  });

  //初期化&描画
  generateGrid(answerArray, 'answerBoard');

  // 解答のフェードアウト
  hideAnswer(length, miliSec);

});