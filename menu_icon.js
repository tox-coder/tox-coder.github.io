// LAMPA_PLUGIN
// name: Settings Icons Color
// version: 1.2
// desc: Changes color only for settings menu icons

(function() {
    const TARGET_COLOR = '#11de02'; // цвет
    const DELAYS = [0, 500, 1000, 2000]; // Задержки для обработки
    
    function applyColor() {
        try {
            // Основные селекторы для меню настроек Lampa
            const selectors = [
                'div.sidebar ion-icon',       // Стандартный сайдбар
                'div.menu-content ion-icon',  // Контент меню
                'div.settings-list ion-icon',// Список настроек
                'ion-item ion-icon',          // Элементы меню
                'div[class*="menu"] ion-icon',// Любые элементы с "menu" в классе
                'div[class*="settings"] ion-icon' // Элементы с "settings"
            ];
            
            selectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(icon => {
                    icon.style.cssText += `
                        color: ${TARGET_COLOR} !important;
                        --ionicon-stroke-width: 32px !important;
                    `;
                });
            });
            
            // Дополнительно для SVG иконок
            document.querySelectorAll('div.menu svg, div.settings svg').forEach(svg => {
                svg.style.cssText += `
                    fill: ${TARGET_COLOR} !important;
                    color: ${TARGET_COLOR} !important;
                `;
            });
            
        } catch (e) {
            console.error('Lampa Icon Color Error:', e);
        }
    }
    
    // Многократное применение с разными задержками
    DELAYS.forEach(delay => setTimeout(applyColor, delay));
    
    // Наблюдатель за динамическими изменениями
    new MutationObserver(() => {
        setTimeout(applyColor, 300);
    }).observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Инициализация при полной загрузке
    if (document.readyState === 'complete') {
        applyColor();
    } else {
        window.addEventListener('load', applyColor);
        document.addEventListener('DOMContentLoaded', applyColor);
    }
})();
