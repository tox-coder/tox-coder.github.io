// LAMPA_PLUGIN
// name: Settings Icons Nuclear Fix
// version: 5.0
// desc: Ultimate solution for settings icons in Lampa 1.12.2 Lite

(function() {
    const SETTINGS_COLOR = '#FF5722'; // Оранжевый
    const UPDATE_INTERVAL = 800; // Частота обновления в ms
    
    // 1. Атомарная функция окрашивания
    function nuclearPaint() {
        // Селекторы-кандидаты для меню настроек
        const suspects = [
            'ion-menu ion-icon',
            'div.settings-panel ion-icon',
            'div.left-panel ion-icon',
            'div.menu-section ion-icon',
            'ion-item.setting-item ion-icon'
        ];
        
        // Ядерный подход: красим ВСЕ иконки в родительских контейнерах настроек
        document.querySelectorAll('div, section, ion-menu').forEach(container => {
            if(
                container.className.includes('settings') || 
                container.className.includes('menu') ||
                container.getAttribute('side') === 'start'
            ) {
                container.querySelectorAll('ion-icon').forEach(icon => {
                    icon.style.cssText = `
                        color: ${SETTINGS_COLOR} !important;
                        --ionicon-stroke-width: 32px !important;
                        fill: ${SETTINGS_COLOR} !important;
                    `;
                    
                    // Для вложенных SVG
                    icon.querySelectorAll('svg').forEach(svg => {
                        svg.style.cssText = `
                            fill: ${SETTINGS_COLOR} !important;
                            color: ${SETTINGS_COLOR} !important;
                        `;
                    });
                });
            }
        });
        
        // Особое лечение для чекбоксов
        document.querySelectorAll('ion-checkbox, ion-toggle').forEach(el => {
            if(el.closest('ion-item.setting-item')) {
                el.style.cssText = `
                    --color-checked: ${SETTINGS_COLOR} !important;
                    --color: ${SETTINGS_COLOR} !important;
                `;
            }
        });
    }
    
    // 2. Режим осады (постоянное применение)
    const siegeIntervals = [0, 300, 800, 1500, 3000, 5000, 10000];
    siegeIntervals.forEach(t => setTimeout(nuclearPaint, t));
    
    const siegeEngine = setInterval(nuclearPaint, UPDATE_INTERVAL);
    
    // 3. CSS-бомбардировка
    const style = document.createElement('style');
    style.id = 'lampa-nuclear-styles';
    style.textContent = `
        /* Прицельный ядерный удар по настройкам */
        ion-menu[side="start"] ion-icon,
        div[class*="settings"] ion-icon,
        div[class*="menu"]:not(.main-menu) ion-icon,
        ion-item[class*="setting"] ion-icon {
            color: ${SETTINGS_COLOR} !important;
            fill: ${SETTINGS_COLOR} !important;
            --ionicon-stroke-width: 32px !important;
        }
        
        /* Диверсия против чекбоксов */
        ion-item.setting-item ion-checkbox {
            --color-checked: ${SETTINGS_COLOR} !important;
        }
    `;
    document.head.appendChild(style);
    
    // 4. Контрольный выстрел через 15 секунд
    setTimeout(() => {
        document.querySelectorAll('ion-icon').forEach(icon => {
            if(!icon.style.color.includes(SETTINGS_COLOR)) {
                icon.style.color = `${SETTINGS_COLOR} !important`;
            }
        });
    }, 15000);
    
    console.log('Nuclear Settings Icons activated');
})();
