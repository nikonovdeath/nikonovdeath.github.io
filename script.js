let score = 0;
let starInterval = 1000; // Начальная частота появления звездочек (в миллисекундах)
let fallSpeed = 20; // Увеличим скорость падения звездочек (меньше значение - быстрее падение)

document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.getElementById('game-container');
    const scoreDisplay = document.getElementById('score');

    function createStarOrBomb() {
        const element = document.createElement('div');
        const isBomb = Math.random() < 0.2; // Вероятность появления бомбочки 20%

        if (isBomb) {
            element.classList.add('bomb');
            element.addEventListener('click', () => {
                score -= 30;
                if (score < 0) score = 0;
                scoreDisplay.textContent = `Словлено Никит: ${score}`;
                element.remove();

                // Изменяем фон на красный на 0.5 секунды
                document.body.style.backgroundColor = 'red';
                setTimeout(() => {
                    document.body.style.backgroundColor = 'black';
                }, 500);
            });
        } else {
            element.classList.add('star');
            element.addEventListener('click', () => {
                score++;
                scoreDisplay.textContent = `Словлено Никит: ${score}`;
                element.remove();

                // Увеличиваем частоту появления звездочек каждые 10 кликов
                if (score % 10 === 0) {
                    increaseStarFrequency();
                }
            });
        }

        element.style.left = `${Math.random() * (window.innerWidth - 100)}px`; // Учитываем размер элемента
        element.style.top = '0px';

        gameContainer.appendChild(element);

        let fallInterval = setInterval(() => {
            let top = parseFloat(element.style.top);
            if (top < window.innerHeight - 100) { // Учитываем размер элемента
                element.style.top = `${top + 5}px`;
            } else {
                element.remove();
                clearInterval(fallInterval);
            }
        }, fallSpeed); // Увеличиваем скорость падения элементов
    }

    function increaseStarFrequency() {
        clearInterval(starCreationInterval); // Останавливаем текущий интервал
        starInterval *= 0.9; // Уменьшаем интервал (увеличиваем частоту появления элементов)
        startStarCreation(); // Запускаем новый интервал с новой частотой
    }

    function startStarCreation() {
        starCreationInterval = setInterval(createStarOrBomb, starInterval);
    }

    let starCreationInterval = setInterval(createStarOrBomb, starInterval); // Начинаем создавать элементы
});
