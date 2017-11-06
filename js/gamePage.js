let diagram = '●';
let playerName = localStorage.getItem('playerName') ? JSON.parse(localStorage.getItem('playerName')) : 'no name';
let length = localStorage.getItem('length') ? JSON.parse(localStorage.getItem('length')) : 3; //マス目の長さ
let number = localStorage.getItem('number') ? JSON.parse(localStorage.getItem('number')) : 5; //●の数
let miliSec = 1000; // 解答が消えるまでの時間
let answerArray = generateAnswerArray(length, number, diagram);
let playerArray = JSON.parse(JSON.stringify((new Array(length)).fill((new Array(length)).fill(''))));
let level = localStorage.getItem('level') ? JSON.parse(localStorage.getItem('level')) : 1;
let score = localStorage.getItem('score') ? JSON.parse(localStorage.getItem('score')) : 0;;
let rankingArray = localStorage.getItem('rankingArray') ? JSON.parse(localStorage.getItem('rankingArray')) : [];

function sleepByPromise(miliSec) { 
  return new Promise((resolve) => setTimeout(resolve, miliSec));
}

function showAnswer(answerArray, playerArray) {
  answerArray.forEach((row, rowNumber) => {
    row.forEach((element, colNumber) => {
      if (element != playerArray[rowNumber][colNumber]){
        let curId = '#' + rowNumber + colNumber;
        if (playerArray[rowNumber][colNumber] === diagram) {
          $(curId).css({'text-decoration': 'line-through'});
        } else {
          $(curId).text(diagram);
          $(curId).css({'color': '#f00'});
        }
      }
    });
  });
}

function calcScore(answerArray, playerArray) {
  let score = 0;
  answerArray.forEach((row, rowNumber) => {
    row.forEach((element, colNumber) => {
      if (element === diagram && element === playerArray[rowNumber][colNumber]){
        score += 1;
      }
    });
  });
  return score;
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

  //描画後にちゃんと紐付ける
    $('td').on('click', function() {
    let clickedId = $(this).attr('id');
    if ($(this).text()) {
      $(this).text('');
      playerArray[clickedId[0]][clickedId[1]] = '';
    } else {
      playerArray[clickedId[0]][clickedId[1]] = diagram;
      $(this).text(diagram);
    }
  });
}

$(() => {
  //初期化&描画
  $('#level').text('レベル: ' + level);
  $('#score').text('スコア: ' + score);
  generateGrid(answerArray, 'answerBoard');

  // 解答のフェードアウト
  hideAnswer(length, miliSec);

  $('#answerButton').on('click', function() {
    $('#answerButton').css('display', 'none');
    score += calcScore(answerArray, playerArray);
    $('#score').text('スコア: ' + score);
    if (checkAnswer(answerArray, playerArray)) {
      $('#result').text('正解！');
      $('#nextButton').css('display', 'block');
    } else {
      $('#result').text('不正解');
      let resultData = {};
      resultData.score = score;
      resultData.playerName = playerName;
      rankingArray.push(resultData);
      localStorage.setItem('rankingArray', JSON.stringify(rankingArray));
      showAnswer(answerArray, playerArray);
      $('#retryButton').css('display', 'block');
      $('#backToTopButton').css('display', 'block');
    }
  });

  $('#nextButton').on('click', function() {
    localStorage.setItem('length', length + 1);
    localStorage.setItem('number', number + 2);
    localStorage.setItem('level', level + 1);
    localStorage.setItem('score', score);

    location.reload();
  });

  $('#retryButton').on('click', function() {
    localStorage.removeItem('length');
    localStorage.removeItem('number');
    localStorage.removeItem('level');
    localStorage.removeItem('score');
    location.reload();
  });

  $('#backToTopButton').on('click', function() {
    localStorage.removeItem('length');
    localStorage.removeItem('number');
    localStorage.removeItem('level');
    localStorage.removeItem('score');
    location.reload();
  });

});