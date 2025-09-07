(function() {
    'use strict';
    Lampa.Platform.tv();
    
    // Основна функція отримання випадкового сервера
    function getRandomServer() {
        if (Lampa.Storage.get('torrserver_use_link') == 'two') {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://185.87.48.42:8090/random_torr', true);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    var ip = xhr.responseText;
                    Lampa.Storage.set('torrserver_url_two', 'http://' + ip + ':8090');
                } else {
                    console.error('Ошибка при получении IP-адреса:', xhr.status);
                    Lampa.Noty.show('Ошибка доступа');
                }
            };
            xhr.onerror = function() {
                console.error('Ошибка при получении IP-адреса:', xhr.status);
                Lampa.Noty.show('Ошибка доступа');
            };
            xhr.send();
        } else {
            Lampa.Noty.show('Ошибка доступа');
        }
    }

    // Функція додавання кнопки перемикання серверів
    function addSwitchButton() {
        var buttonHtml = '<div id="SWITCH_SERVER" class="head__action selector switch-screen">' + 
                        '<svg>...</svg></div>';
        $('#app > div.head > div > div.head__actions').append(buttonHtml);
        $('#SWITCH_SERVER').attr('title', 'Кнопка для смены сервера');
        
        // Обробник кліку на кнопку
        $('#SWITCH_SERVER').on('hover:enter hover:click hover:touch', function() {
            Lampa.Noty.show('TorrServer изменён');
            getRandomServer();
        });
    }

    // Ініціалізація
    var initInterval = setInterval(function() {
        if (typeof Lampa !== 'undefined') {
            clearInterval(initInterval);
            initializePlugin();
        }
    }, 200);

    function initializePlugin() {
        // Ініціалізація налаштувань
        if (localStorage.getItem('torrserver_use_link') === null || localStorage.getItem('torrserver_use_link') == 1) {
            Lampa.Storage.set('torrserver_url_two', '');
            setTimeout(function() {
                getRandomServer();
                Lampa.Storage.set('torrserver_use_link', 'two');
            }, 3000);
        }
        
        // Додаємо параметри в налаштування
        Lampa.SettingsApi.addParam({
            component: 'server',
            param: {
                name: 'torrserv',
                type: 'select',
                values: {0: 'Свой вариант', 1: 'Автовыбор'},
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

        // Додаємо кнопку
        if (window.appready) {
            addSwitchButton();
        } else {
            Lampa.Listener.follow('appready', function(e) {
                if (e.type == 'appready') {
                    addSwitchButton();
                }
            });
        }
    }
})();
