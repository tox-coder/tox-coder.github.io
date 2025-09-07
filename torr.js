(function() {
    'use strict';
    
    // Чекаємо, поки завантажиться Lampa
    var checkLampa = setInterval(function() {
        // Якщо Lampa не існує (наприклад, на GitHub), зупиняємо інтервал і не ініціалізуємо плагін
        if (typeof Lampa !== 'undefined' && Lampa.SettingsApi) {
            clearInterval(checkLampa);
            initPlugin();
        }
        // Додаткова перевірка: якщо ми не в Lampa, зупинити спроби через 5 секунд (наприклад, на GitHub)
        else if (typeof Lampa === 'undefined' && typeof window !== 'undefined') {
            // Після 5 секунд якщо Lampa так і не з'явилась, припиняємо спроби
            setTimeout(function() {
                clearInterval(checkLampa);
                console.log('Free TorrServer: Lampa not found. Plugin is disabled.');
            }, 5000);
        }
    }, 1000);

    function initPlugin() {
        // Фінальна перевірка перед ініціалізацією
        if (typeof Lampa === 'undefined' || !Lampa.SettingsApi || !Lampa.Storage || !Lampa.Noty) {
            console.error('Free TorrServer: Required Lampa APIs are not available.');
            return;
        }

        console.log('Free TorrServer plugin initialized');
        
        // Додаємо налаштування
        try {
            Lampa.SettingsApi.addParam({
                component: 'server',
                param: {
                    name: 'torrserv',
                    type: 'select',
                    values: {
                        0: 'Свой вариант',
                        1: 'Автовыбор'
                    },
                    default: 1
                },
                field: {
                    name: 'Free TorrServer',
                    description: 'Нажмите для смены сервера'
                },
                onChange: function(value) {
                    if (value == '0') {
                        Lampa.Storage.set('torrserver_use_link', 'one');
                        Lampa.Storage.set('torrserver_url_two', '');
                        Lampa.Settings.update();
                    }
                    if (value == '1') {
                        Lampa.Noty.show('TorrServer изменён');
                        Lampa.Storage.set('torrserver_use_link', 'two');
                        getRandomServer();
                        Lampa.Settings.update();
                    }
                }
            });
        } catch (e) {
            console.error('Free TorrServer: Failed to add settings:', e);
        }

        // Додаємо кнопку перемикання
        addSwitchButton();
    }

    function getRandomServer() {
        // Критично важлива перевірка: робимо запит ТІЛЬКИ в середовищі Lampa
        if (typeof Lampa === 'undefined' || !Lampa.Storage || !Lampa.Noty) {
            console.log('Free TorrServer: Skip request - not in Lampa environment');
            return;
        }

        // Додаткова перевірка: якщо ми на безпечній сторінці (HTTPS), не робити HTTP-запити
        if (window.location && window.location.protocol === 'https:') {
            Lampa.Noty.show('Ошибка: Невозможно сменить сервер на HTTPS-странице');
            console.error('Free TorrServer: Cannot make HTTP request from HTTPS page');
            return;
        }

        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://185.87.48.42:8090/random_torr', true);
        xhr.timeout = 10000; // Таймаут 10 секунд

        xhr.onload = function() {
            if (xhr.status === 200) {
                var ip = xhr.responseText;
                Lampa.Storage.set('torrserver_url_two', 'http://' + ip + ':8090');
                Lampa.Noty.show('Сервер обновлен: ' + ip);
            } else {
                console.error('Ошибка при получении IP-адреса:', xhr.status);
                Lampa.Noty.show('Ошибка доступа к серверу');
            }
        };

        xhr.onerror = function() {
            console.error('Ошибка сети');
            Lampa.Noty.show('Ошибка сети');
        };

        xhr.ontimeout = function() {
            console.error('Запрос превысил время ожидания');
            Lampa.Noty.show('Таймаут соединения');
        };

        try {
            xhr.send();
        } catch (e) {
            console.error('Free TorrServer: Failed to send request:', e);
            if (Lampa.Noty) {
                Lampa.Noty.show('Ошибка при отправке запроса');
            }
        }
    }

    function addSwitchButton() {
        // Додаємо кнопку тільки якщо ми в Lampa і на правильній сторінці
        if (typeof Lampa === 'undefined' || !document.querySelector) {
            return;
        }

        var buttonHtml = '<div id="SWITCH_SERVER" class="head__action selector switch-screen" title="Сменить TorrServer">' +
                        '<svg style="width:24px;height:24px" viewBox="0 0 24 24" fill="currentColor">' +
                        '<path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>' +
                        '</svg></div>';

        // Чекаємо, поки з'явиться контейнер для кнопок (максимум 10 спроб)
        var attempts = 0;
        var maxAttempts = 10;
        
        var checkContainer = setInterval(function() {
            attempts++;
            var container = document.querySelector('#app > div.head > div > div.head__actions');
            
            if (container) {
                clearInterval(checkContainer);
                
                // Перевіряємо, чи кнопка вже існує
                if (!document.getElementById('SWITCH_SERVER')) {
                    container.insertAdjacentHTML('beforeend', buttonHtml);
                    
                    // Додаємо обробник кліку
                    var button = document.getElementById('SWITCH_SERVER');
                    if (button) {
                        button.addEventListener('click', function() {
                            if (typeof Lampa !== 'undefined' && Lampa.Noty) {
                                Lampa.Noty.show('Меняем сервер...');
                            }
                            getRandomServer();
                        });
                    }
                }
            } else if (attempts >= maxAttempts) {
                clearInterval(checkContainer);
                console.log('Free TorrServer: Container for button not found');
            }
        }, 500);
    }

})();
