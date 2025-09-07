(function () {
    function replaceIcons() {
        let items = document.querySelectorAll('.settings-item__icon');

        if (items.length) {
            function setIcon(item, svg) {
                if (item) {
                    item.removeAttribute("class"); // прибираємо старий клас
                    item.innerHTML = svg;          // вставляємо свій SVG
                }
            }

            // Інтерфейс
            setIcon(items[0], '<svg width="22" height="22" viewBox="0 0 24 24" fill="#3FA9F5"><path d="M3 4h18v2H3V4zm0 6h18v2H3v-2zm0 6h12v2H3v-2z"/></svg>');
            // Плеєр
            setIcon(items[1], '<svg width="22" height="22" viewBox="0 0 24 24" fill="#FF6600"><path d="M8 5v14l11-7z"/></svg>');
            // Парсер
            setIcon(items[2], '<svg width="22" height="22" viewBox="0 0 24 24" fill="#0066FF"><path d="M10 2v20l10-10L10 2z"/></svg>');
            // Інше
            setIcon(items[3], '<svg width="22" height="22" viewBox="0 0 24 24" fill="#00CCCC"><path d="M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>');
            // Додатки
            setIcon(items[4], '<svg width="22" height="22" viewBox="0 0 24 24" fill="#FF0000"><path d="M4 4h16v16H4z"/></svg>');
            // Бекап
            setIcon(items[5], '<svg width="22" height="22" viewBox="0 0 24 24" fill="#0055FF"><path d="M12 4v4l4-4-4-4v4zM4 12l4-4v8l-4-4zm16 0l-4 4V8l4 4zm-8 8v-4l-4 4 4 4v-4z"/></svg>');
            // Підбірки
            setIcon(items[6], '<svg width="22" height="22" viewBox="0 0 24 24" fill="#FF6600"><path d="M20 17H4V5h16v12z"/></svg>');
        }
    }

    // Виконуємо заміну після завантаження інтерфейсу
    Lampa.Listener.follow('app', function (e) {
        if (e.type === 'ready') {
            setTimeout(replaceIcons, 1500);
        }
    });
})();
