(function() {
    // Конфигурация плагина
    const config = {
        iconColor: '#FF5722', // Оранжевый цвет по умолчанию
        applyToAllIcons: false, // Теперь должно работать корректно
        debugMode: true // Включим для диагностики
    };

    function log(message) {
        if (config.debugMode) {
            console.log('[IconColorPlugin] ' + message);
        }
    }

    function applyIconColors() {
        try {
            let icons;
            
            if (config.applyToAllIcons) {
                // Общий селектор для всех иконок
                icons = document.querySelectorAll('ion-icon, mat-icon, .icon, [class*="icon"], [class*="Icon"], svg');
                log('Режим: все иконки');
            } else {
                // Специфичные селекторы для меню настроек Lampa
                icons = document.querySelectorAll('.settings-menu ion-icon, .settings-menu mat-icon, .settings-menu svg, [class*="settings"] ion-icon, [class*="menu"] ion-icon, .menu-item ion-icon');
                log('Режим: только иконки настроек');
            }
            
            log(`Найдено иконок: ${icons.length}`);
            
            icons.forEach(icon => {
                try {
                    if (icon.tagName.toLowerCase() === 'ion-icon') {
                        icon.style.color = config.iconColor;
                        icon.style.setProperty('--ionicon-stroke-width', '32px', 'important');
                    } 
                    else if (icon.tagName.toLowerCase() === 'mat-icon') {
                        icon.style.color = config.iconColor;
                    } 
                    else if (icon.tagName.toLowerCase() === 'svg') {
                        icon.style.fill = config.iconColor;
                        icon.style.color = config.iconColor;
                    }
                    
                    log(`Изменена иконка: ${icon.tagName} (${icon.className || 'no class'})`);
                } catch (e) {
                    log(`Ошибка при обработке иконки: ${e}`);
                }
            });
            
        } catch (e) {
            log(`Ошибка в основном обработчике: ${e}`);
        }
    }

    function observeDOM() {
        const observer = new MutationObserver(function(mutations) {
            let shouldUpdate = false;
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length) {
                    shouldUpdate = true;
                }
            });
            if (shouldUpdate) {
                applyIconColors();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function initPlugin() {
        log('Плагин инициализирован');
        applyIconColors();
        observeDOM();
        
        // Дополнительная проверка после полной загрузки
        setTimeout(applyIconColors, 1500);
        setTimeout(applyIconColors, 3000);
    }

    // Запуск
    if (document.readyState === 'complete') {
        initPlugin();
    } else {
        window.addEventListener('load', initPlugin);
        document.addEventListener('DOMContentLoaded', initPlugin);
    }
})();
