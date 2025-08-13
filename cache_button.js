(function() {
    setTimeout(function() {
        const clearBtnId = 'CLEARCACHE';

        // Видалення існуючої кнопки
        $('#' + clearBtnId).remove();

        // Додавання CSS
        if (!document.getElementById('clearcache-style')) {
            const css = `
                #${clearBtnId} svg path {
                    fill: lime !important;
                    transition: fill 0.2s ease;
                }
                #${clearBtnId}.selector:hover,
                #${clearBtnId}.selector:focus,
                #${clearBtnId}.selector:active {
                    background: white !important;
                }
                #${clearBtnId}.selector:hover svg path,
                #${clearBtnId}.selector:focus svg path,
                #${clearBtnId}.selector:active svg path {
                    fill: black !important;
                }
            `;
            const style = document.createElement('style');
            style.id = 'clearcache-style';
            style.textContent = css;
            document.head.appendChild(style);
        }

        // Додавання кнопки очищення кешу
        $('.head__actions').append(`
            <div id="${clearBtnId}" class="head__action selector m-clear-cache">
                <svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 3.1l1.4 2.2-1.6 1.1 1.3 0.3 2.8 0.6 0.6-2.7 0.4-1.4-1.8 1.1-2-3.3h-2.2l-2.6 4.3 1.7 1z"/>
                    <path d="M16 12l-2.7-4.3-1.7 1 2 3.3h-2.6v-2l-3 3 3 3v-2h3.7z"/>
                    <path d="M2.4 12v0l1.4-2.3 1.7 1.1-0.9-4.2-2.8 0.7-1.3 0.3 1.6 1-2.1 3.4 1.3 2h5.7v-2z"/>
                </svg>
            </div>
        `);

        // Обробник для кнопки очищення кешу
        $('#' + clearBtnId).on('hover:enter hover:click hover:touch', function() {
            try {
                $(this).addClass('loading');
                
                if (Lampa && Lampa.Cache && typeof Lampa.Cache.clear === 'function') {
                    Lampa.Cache.clear();
                    setTimeout(() => {
                        alert('🗑 Кеш Lampa очищено');
                        $(this).removeClass('loading');
                        setTimeout(() => location.reload(), 300);
                    }, 800);
                } else {
                    setTimeout(() => {
                        let removed = 0;
                        const keysToRemove = [];
                        for (let i = 0; i < localStorage.length; i++) {
                            const key = localStorage.key(i);
                            if (key.startsWith('card_') || key.startsWith('full_card_') || 
                                key.startsWith('lite_card_') || key.startsWith('viewed_card_') || 
                                key.startsWith('viewed_continue_') || key.startsWith('parser_') || 
                                key.startsWith('cub_') || key.startsWith('start_time_') || 
                                key.startsWith('cache_')) {
                                keysToRemove.push(key);
                            }
                        }
                        keysToRemove.forEach(key => {
                            localStorage.removeItem(key);
                            removed++;
                        });
                        alert(`🗑 Локальний кеш очищено: ${removed} ключів`);
                        $(this).removeClass('loading');
                        setTimeout(() => location.reload(), 300);
                    }, 800);
                }
            } catch (e) {
                console.error('Помилка очищення кешу:', e);
                $('#' + clearBtnId).removeClass('loading');
            }
        });

    }, 1000);
})();