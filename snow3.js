(function () {
    'use strict';

    // Prevent double init
    if (window.__snow_plugin_init__) return;
    window.__snow_plugin_init__ = true;

    function register() {
        try {
            if (window.Lampa && Lampa.Plugin && typeof Lampa.Plugin.create === 'function') {
                Lampa.Plugin.create({
                    title: 'Snow',
                    description: 'Ефект падаючого снігу',
                    id: 'snow',
                    status: true // якщо API доступний — буде "підтверджено"
                });
            }
        } catch (e) {
            // тихо ігноруємо, щоб не ламати роботу плагіна
        }
    }

    function injectStyles() {
        if (document.getElementById('snow-styles')) return;
        var style = document.createElement('style');
        style.id = 'snow-styles';
        style.textContent = [
            '.snowflake{position:fixed;top:-10px;left:0;will-change:transform;',
            'color:#fff;pointer-events:none;user-select:none;',
            'animation-name:snow-fall;animation-timing-function:linear;',
            'z-index:2147483647}',
            '@keyframes snow-fall{to{transform:translateY(100vh);}}'
        ].join('');
        document.head.appendChild(style);
    }

    function createSnowflake() {
        var s = document.createElement('div');
        s.className = 'snowflake';
        s.textContent = '❄';
        s.style.left = (Math.random() * window.innerWidth) + 'px';
        s.style.fontSize = (Math.random() * 10 + 10) + 'px';
        s.style.opacity = (Math.random() * 0.5 + 0.5).toFixed(2);
        s.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.body.appendChild(s);
        setTimeout(function () {
            s.remove();
        }, 6000);
    }

    var intervalId;
    function startSnow() {
        injectStyles();
        if (intervalId) return;
        intervalId = setInterval(createSnowflake, 200);
        window.addEventListener('beforeunload', function () {
            clearInterval(intervalId);
        });
    }

    function boot() {
        register();   // спробуємо зробити "підтверджено", якщо є API
        startSnow();  // сам ефект завжди працює
    }

    // Варіанти старту для різних збірок Lampa/браузера
    if (window.Lampa && Lampa.Listener && typeof Lampa.Listener.follow === 'function') {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') boot();
        });
        // Таймаут-фолбек: на випадок, якщо подію пропущено або Plugin-API зʼявиться пізніше
        setTimeout(function () {
            if (!intervalId) boot();
        }, 3000);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
