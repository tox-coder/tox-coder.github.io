(function () {
    function replaceIcons() {
        let items = document.querySelectorAll('.settings-item__icon');

        if (items.length) {
            // Інтерфейс
            items[0].innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="#3FA9F5"><path d="M3 4h18v2H3V4zm0 6h18v2H3v-2zm0 6h12v2H3v-2z"/></svg>';
            // Плеєр
            items[1].innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="#FF6600"><path d="M8 5v14l11-7z"/></svg>';
            // Парсер
            items[2].innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="#0066FF"><path d="M10 2v20l10-10L10 2z"/></svg>';
            // Інше
            items[3].innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="#00CCCC"><path d="M12 8a4 4 0 100 8 4 4 0 000-8zm8.94 3h-2.122a6.978 6.978 0 00-1.414-3.414l1.5-1.5A9.969 9.969 0 0120.94 11zM12 4c1.657 0 3.156.672 4.243 1.757l-1.5 1.5A6.978 6.978 0 0012 6c-3.866 0-7 3.134-7 7 0 1.657.672 3.156 1.757 4.243l-1.5 1.5A9.969 9.969 0 014 13c0-4.971 4.029-9 9-9z"/></svg>';
            // Додатки
            items[4].innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="#FF0000"><path d="M4 4h16v16H4z"/></svg>';
            // Бекап
            items[5].innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="#0055FF"><path d="M12 4v4l4-4-4-4v4zM4 12l4-4v8l-4-4zm16 0l-4 4V8l4 4zm-8 8v-4l-4 4 4 4v-4z"/></svg>';
            // Підбірки
            items[6].innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="#FF6600"><path d="M20 17H4V5h16v12zm0-14H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>';
        }
    }

    Lampa.Listener.follow('app', function (e) {
        if (e.type === 'ready') {
            setTimeout(replaceIcons, 1000);
        }
    });
})();
