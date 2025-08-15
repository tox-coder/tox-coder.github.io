// LAMPA_PLUGIN
// name: Settings Icon Color
// version: 1.1
// desc: Changes settings menu icons color

(function() {
    const TARGET_COLOR = '#FF5722'; // Оранжевый
    const OBSERVE_DELAY = 100;
    
    function colorizeIcons() {
        // Попробуйте разные селекторы для вашей версии Lampa
        const selectors = [
            '.settings-content ion-icon',
            'ion-menu ion-icon',
            '.menu-panel .item-icon',
            'div.menu ion-icon'
        ];
        
        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(icon => {
                if (icon) {
                    icon.style.cssText += `color: ${TARGET_COLOR} !important;`;
                    icon.style.setProperty('--ionicon-stroke-width', '32px', 'important');
                }
            });
        });
    }
    
    // Многократное применение для динамического контента
    [0, 500, 1000, 2000, 5000].forEach(timeout => {
        setTimeout(colorizeIcons, timeout);
    });
    
    // Наблюдатель за изменениями DOM
    new MutationObserver(() => {
        setTimeout(colorizeIcons, OBSERVE_DELAY);
    }).observe(document.body, {
        childList: true,
        subtree: true
    });
})();
