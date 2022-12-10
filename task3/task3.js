const wsUri = 'wss://echo-ws-service.herokuapp.com';
const websocket = new WebSocket(wsUri);

const btnSend = document.querySelector('.j-btn-send');
const btnGeolocation = document.querySelector('.j-btn-geolocation');
const messageText = document.querySelector('.j-message-text');
const mapLink = document.querySelector('.j-map-link');

function writeToScreen(message) {
  let pre = document.createElement("div");
  pre.className = `chat`;
  pre.innerHTML = message;
  messageText.appendChild(pre);
} 

btnSend.addEventListener('click', () => {
  let message = document.querySelector('.j-input').value;
    writeToScreen("Я: " + message);
  websocket.send(message);
  websocket.onmessage = function(evt) {
    writeToScreen('Сервер: ' + evt.data);
  };
  websocket.onerror = function(evt) {
    writeToScreen('Сервер: ERROR' + evt.data);
  };
});

const error = () => {
  writeToScreen('Невозможно получить ваше местоположение');
};

const success = (position) => {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  mapLink.className = `chat`;
  mapLink.textContent = 'Гео-локация';
  messageText.appendChild(mapLink);
};

btnGeolocation.addEventListener('click', () => {
  mapLink.href = '';
  mapLink.textContent = '';
  
  if (!navigator.geolocation) {
    messageText.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
});