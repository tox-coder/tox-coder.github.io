(function() {
    'use strict';
    
    // Чекаємо, поки завантажиться Lampa
    var checkLampa = setInterval(function() {
        if (typeof Lampa !== 'undefined') {
            clearInterval(checkLampa);
            initPlugin();
        }
    }, 1000);

    function initPlugin() {
        console.log('Free TorrServer plugin initialized');
        
        // Додаємо налаштування
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

        // Додаємо кнопку перемикання
        addSwitchButton();
    }

    function getRandomServer() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://185.87.48.42:8090/random_torr', true);
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
        xhr.send();
    }

    function addSwitchButton() {
        var buttonHtml = '<div id="SWITCH_SERVER" class="head__action selector switch-screen" title="Сменить TorrServer">' +
                        '<svg style="width:24px;height:24px" viewBox="0 0 24 24" fill="currentColor">' +
                        '<path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>' +
                        '</svg></div>';

        // Чекаємо, поки з'явиться контейнер для кнопок
        var checkContainer = setInterval(function() {
            var container = document.querySelector('#app > div.head > div > div.head__actions');
            if (container) {
                clearInterval(checkContainer);
                container.insertAdjacentHTML('beforeend', buttonHtml);
                
                // Додаємо обробник кліку
                document.getElementById('SWITCH_SERVER').addEventListener('click', function() {
                    Lampa.Noty.show('Меняем сервер...');
                    getRandomServer();
                });
            }
        }, 1000);
    }

})();
