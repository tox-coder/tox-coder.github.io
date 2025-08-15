// LAMPA_PLUGIN
// name: Settings Icons Fix 1.12.2
// version: 3.2
// desc: Guaranteed icon coloring for Lampa 1.12.2 Lite

(function() {
    const COLORS = {
        active: '#00FF00',   // Зеленый для включенных
        inactive: '#FF5722', // Оранжевый для выключенных
        default: '#4CAF50'  // Основной зеленый
    };

    function applyColors() {
        try {
            // 1. Основные иконки настроек
            const icons = document.querySelectorAll(`
                div.settings-list ion-icon,
                div.settings-item ion-icon,
                ion-item.item ion-icon
            `);
            
            icons.forEach((icon, index) => {
                const parent = icon.closest('ion-item');
                const isActive = parent ? parent.classList.contains('item-active') : false;
                
                icon.style.cssText = `
                    color: ${isActive ? COLORS.active : COLORS.inactive} !important;
                    --ionicon-stroke-width: 32px !important;
                    opacity: 1 !important;
                `;
            });

            // 2. Чекбоксы и переключатели
            document.querySelectorAll(`
                ion-checkbox,
                ion-toggle
            `).forEach(el => {
                el.style.setProperty('--color-checked', COLORS.default, 'important');
            });

            // 3. Специальные иконки (TMDB, TorrServer и др.)
            document.querySelectorAll(`
                div[class*="tmdb"] ion-icon,
                div[class*="torr"] ion-icon
            `).forEach(icon => {
                icon.style.cssText = `
                    color: ${COLORS.default} !important;
                    filter: none !important;
                `;
            });

        } catch (e) {
            console.error('IconColor Error:', e);
        }
    }

    // Агрессивное применение с интервалами
    const intervals = [0, 300, 800, 1500, 3000, 5000];
    intervals.forEach(t => setTimeout(applyColors, t));
    
    // Постоянный наблюдатель
    new MutationObserver(applyColors).observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true
    });

    // CSS-инъекция для сложных случаев
    const style = document.createElement('style');
    style.textContent = `
        ion-icon.settings-icon {
            color: ${COLORS.default} !important;
        }
        .settings-content svg {
            fill: ${COLORS.default} !important;
        }
    `;
    document.head.append(style);

    console.log('Lampa 1.12.2 Icons Colorer activated');
})();
