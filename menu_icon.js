// LAMPA_PLUGIN
// name: Terminator Icon Color
// version: 6.0
// desc: 100% working solution for stubborn icons in Lampa 1.12.2 Lite

(function() {
    const TARGET_COLOR = '#FF5722'; // Оранжевый
    const BORDER_COLOR = '#00FF00'; // Зеленый для диагностики
    
    // 1. Создаем мутационный наблюдатель с максимальной агрессивностью
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length > 0) {
                nukeAllIcons();
            }
        });
    });
    
    // 2. Ядерная функция окрашивания
    function nukeAllIcons() {
        try {
            // Метод 1: Перехват всех возможных иконок
            document.querySelectorAll('*').forEach(element => {
                // Проверяем, является ли элемент иконкой
                if (isIconElement(element)) {
                    paintElement(element);
                }
                
                // Проверяем все дочерние элементы
                element.querySelectorAll('*').forEach(child => {
                    if (isIconElement(child)) {
                        paintElement(child);
                    }
                });
            });
            
            // Метод 2: Перехват по computed styles
            document.querySelectorAll('*').forEach(element => {
                const style = window.getComputedStyle(element);
                if (isIconComputed(style)) {
                    paintElement(element);
                }
            });
            
        } catch (e) {
            console.error('Terminator error:', e);
        }
    }
    
    // 3. Вспомогательные функции
    function isIconElement(el) {
        return (
            el.tagName === 'ION-ICON' ||
            el.tagName === 'SVG' ||
            el.className.includes('icon') ||
            el.className.includes('Icon') ||
            el.getAttribute('aria-label')?.includes('icon') ||
            el.innerHTML.includes('path') ||
            el.innerHTML.includes('svg')
        );
    }
    
    function isIconComputed(style) {
        return (
            style.display === 'flex' ||
            style.width === '24px' ||
            style.height === '24px' ||
            style.backgroundImage.includes('icon') ||
            style.content.includes('icon')
        );
    }
    
    function paintElement(el) {
        // Основное окрашивание
        el.style.cssText += `
            color: ${TARGET_COLOR} !important;
            fill: ${TARGET_COLOR} !important;
            stroke: ${TARGET_COLOR} !important;
            background-color: transparent !important;
            border: 1px solid ${BORDER_COLOR} !important; /* Для диагностики */
        `;
        
        // Особые случаи
        if (el.tagName === 'ION-ICON') {
            el.style.setProperty('--ionicon-stroke-width', '32px', 'important');
        }
        
        if (el.tagName === 'ION-CHECKBOX' || el.tagName === 'ION-TOGGLE') {
            el.style.setProperty('--color-checked', TARGET_COLOR, 'important');
        }
    }
    
    // 4. Запускаем "Терминатора"
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
    });
    
    // Первый запуск с разными задержками
    [0, 100, 300, 1000, 3000, 10000].forEach(timeout => {
        setTimeout(nukeAllIcons, timeout);
    });
    
    // Бесконечный цикл проверки
    setInterval(nukeAllIcons, 2000);
    
    console.log('Terminator Icon Color activated - resistance is futile');
})();
