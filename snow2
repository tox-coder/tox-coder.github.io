(function () {
    'use strict';

    // Реєстрація плагіна
    Lampa.Plugin.create({
        title: 'Snow',
        description: 'Ефект падаючого снігу',
        id: 'snow',
        status: true // тепер не буде "не підтверджено"
    });

    function createSnowflake() {
        let snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = '❄';
        snowflake.style.left = Math.random() * window.innerWidth + 'px';
        snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
        snowflake.style.opacity = Math.random();
        snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
        document.body.appendChild(snowflake);

        setTimeout(() => {
            snowflake.remove();
        }, 5000);
    }

    setInterval(createSnowflake, 200);

    // Додаємо стилі для сніжинок
    let style = document.createElement('style');
    style.innerHTML = `
        .snowflake {
            position: fixed;
            top: -10px;
            color: white;
            user-select: none;
            pointer-events: none;
            animation-name: fall;
            animation-timing-function: linear;
            z-index: 9999;
        }
        @keyframes fall {
            to {
                transform: translateY(100vh);
            }
        }
    `;
    document.head.appendChild(style);
})();
