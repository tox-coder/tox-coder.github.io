// LAMPA_PLUGIN
// name: Ultimate Icon Color Fix
// version: 4.0
// desc: 100% working color solution for Lampa Lite 1.12.2

(function() {
    const TARGET_COLOR = '#00FF00'; // Ярко-зеленый цвет
    const CHECK_INTERVAL = 1000; // Проверка каждую секунду
    
    // 1. Создаем стиль с максимальным приоритетом
    const style = document.createElement('style');
    style.id = 'lampa-icons-force-color';
    style.textContent = `
        /* Основные иконки */
        ion-icon {
            color: ${TARGET_COLOR} !important;
            --ionicon-stroke-width: 32px !important;
            fill: ${TARGET_COLOR} !important;
        }
        
        /* Чекбоксы и переключатели */
        ion-checkbox, ion-toggle {
            --color-checked: ${TARGET_COLOR} !important;
            --color: ${TARGET_COLOR} !important;
        }
        
        /* SVG элементы */
        svg {
            fill: ${TARGET_COLOR} !important;
            color: ${TARGET_COLOR} !important;
        }
        
        /* Особые случаи */
        .icon, .material-icons {
            color: ${TARGET_COLOR} !important;
        }
    `;
    document.head.appendChild(style);
    
    // 2. Функция принудительного окрашивания
    function forceIconColors() {
        // Обрабатываем все возможные элементы
        const elements = [
            ...document.querySelectorAll('ion-icon'),
            ...document.querySelectorAll('svg'),
            ...document.querySelectorAll('.icon'),
            ...document.querySelectorAll('.material-icons'),
            ...document.querySelectorAll('ion-checkbox, ion-toggle')
        ];
        
        elements.forEach(el => {
            try {
                // Для ионных иконок
                if(el.tagName === 'ION-ICON') {
                    el.style.cssText = `
                        color: ${TARGET_COLOR} !important;
                        --ionicon-stroke-width: 32px !important;
                    `;
                } 
                // Для SVG
                else if(el.tagName === 'SVG') {
                    el.style.cssText = `
                        fill: ${TARGET_COLOR} !important;
                        color: ${TARGET_COLOR} !important;
                    `;
                }
                // Для чекбоксов
                else if(el.tagName === 'ION-CHECKBOX' || el.tagName === 'ION-TOGGLE') {
                    el.style.cssText = `
                        --color-checked: ${TARGET_COLOR} !important;
                        --color: ${TARGET_COLOR} !important;
                    `;
                }
                // Для других элементов
                else {
                    el.style.cssText = `
                        color: ${TARGET_COLOR} !important;
                    `;
                }
            } catch(e) {}
        });
    }
    
    // 3. Запускаем постоянную проверку
    const intervalId = setInterval(forceIconColors, CHECK_INTERVAL);
    
    // Первые применения с разными задержками
    [0, 300, 1000, 3000].forEach(t => setTimeout(forceIconColors, t));
    
    // Очистка при разгрузке страницы
    window.addEventListener('unload', () => {
        clearInterval(intervalId);
    });
    
    console.log('Ultimate Icon Color activated for Lampa Lite 1.12.2');
})();
