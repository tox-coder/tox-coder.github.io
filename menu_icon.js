// LAMPA_PLUGIN
// name: 100% Icon Color Fix
// version: 8.0
// desc: Ultimate solution for Lampa 1.12.2 Lite icons

(function() {
    const TARGET_COLOR = '#FF5722'; // Оранжевый
    const CHECK_DELAY = 800; // Частота проверки (мс)

    // 1. Инъекция CSS с максимальным приоритетом
    const style = document.createElement('style');
    style.textContent = `
        /* Базовые иконки */
        ion-icon, .icon, [class*="icon"], [class*="Icon"] {
            color: ${TARGET_COLOR} !important;
            fill: ${TARGET_COLOR} !important;
            --ionicon-stroke-width: 32px !important;
            background-image: none !important; /* Убираем фоновые иконки */
        }

        /* Чекбоксы и переключатели */
        ion-checkbox, ion-toggle {
            --color-checked: ${TARGET_COLOR} !important;
            --color: ${TARGET_COLOR} !important;
        }

        /* SVG (на случай, если иконки рендерятся через SVG) */
        svg, svg path {
            fill: ${TARGET_COLOR} !important;
            stroke: ${TARGET_COLOR} !important;
        }
    `;
    document.head.appendChild(style);

    // 2. Атомарная функция перекрашивания
    function forceIconColor() {
        // Обрабатываем ВСЕ элементы, похожие на иконки
        document.querySelectorAll('*').forEach(element => {
            const tag = element.tagName.toLowerCase();
            const isIcon = 
                tag === 'ion-icon' || 
                tag === 'svg' ||
                element.className.includes('icon') || 
                element.getAttribute('aria-label')?.includes('icon');

            if (isIcon) {
                // Для ионных иконок
                if (tag === 'ion-icon') {
                    element.style.cssText = `
                        color: ${TARGET_COLOR} !important;
                        fill: ${TARGET_COLOR} !important;
                        --ionicon-stroke-width: 32px !important;
                    `;
                } 
                // Для SVG
                else if (tag === 'svg') {
                    element.style.cssText = `
                        fill: ${TARGET_COLOR} !important;
                        stroke: ${TARGET_COLOR} !important;
                    `;
                }
                // Для других элементов (на случай кастомных иконок)
                else {
                    element.style.cssText = `
                        color: ${TARGET_COLOR} !important;
                        background-image: none !important;
                    `;
                }
            }
        });
    }

    // 3. Запускаем "атомную" проверку
    const intervals = [0, 300, 800, 1500, 3000, 5000];
    intervals.forEach(timeout => setTimeout(forceIconColor, timeout));

    // 4. Постоянный наблюдатель
    const observer = new MutationObserver(forceIconColor);
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
    });

    console.log('[100% Icon Color] Активирован!');
})();
