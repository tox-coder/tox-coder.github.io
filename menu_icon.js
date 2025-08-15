// LAMPA_PLUGIN
// name: Exact Settings Icons Color
// version: 1.4
// desc: Precise color change only for settings icons

(function() {
    const SETTINGS_COLOR = '#FF5722'; // Оранжевый
    const DELAYS = [0, 800, 1500]; // Оптимальные задержки
    
    function applyExactColors() {
        try {
            // 1. Точечные селекторы для настроек (основные пункты)
            const exactSettingsSelectors = [
                'div.settings-item ion-icon', // Основные пункты
                'div.settings-option ion-icon', // Опции
                'div.menu-settings ion-icon', // Контейнер настроек
                'ion-item.setting-item ion-icon' // Элементы настроек
            ];
            
            // 2. Общие селекторы (резервные)
            const fallbackSelectors = [
                'ion-menu[side="end"] ion-icon', // Правое меню
                'div[class*="setting"] ion-icon' // Любые элементы с "setting"
            ];
            
            // Сначала применяем точные селекторы
            let found = false;
            exactSettingsSelectors.forEach(selector => {
                const icons = document.querySelectorAll(selector);
                if (icons.length > 0) found = true;
                
                icons.forEach(icon => {
                    icon.style.cssText += `
                        color: ${SETTINGS_COLOR} !important;
                        --ionicon-stroke-width: 32px !important;
                    `;
                });
            });
            
            // Если точные не сработали, применяем резервные
            if (!found) {
                fallbackSelectors.forEach(selector => {
                    document.querySelectorAll(selector).forEach(icon => {
                        icon.style.cssText += `
                            color: ${SETTINGS_COLOR} !important;
                        `;
                    });
                });
            }
            
            // Специально для иконок checkbox/radio
            document.querySelectorAll('ion-checkbox, ion-radio').forEach(el => {
                el.style.setProperty('--color-checked', SETTINGS_COLOR, 'important');
            });
            
        } catch (e) {
            console.error('Settings Icons Color Error:', e);
        }
    }
    
    // Запуск с оптимальными задержками
    DELAYS.forEach(delay => setTimeout(applyExactColors, delay));
    
    // Наблюдатель с фильтрацией
    new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                setTimeout(applyExactColors, 300);
            }
        });
    }).observe(document.body, { childList: true, subtree: true });
    
    // Инициализация
    const init = () => {
        if (document.querySelector('ion-menu')) {
            applyExactColors();
        } else {
            setTimeout(init, 300);
        }
    };
    
    if (document.readyState === 'complete') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
        window.addEventListener('load', init);
    }
})();
