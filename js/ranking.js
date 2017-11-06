function drawRankingGrid(rankingArray) {
  let rankingTableCode = '<tr><th>順位</th><th>名前</th><th>スコア</th></tr><tr>';
  rankingArray.forEach((data, index) => {
    rankingTableCode += '<tr><td>' + (index + 1) + '<td>' + data.playerName + '</td>' + '<td>' + data.score + '</td></tr>'
  });
  $('#ranking').append(rankingTableCode);
}

$(() => {
  let rankingArray = localStorage.getItem('rankingArray') ? JSON.parse(localStorage.getItem('rankingArray')) : [];
  rankingArray.sort((a, b) => {return b.score - a.score;});
  drawRankingGrid(rankingArray);
});