const counterElement = document.querySelector('.counter');
const coinElement = document.querySelector('.coin');

let clicks = 0;

// Функция для получения значения cookie
function getCookie(name) {
  const cookie = document.cookie;
  const parts = cookie.split('; ');
  for (let i = 0; i < parts.length; i++) {
    const pair = parts[i].split('=');
    if (pair[0] === name) {
      return decodeURIComponent(pair[1]);
    }
  }
  return null;
}

// Функция для установки значения cookie
function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
}

// Проверка, есть ли у пользователя cookie с идентификатором
let userId = getCookie('userId');
if (!userId) {
  // Если нет, генерируем новый UUID
  userId = generateUUID();
  setCookie('userId', userId, 365); // Сохраняем ID на год
}

// Загрузка данных из cookie
const cookieClicks = getCookie(`clicks_${userId}`); // имя cookie с уникальным идентификатором
if (cookieClicks) {
  clicks = parseInt(cookieClicks);
}

// Функция для генерации UUID
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Обновление счетчика
function updateCounter() {
  counterElement.textContent = clicks;
}

// Обработчик клика по монетке
coinElement.addEventListener('click', () => {
  clicks++;
  updateCounter();

  // Сохранение данных в cookie с уникальным идентификатором
  setCookie(`clicks_${userId}`, clicks, 30); // Сохраняем на 30 дней
});

updateCounter();