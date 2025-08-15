// LAMPA_PLUGIN
// name: Ultimate Icon Color
// version: 3.0
// desc: Forces color on all settings icons

(function() {
    const TARGET_COLOR = '#11de02'; // Ярко-зеленый
    const CHECK_INTERVAL = 1000; // Проверка каждую секунду
    
    // 1. Инъекция CSS с максимальным приоритетом
    const style = document.createElement('style');
    style.textContent = `
        /* Базовые иконки */
        ion-icon.settings-icon,
        ion-icon[class*="setting"],
        .settings-menu ion-icon,
        .settings-content ion-icon,
        .settings-item ion-icon,
        ion-menu ion-icon {
            color: ${TARGET_COLOR} !important;
            fill: ${TARGET_COLOR} !important;
            --ionicon-stroke-width: 32px !important;
        }
        
        /* Специальные элементы */
        ion-checkbox, ion-toggle {
            --color-checked: ${TARGET_COLOR} !important;
        }
        
        /* SVG иконки */
        .settings-menu svg,
        .settings-content svg {
            fill: ${TARGET_COLOR} !important;
            color: ${TARGET_COLOR} !important;
        }
    `;
    document.head.appendChild(style);
    
    // 2. Агрессивный обработчик
    function forceColor() {
        // Обычные иконки
        document.querySelectorAll('ion-icon').forEach(icon => {
            if (icon.closest('.settings-menu, .settings-content, [class*="setting"], ion-menu')) {
                icon.style.cssText = `
                    color: ${TARGET_COLOR} !important;
                    fill: ${TARGET_COLOR} !important;
                    --ionicon-stroke-width: 32px !important;
                `;
            }
        });
        
        // SVG элементы
        document.querySelectorAll('svg').forEach(svg => {
            if (svg.closest('[class*="setting"]')) {
                svg.style.cssText = `
                    fill: ${TARGET_COLOR} !important;
                    color: ${TARGET_COLOR} !important;
                `;
            }
        });
        
        // Чекбоксы и переключатели
        document.querySelectorAll('ion-checkbox, ion-toggle').forEach(el => {
            if (el.closest('[class*="setting"]')) {
                el.style.setProperty('--color-checked', TARGET_COLOR, 'important');
            }
        });
    }
    
    // 3. Запускаем постоянную проверку
    const intervalId = setInterval(forceColor, CHECK_INTERVAL);
    
    // Первое применение
    setTimeout(forceColor, 300);
    setTimeout(forceColor, 1000);
    setTimeout(forceColor, 3000);
    
    // Очистка при разгрузке страницы (опционально)
    window.addEventListener('unload', () => {
        clearInterval(intervalId);
    });
    
    console.log('Ultimate Icon Color applied!');
})();
