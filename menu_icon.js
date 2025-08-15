// LAMPA_PLUGIN
// name: SVG Icon Theme
// version: 1.1
// desc: Custom SVG icons for Lampa Android (аналогично PC-версии)

(function() {
    const ICON_COLOR = '#FF5722'; // Оранжевый
    const SECONDARY_COLOR = '#4CAF50'; // Зеленый для второстепенных иконок
    const UPDATE_INTERVAL = 1500; // Проверка каждые 1.5 сек

    function customizeIcons() {
        // 1. Основные иконки настроек (SVG)
        document.querySelectorAll('.settings-menu svg, .settings-item svg').forEach(svg => {
            // Изменяем цвет всех путей, кроме специальных случаев
            svg.querySelectorAll('path').forEach(path => {
                const currentFill = path.getAttribute('fill');
                if (currentFill && currentFill !== 'none') {
                    path.setAttribute('fill', ICON_COLOR);
                }
            });
            
            // Для иконок с обводкой
            svg.querySelectorAll('[stroke]').forEach(el => {
                el.setAttribute('stroke', ICON_COLOR);
            });
        });

        // 2. Чекбоксы (специальная обработка)
        document.querySelectorAll('.settings-item ion-checkbox').forEach(checkbox => {
            checkbox.style.setProperty('--color-checked', SECONDARY_COLOR, 'important');
        });

        // 3. Дополнительные иконки (если есть)
        const extraIcons = document.querySelectorAll('.settings-footer svg, .settings-header svg');
        if (extraIcons.length > 0) {
            extraIcons.forEach(svg => {
                svg.style.fill = SECONDARY_COLOR;
            });
        }
    }

    // Запускаем с интервалами
    [0, 1000, 3000, 5000].forEach(timeout => {
        setTimeout(customizeIcons, timeout);
    });

    // Постоянное обновление для динамического контента
    const observer = new MutationObserver(customizeIcons);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    console.log('SVG Icon Theme applied!');
})();
