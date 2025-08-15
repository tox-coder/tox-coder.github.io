// LAMPA_PLUGIN
// name: SVG Icon Colorizer
// version: 1.0
// desc: Beautiful SVG icons for Lampa 1.12.2 Lite

(function() {
    const TARGET_COLOR = '#FF5722'; // Оранжевый
    const DELAY = 2000; // Ждем полной загрузки

    function recolorSVGIcons() {
        try {
            // 1. Находим все SVG-иконки
            document.querySelectorAll('svg').forEach(svg => {
                // 2. Меняем цвет всех путей внутри SVG
                svg.querySelectorAll('path').forEach(path => {
                    if (!path.getAttribute('fill') || path.getAttribute('fill') !== 'none') {
                        path.setAttribute('fill', TARGET_COLOR);
                    }
                });
                
                // 3. Меняем цвет обводки (если есть)
                svg.querySelectorAll('path[stroke]').forEach(path => {
                    path.setAttribute('stroke', TARGET_COLOR);
                });
            });

            // 4. Для ионных иконок (если они все же используются)
            document.querySelectorAll('ion-icon').forEach(icon => {
                icon.style.cssText = `
                    color: ${TARGET_COLOR};
                    --ionicon-stroke-width: 32px;
                `;
            });
        } catch (e) {
            console.log('SVG Color Changer error:', e);
        }
    }

    // Запускаем с задержкой
    setTimeout(recolorSVGIcons, DELAY);
    
    // Повторяем через 5 секунд на случай динамической загрузки
    setTimeout(recolorSVGIcons, DELAY + 3000);
    
    console.log('SVG Icon Colorizer activated');
})();
