(function () {
    'use strict';

    if (window.__snow_plugin_init__) return;
    window.__snow_plugin_init__ = true;

    let intervalId = null;
    let intensity = parseInt(Lampa.Storage.get('snow_intensity', 200)); // за замовчуванням 200 мс
    let enabled = Lampa.Storage.get('snow_enabled', true); // за замовчуванням увімкнено

    function registerPlugin() {
        try {
            if (window.Lampa && Lampa.Plugin && typeof Lampa.Plugin.create === 'function') {
                Lampa.Plugin.create({
                    title: 'Snow',
                    description: 'Ефект падаючого снігу',
                    id: 'snow',
                    status: true
                });
            }
        } catch (e) {}
    }

    function injectStyles() {
        if (document.getElementById('snow-styles')) return;
        let style = document.createElement('style');
        style.id = 'snow-styles';
        style.textContent = `
            .snowflake {
                position: fixed;
                top: -10px;
                color: white;
                user-select: none;
                pointer-events: none;
                animation-name: snow-fall;
                animation-timing-function: linear;
                z-index: 9999;
            }
            @keyframes snow-fall {
                to { transform: translateY(100vh); }
            }
        `;
        document.head.appendChild(style);
    }

    function createSnowflake() {
        if (!enabled) return;
        let s = document.createElement('div');
        s.className = 'snowflake';
        s.textContent = '❄';
        s.style.left = (Math.random() * window.innerWidth) + 'px';
        s.style.fontSize = (Math.random() * 10 + 10) + 'px';
        s.style.opacity = (Math.random() * 0.5 + 0.5).toFixed(2);
        s.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 6000);
    }

    function startSnow() {
        injectStyles();
        stopSnow();
        intervalId = setInterval(createSnowflake, intensity);
    }

    function stopSnow() {
        if (intervalId) clearInterval(intervalId);
        intervalId = null;
    }

    function toggleSnow(on) {
        enabled = on;
        Lampa.Storage.set('snow_enabled', on);
        if (on) startSnow();
        else stopSnow();
    }

    function setIntensity(ms) {
        intensity = ms;
        Lampa.Storage.set('snow_intensity', ms);
        if (enabled) startSnow();
    }

    function addSettings() {
        Lampa.Settings.add({
            title: 'Snow',
            id: 'snow',
            icon: 'snowflake',
            items: [
                {
                    title: 'Увімкнути сніг',
                    subtitle: 'Показувати/ховати ефект',
                    type: 'toggle',
                    value: enabled,
                    onChange: (val) => toggleSnow(val)
                },
                {
                    title: 'Інтенсивність снігу',
                    subtitle: 'Задай частоту падіння (чим менше, тим більше снігу)',
                    type: 'input',
                    value: intensity,
                    onChange: (val) => {
                        let ms = parseInt(val) || 200;
                        if (ms < 50) ms = 50;
                        setIntensity(ms);
                    }
                }
            ]
        });
    }

    function boot() {
        registerPlugin();
        addSettings();
        if (enabled) startSnow();
    }

    if (window.Lampa && Lampa.Listener && typeof Lampa.Listener.follow === 'function') {
        Lampa.Listener.follow('app', (e) => {
            if (e.type === 'ready') boot();
        });
        setTimeout(() => { if (!intervalId) boot(); }, 3000);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
