(function() {
    // Конфигурация плагина
    const config = {
        iconColor: '#11de02', // Зеленый цвет по умолчанию (можно изменить)
        applyToAllIcons: false, // Применять ко всем иконкам или только к иконкам настроек
        debugMode: false // Режим отладки (выводит логи в консоль)
    };

    // Функция для логгирования (только в debug режиме)
    function log(message) {
        if (config.debugMode) {
            console.log('[IconColorPlugin] ' + message);
        }
    }

    // Основная функция изменения цвета иконок
    function applyIconColors() {
        try {
            // Находим все элементы иконок
            let iconSelectors = config.applyToAllIcons 
                ? 'ion-icon, mat-icon, .icon, [class*="icon"], [class*="Icon"]' 
                : '.settings-icon, .menu-icon, [class*="settings"], [class*="menu"]';

            const icons = document.querySelectorAll(iconSelectors);
            
            log(`Найдено иконок: ${icons.length}`);
            
            // Изменяем цвет каждой иконки
            icons.forEach(icon => {
                try {
                    // Для ионных иконок
                    if (icon.tagName.toLowerCase() === 'ion-icon') {
                        icon.style.color = config.iconColor;
                        icon.style.setProperty('--ionicon-stroke-width', '32px', 'important');
                    } 
                    // Для material иконок
                    else if (icon.tagName.toLowerCase() === 'mat-icon') {
                        icon.style.color = config.iconColor;
                    } 
                    // Для других типов иконок
                    else {
                        icon.style.fill = config.iconColor;
                        icon.style.color = config.iconColor;
                    }
                    
                    log(`Изменена иконка: ${icon.tagName} (${icon.className})`);
                } catch (e) {
                    log(`Ошибка при обработке иконки: ${e}`);
                }
            });
            
            // Также меняем цвет SVG иконок
            const svgIcons = document.querySelectorAll('svg');
            svgIcons.forEach(svg => {
                svg.style.fill = config.iconColor;
                svg.style.color = config.iconColor;
            });
            
        } catch (e) {
            log(`Ошибка в основном обработчике: ${e}`);
        }
    }

    // Функция для наблюдения за изменениями DOM
    function observeDOM() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length) {
                    applyIconColors();
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Инициализация плагина
    function initPlugin() {
        log('Плагин инициализирован');
        
        // Применяем цвета сразу после загрузки
        applyIconColors();
        
        // Начинаем наблюдение за изменениями DOM
        observeDOM();
        
        // Также применяем цвета периодически на случай динамической загрузки
        setInterval(applyIconColors, 3000);
    }

    // Запускаем плагин после полной загрузки страницы
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(initPlugin, 100);
    } else {
        document.addEventListener('DOMContentLoaded', initPlugin);
    }
})();
