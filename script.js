document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
  return evt.touches;
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      document.querySelector('.pageOne').classList.add('hide');
      document.querySelector('.clockScreen').classList.remove('hide');
    } else {
      document.querySelector('.clockScreen').classList.add('hide');
      document.querySelector('.pageOne').classList.remove('hide');
    }
  }
  xDown = null;
  yDown = null;
}

function startTime() {
  var tm = new Date();
  var h = tm.getHours();
  var m = tm.getMinutes();
  var s = tm.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('txt').innerHTML = h + ':' + m + ':' + s;
  t = setTimeout('startTime()', 500);
}
function checkTime(i) {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}

const submitButton = document.querySelector('.submitButton');
const textarea = document.querySelector('textarea');

textarea.addEventListener('change', updateValue);
submitButton.addEventListener('click', addWordToList);

function updateValue(e) {
  textarea.textContent = e.target.value;
}

let output = document.querySelector('.output');
let list = document.querySelector('.list');
list.textContent = window.sessionStorage.getItem('li');

function addWordToList(e) {
  e.preventDefault();
  if (textarea.textContent) {
    let listItem = document.createElement('li');
    listItem.textContent = textarea.textContent;
    list.appendChild(listItem);
    textarea.value = '';
  }
}
