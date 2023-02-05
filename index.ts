// Import stylesheets
import './style.css';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCcmEk_LTg6LArbbMhk7Unpk8SyPszPfBo',
  authDomain: 'esp32-car-aa3ea.firebaseapp.com',
  databaseURL: 'https://esp32-car-aa3ea-default-rtdb.firebaseio.com',
  projectId: 'esp32-car-aa3ea',
  storageBucket: 'esp32-car-aa3ea.appspot.com',
  messagingSenderId: '690319348381',
  appId: '1:690319348381:web:f9c6e948a690e22e6b7a74',
  measurementId: 'G-NDY321MGHQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

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
    writeUserData(x, y);
  }
  // var xhr = new XMLHttpRequest();
  // xhr.open('GET', `/?posX=${x}&posY=${y}`, true);
  // xhr.send();
});

joystickContainer.addEventListener('pointerout', () => {
  joystick.style.left = '50%';
  joystick.style.top = '50%';
  x = 0;
  y = 0;
  info.innerHTML = `<h3>X:${x} Y:${y}</h3>`;
  writeUserData(x, y);
  // var xhr = new XMLHttpRequest();
  // xhr.open('GET', '/?posX=${x}&posY=${y}', true);
  // xhr.send();
});

info.innerHTML = `<h3>X:${x} Y:${y}</h3>`;

function writeUserData(x, y) {
  const db = getDatabase();
  set(ref(db, 'positions/' + 'esp32Car'), {
    x: x,
    y: y,
  });
}
