// LAMPA_PLUGIN
// name: Final Icon Color Attempt
// version: 1.0
// desc: Last try for Lampa 1.12.2 Lite

(function() {
    const COLOR = '#FF5722'; // Оранжевый
    
    function tryColorize() {
        // 1. Попробуем найти конкретные иконки в настройках
        const settingItems = document.querySelectorAll('.settings-item, .menu-item');
        
        settingItems.forEach(item => {
            // Иконка обычно находится в первом дочернем элементе
            const icon = item.querySelector('*:first-child');
            
            if (icon) {
                // Пробуем разные методы
                icon.style.color = COLOR;
                icon.style.fill = COLOR;
                
                // Для SVG
                if (icon.querySelector('path')) {
                    icon.querySelector('path').setAttribute('fill', COLOR);
                }
            }
        });
    }

    // Пробуем несколько раз с интервалами
    [1000, 3000, 5000, 10000].forEach(timeout => {
        setTimeout(tryColorize, timeout);
    });
})();
