// LAMPA_PLUGIN
// name: Guaranteed Settings Icons
// version: 2.0
// desc: 100% working settings icons color

(function() {
    const COLOR = '#FF5722'; // Оранжевый
    const OBSERVE_INTERVAL = 2000; // Проверка каждые 2 сек
    
    // Создаем стиль в head документа
    const style = document.createElement('style');
    style.id = 'lampa-icons-css';
    style.textContent = `
        /* Основные иконки настроек */
        div.settings-list ion-icon,
        div.settings-content ion-icon,
        div.settings-item ion-icon,
        ion-menu[side="end"] ion-icon,
        ion-item.setting-item ion-icon {
            color: ${COLOR} !important;
            --ionicon-stroke-width: 32px !important;
        }
        
        /* Чекбоксы и переключатели */
        ion-checkbox.setting-item, 
        ion-toggle.setting-item {
            --color-checked: ${COLOR} !important;
        }
    `;
    document.head.appendChild(style);
    
    // Постоянный наблюдатель
    const observer = new MutationObserver(() => {
        document.querySelectorAll('ion-icon').forEach(icon => {
            if (icon.closest('.settings-list, .settings-content, [class*="setting"]')) {
                icon.style.cssText = `
                    color: ${COLOR} !important;
                    --ionicon-stroke-width: 32px !important;
                `;
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Запускаем постоянную проверку
    setInterval(() => {
        document.querySelectorAll('div[class*="setting"] ion-icon').forEach(icon => {
            if (window.getComputedStyle(icon).color !== COLOR) {
                icon.style.cssText = `
                    color: ${COLOR} !important;
                    --ionicon-stroke-width: 32px !important;
                `;
            }
        });
    }, OBSERVE_INTERVAL);
    
    console.log('Lampa Settings Icons Color applied');
})();
