// LAMPA_PLUGIN
// name: Lampa 1.12.2 Icon Color Fix
// version: 7.0
// desc: Precise icon coloring for Lampa 1.12.2 Lite

(function() {
    const ICON_COLOR = '#FF5722'; // Оранжевый
    const CHECK_INTERVAL = 1000; // Проверка каждую секунду
    
    // 1. Точечные селекторы для Lampa 1.12.2 Lite
    const ICON_SELECTORS = [
        'ion-icon.md',                  // Material Design иконки
        'ion-icon.ios',                 // iOS стиль
        'ion-icon[name^="md-"]',        // Ионные иконки MD
        'ion-icon[name^="ios-"]',       // Ионные иконки iOS
        '.tab-button-icon',             // Иконки вкладок
        '.menu-item-icon',              // Иконки меню
        '.settings-item-icon',          // Иконки настроек
        'ion-item.item ion-icon',       // Иконки в пунктах меню
        'ion-checkbox, ion-toggle'      // Чекбоксы
    ];
    
    // 2. Функция точного окрашивания
    function colorizeRealIcons() {
        ICON_SELECTORS.forEach(selector => {
            document.querySelectorAll(selector).forEach(icon => {
                // Для ионных иконок
                if(icon.tagName === 'ION-ICON') {
                    icon.style.cssText = `
                        color: ${ICON_COLOR} !important;
                        --ionicon-stroke-width: 32px !important;
                        fill: ${ICON_COLOR} !important;
                    `;
                } 
                // Для чекбоксов
                else if(icon.tagName === 'ION-CHECKBOX' || icon.tagName === 'ION-TOGGLE') {
                    icon.style.cssText = `
                        --color-checked: ${ICON_COLOR} !important;
                        --color: ${ICON_COLOR} !important;
                    `;
                }
            });
        });
        
        // 3. Специальная обработка SVG внутри иконок
        document.querySelectorAll('ion-icon svg').forEach(svg => {
            svg.style.cssText = `
                fill: ${ICON_COLOR} !important;
                color: ${ICON_COLOR} !important;
            `;
        });
    }
    
    // 4. Запускаем с оптимальными задержками
    const delays = [0, 300, 800, 1500, 3000, 5000];
    delays.forEach(delay => setTimeout(colorizeRealIcons, delay));
    
    // 5. Постоянный наблюдатель
    const observer = new MutationObserver(colorizeRealIcons);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    console.log('Lampa 1.12.2 Icon Color activated');
})();
