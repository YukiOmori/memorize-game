$(() => {
  let playerName = localStorage.getItem('playerName') ? JSON.parse(localStorage.getItem('playerName')) : 'no name';
  $('#playerName').val(playerName);
  $('#startButton').on('click', () => {
    let playerName = $('#playerName').val();
    localStorage.setItem('playerName', JSON.stringify(playerName));
  });
});