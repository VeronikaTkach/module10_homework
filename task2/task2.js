const btn = document.querySelector('.j-btn-test');

btn.addEventListener('click', () => {
  let availHeight = window.screen.height;
  var screenAvailWidth = window.screen.availWidth;
  alert(`Размер экрана ${availHeight} х ${screenAvailWidth}`);
});