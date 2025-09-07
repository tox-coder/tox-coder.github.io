(function () {
    function replaceIcons() {
        let items = document.querySelectorAll('.settings-item');

        if (items.length) {
            function setIcon(item, svg) {
                if (item && !item.querySelector('.custom-icon')) {
                    let oldIcon = item.querySelector('.settings-item__icon, i, span');
                    if (oldIcon) oldIcon.style.display = "none"; // ховаємо стандартну іконку

                    let svgWrap = document.createElement("span");
                    svgWrap.classList.add("custom-icon");
                    svgWrap.style.marginRight = "8px";
                    svgWrap.innerHTML = svg;
                    item.prepend(svgWrap); // вставляємо перед текстом
                }
            }

            setIcon(items[0], '<svg width="22" height="22" viewBox="0 0 24 24" fill="#3FA9F5"><path d="M3 4h18v2H3V4zm0 6h18v2H3v-2zm0 6h12v2H3v-2z"/></svg>'); // Інтерфейс
            setIcon(items[1], '<svg width="22" height="22" viewBox="0 0 24 24" fill="#FF6600"><path d="M8 5v14l11-7z"/></svg>'); // Плеєр
            setIcon(items[2], '<svg width="22" height="22" viewBox="0 0 24 24" fill="#0066FF"><path d="M10 2v20l10-10L10 2z"/></svg>'); // Парсер
            setIcon(items[3], '<svg width="22" height="22" viewBox="0 0 24 24" fill="#00CCCC"><path d="M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>'); // Інше
            setIcon(items[4], '<svg width="22" height="22" viewBox="0 0 24 24" fill="#FF0000"><path d="M4 4h16v16H4z"/></svg>'); // Додатки
            setIcon(items[5], '<svg width="22" height="22" viewBox="0 0 24 24" fill="#0055FF"><path d="M12 4v4l4-4-4-4v4zM4 12l4-4v8l-4-4zm16 0l-4 4V8l4 4zm-8 8v-4l-4 4 4 4v-4z"/></svg>'); // Бекап
            setIcon(items[6], '<svg width="22" height="22" viewBox="0 0 24 24" fill="#FF6600"><path d="M20 17H4V5h16v12z"/></svg>'); // Підбірки
        }
    }

    // Повторна перевірка
    const observer = new MutationObserver(() => {
        if (document.querySelector('.settings-item')) {
            replaceIcons();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    setInterval(replaceIcons, 2000);
    setTimeout(replaceIcons, 1500);
})();
