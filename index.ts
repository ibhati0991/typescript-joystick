// Import stylesheets
import './style.css';

const joystickContainer: HTMLElement =
  document.getElementById('joystick-container');
const joystick: HTMLElement = document.getElementById('joystick');
const info: HTMLElement = document.getElementById('info');
var x = 0;
var y = 0;

joystickContainer.addEventListener('pointermove', (event) => {
  event.preventDefault();
  x = event.clientX - joystickContainer.offsetLeft + 175;
  y = event.clientY - joystickContainer.offsetTop + 175;
  if (x > 115 && x < 235 && y > 115 && y < 235) {
    joystick.style.left = x + 'px';
    joystick.style.top = y + 'px';
    info.innerHTML = `<h3>X:${x} Y:${y}</h3>`;
  }
  var xhr = new XMLHttpRequest();
  xhr.open('GET', `/?posX=${x}&posY=${y}`, true);
  xhr.send();
});

joystickContainer.addEventListener('pointerout', () => {
  joystick.style.left = '50%';
  joystick.style.top = '50%';
  x = 0;
  y = 0;
  info.innerHTML = `<h3>X:${x} Y:${y}</h3>`;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/?posX=${x}&posY=${y}', true);
  xhr.send();
});

info.innerHTML = `<h3>X:${x} Y:${y}</h3>`;
