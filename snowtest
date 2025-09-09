(function () {
    'use strict';

    if (window.__snow_plugin_init__) return;
    window.__snow_plugin_init__ = true;

    var intervalId = null;
    var intensity = parseInt(Lampa.Storage.get('snow_intensity', 200)) || 200;
    var enabled = (Lampa.Storage.get('snow_enabled', true) === true || Lampa.Storage.get('snow_enabled') === 'true');

    function injectStyles() {
        if (document.getElementById('snow-styles')) return;
        var style = document.createElement('style');
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
                z-index: 2147483647;
            }
            @keyframes snow-fall {
                to { transform: translateY(100vh); }
            }
        `;
        document.head.appendChild(style);
    }

    function createSnowflake() {
        if (!enabled) return;
        var s = document.createElement('div');
        s.className = 'snowflake';
        s.textContent = '❄';
        s.style.left = (Math.random() * window.innerWidth) + 'px';
        s.style.fontSize = (Math.random() * 14 + 10) + 'px';
        s.style.opacity = (Math.random() * 0.6 + 0.4).toFixed(2);
        s.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.body.appendChild(s);
        setTimeout(function () { try { s.remove(); } catch (e) {} }, 7000);
    }

    function startSnow() {
        injectStyles();
        stopSnow();
        intervalId = setInterval(createSnowflake, Math.max(50, intensity));
    }
    function stopSnow() {
        if (intervalId) clearInterval(intervalId);
        intervalId = null;
    }
    function toggleSnow(on) {
        enabled = !!on;
        Lampa.Storage.set('snow_enabled', enabled);
        if (enabled) startSnow(); else stopSnow();
    }
    function setIntensity(ms) {
        ms = parseInt(ms) || 200;
        if (ms < 50) ms = 50;
        intensity = ms;
        Lampa.Storage.set('snow_intensity', intensity);
        if (enabled) startSnow();
    }

    function registerSettings() {
        try {
            if (Lampa.SettingsApi && typeof Lampa.SettingsApi.addComponent === 'function') {
                Lampa.SettingsApi.addComponent({
                    component: 'interface',
                    name: 'snow',
                    type: 'toggle',
                    title: 'Увімкнути сніг',
                    subtitle: 'Ефект падаючого снігу на фоні',
                    value: enabled,
                    onChange: toggleSnow
                });

                Lampa.SettingsApi.addComponent({
                    component: 'interface',
                    name: 'snow_intensity',
                    type: 'input',
                    title: 'Інтенсивність снігу (мс)',
                    subtitle: 'Чим менше число, тим більше снігу',
                    value: intensity,
                    onChange: setIntensity
                });
            }
        } catch (e) { console.error('Snow plugin: settings integration failed', e); }
    }

    function boot() {
        registerSettings();
        if (enabled) startSnow();
    }

    if (window.Lampa && Lampa.Listener && typeof Lampa.Listener.follow === 'function') {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') boot();
        });
        setTimeout(function () { if (!intervalId) boot(); }, 3000);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
