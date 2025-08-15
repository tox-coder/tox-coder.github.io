// LAMPA_PLUGIN
// name: Settings Icons Fix
// version: 3.1
// desc: Precise coloring for your Lampa version

(function() {
    const ACTIVE_COLOR = '#4CAF50'; // Зеленый
    const INACTIVE_COLOR = '#FF5722'; // Оранжевый
    const CHECK_DELAY = 500; // Проверка каждые 0.5 сек

    function colorizeSettingsIcons() {
        // 1. Окрашиваем все иконки в настройках
        const allSettingIcons = document.querySelectorAll(`
            div.settings-menu ion-icon,
            div.settings-content ion-icon,
            div.settings-item ion-icon,
            ion-item.item-setting ion-icon
        `);
        
        allSettingIcons.forEach((icon, index) => {
            // Четные - зеленые, нечетные - оранжевые
            const color = index % 2 === 0 ? ACTIVE_COLOR : INACTIVE_COLOR;
            icon.style.cssText = `
                color: ${color} !important;
                --ionicon-stroke-width: 32px !important;
                opacity: 1 !important;
            `;
        });

        // 2. Особые элементы (чекбоксы)
        document.querySelectorAll(`
            ion-checkbox.setting-item,
            ion-toggle.setting-item
        `).forEach(el => {
            el.style.setProperty('--color-checked', ACTIVE_COLOR, 'important');
        });
    }

    // Запускаем с интервалом
    const interval = setInterval(colorizeSettingsIcons, CHECK_DELAY);
    
    // Первое применение
    setTimeout(colorizeSettingsIcons, 300);
    setTimeout(colorizeSettingsIcons, 1500);

    // Очистка при закрытии
    window.addEventListener('unload', () => clearInterval(interval));
})();
