(function () {
    'use strict';

    function applyCustomIcons() {
        const icons = {
            'Синхронизация': `<svg width="20" height="20" fill="#4CAF50" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a8 8 0 1 0 8 8h-2a6 6 0 1 1-6-6V2z"/></svg>`,
            'Интерфейс': `<svg width="20" height="20" fill="#2196F3" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="14" height="2"/><rect x="3" y="9" width="14" height="2"/><rect x="3" y="14" width="14" height="2"/></svg>`,
            'Плеер': `<svg width="20" height="20" fill="#FF9800" xmlns="http://www.w3.org/2000/svg"><polygon points="6,4 18,10 6,16"/></svg>`,
            'Парсер': `<svg width="20" height="20" fill="#3F51B5" xmlns="http://www.w3.org/2000/svg"><path d="M10 2l6 6-6 6-6-6 6-6z"/></svg>`,
            'TorrServer': `<svg width="20" height="20" fill="#00C853" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="8"/></svg>`,
            'TMDB': `<svg width="20" height="20" fill="#00BCD4" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="14" height="14" rx="2"/></svg>`,
            'Плагины': `<svg width="20" height="20" fill="#E91E63" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a3 3 0 0 1 3 3h3v3a3 3 0 0 1 0 6v3h-3a3 3 0 0 1-6 0H4v-3a3 3 0 0 1 0-6V5h3a3 3 0 0 1 3-3z"/></svg>`
        };

        document.querySelectorAll('.settings-item').forEach(item => {
            const label = item.textContent.trim();
            if (icons[label]) {
                let iconContainer = item.querySelector('.settings-item__icon');
                if (iconContainer) {
                    iconContainer.innerHTML = icons[label]; // повністю замінюємо іконку
                }
            }
        });
    }

    function waitForSettings() {
        const interval = setInterval(() => {
            if (document.querySelector('.settings-item')) {
                clearInterval(interval);
                applyCustomIcons();
            }
        }, 500);
    }

    waitForSettings();
})();
