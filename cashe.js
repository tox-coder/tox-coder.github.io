(function() {
    'use strict';
    
    var checkLampa = setInterval(function() {
        if (typeof Lampa !== 'undefined' && Lampa.SettingsApi) {
            clearInterval(checkLampa);
            initPlugin();
        }
        else if (typeof Lampa === 'undefined') {
            setTimeout(function() {
                clearInterval(checkLampa);
            }, 5000);
        }
    }, 1000);

    function initPlugin() {
        if (typeof Lampa === 'undefined' || !Lampa.SettingsApi || !Lampa.Storage || !Lampa.Noty) {
            return;
        }

        console.log('Free TorrServer plugin initialized');
        
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
        } catch (e) {}

        addSwitchButton();
    }

    function getRandomServer() {
        if (typeof Lampa === 'undefined' || !Lampa.Storage || !Lampa.Noty) {
            return;
        }

        // Список резервних проксі-серверів
        var proxyServers = [
            'https://corsproxy.io/?http://185.87.48.42:8090/random_torr',
            'https://api.codetabs.com/v1/proxy?quest=http://185.87.48.42:8090/random_torr',
            'https://cors-anywhere.herokuapp.com/http://185.87.48.42:8090/random_torr'
        ];

        var currentProxy = 0;

        function tryNextProxy() {
            if (currentProxy >= proxyServers.length) {
                Lampa.Noty.show('Все серверы недоступны');
                return;
            }

            var xhr = new XMLHttpRequest();
            xhr.open('GET', proxyServers[currentProxy], true);
            xhr.timeout = 8000;

            xhr.onload = function() {
                if (xhr.status === 200) {
                    var ip = xhr.responseText.trim();
                    if (ip && ip.length > 0) {
                        Lampa.Storage.set('torrserver_url_two', 'http://' + ip + ':8090');
                        Lampa.Noty.show('Сервер обновлен: ' + ip);
                    } else {
                        Lampa.Noty.show('Неверный ответ сервера');
                    }
                } else {
                    console.error('Ошибка прокси:', xhr.status);
                    currentProxy++;
                    tryNextProxy();
                }
            };

            xhr.onerror = function() {
                console.error('Ошибка сети с прокси:', currentProxy);
                currentProxy++;
                tryNextProxy();
            };

            xhr.ontimeout = function() {
                console.error('Таймаут прокси:', currentProxy);
                currentProxy++;
                tryNextProxy();
            };

            try {
                xhr.send();
            } catch (e) {
                currentProxy++;
                tryNextProxy();
            }
        }

        Lampa.Noty.show('Получаем сервер...');
        tryNextProxy();
    }

    function addSwitchButton() {
        if (typeof Lampa === 'undefined' || !document.querySelector) {
            return;
        }

        var buttonHtml = '<div id="SWITCH_SERVER" class="head__action selector switch-screen" title="Сменить TorrServer">' +
                        '<svg style="width:24px;height:24px" viewBox="0 0 24 24" fill="currentColor">' +
                        '<path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>' +
                        '</svg></div>';

        var attempts = 0;
        var maxAttempts = 10;
        
        var checkContainer = setInterval(function() {
            attempts++;
            var container = document.querySelector('#app > div.head > div > div.head__actions');
            
            if (container) {
                clearInterval(checkContainer);
                
                if (!document.getElementById('SWITCH_SERVER')) {
                    container.insertAdjacentHTML('beforeend', buttonHtml);
                    
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
            }
        }, 500);
    }

})();
