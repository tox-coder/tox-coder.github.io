
(function(){
    // Robust Lampa settings icons replacer
    // Если ничего не происходит — включи DEBUG = true в начале этого файла, 
    // залей файл на публичный raw-хостинг (GitHub Gist raw / GitHub Pages / raw.githack / Telegram CDN) и добавь как плагин в Lampa.
    const DEBUG = false;        // Поставь true чтобы подсвечивать найденные пункты и логировать ошибки
    const MAX_TRIES = 25;       // сколько попыток (с интервалом) пробовать — увеличить при необходимости
    let tries = 0;

    const icons = [
        // Інтерфейс
        { keywords: ['Интерфейс','Інтерфейс','Interface','Интерфейс настройки','Интерфейс меню','Интерфейс приложения'],
          svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="#3FA9F5"><path d="M3 4h18v2H3V4zm0 6h18v2H3v-2zm0 6h12v2H3v-2z"/></svg>' },
        // Плеєр
        { keywords: ['Плеер','Плейер','Плеєр','Player','Проигрыватель'],
          svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="#FF6600"><path d="M8 5v14l11-7z"/></svg>' },
        // Парсер / Раздел парсеров
        { keywords: ['Парсер','Парсеры','Парсери','Parser','Парсинг'],
          svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="#0066FF"><path d="M10 2v20l10-10L10 2z"/></svg>' },
        // Інше / Опції / Додатково
        { keywords: ['Інше','Другое','Додатково','Опции','Настройки','Other'],
          svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="#00CCCC"><path d="M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>' },
        // Додатки / Расширения
        { keywords: ['Додатки','Дополнения','Плагины','Addons','Extensions'],
          svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="#FF0000"><path d="M4 4h16v16H4z"/></svg>' },
        // Резерв / Бекап
        { keywords: ['Бекап','Резерв','Backup','Резервное копирование'],
          svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="#0055FF"><path d="M12 4v4l4-4-4-4v4zM4 12l4-4v8l-4-4zm16 0l-4 4V8l4 4zm-8 8v-4l-4 4 4 4v-4z"/></svg>' },
        // Підбірки / Колекції / Подборки
        { keywords: ['Підбірки','Подборки','Коллекции','Collections'],
          svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="#FF6600"><path d="M20 17H4V5h16v12z"/></svg>' }
    ];

    function createStyles(){
        if(document.getElementById('lampa-custom-icons-style')) return;
        const style = document.createElement('style');
        style.id = 'lampa-custom-icons-style';
        style.textContent = `
            .lampa-custom-settings-icon{width:22px;height:22px;display:inline-flex;align-items:center;margin-right:12px;flex-shrink:0}
            .lampa-custom-settings-icon svg{width:22px;height:22px}
            .lampa-custom-hidden-old-icon{opacity:0!important;pointer-events:none!important;width:22px!important;height:22px!important;display:inline-block!important}
            .lampa-custom-debug{outline:2px solid rgba(0,200,0,0.6)}
        `;
        document.head.appendChild(style);
    }

    function isShortText(s){
        if(!s) return false;
        s = s.trim();
        return s.length > 0 && s.length <= 40;
    }

    function tryReplaceByLabels(){
        createStyles();
        let replaced = 0;
        // Получаем все элементы, которые содержат короткий текст
        const candidates = Array.from(document.querySelectorAll('body *')).filter(el => {
            // исключаем слишком много вложенных элементов
            try{
                if(el.matches && (el.matches('script, style, noscript, iframe'))) return false;
            }catch(e){}
            const text = (el.innerText || '').trim();
            return isShortText(text);
        });

        for(const el of candidates){
            const text = (el.innerText||'').trim();
            for(const entry of icons){
                for(const key of entry.keywords){
                    if(text.indexOf(key) !== -1){
                        // обернули найденный заголовок — ищем контейнер пункта меню
                        let container = el.closest('li, a, button, div') || el.parentElement || el;
                        if(!container) continue;
                        if(container.dataset && container.dataset.lampaCustomIconHandled) continue;

                        // пытаемся найти существующий элемент-иконку рядом
                        let oldIcon = container.querySelector('[class*="icon"], [class*="ico"], [class*="img"], i, svg, img, .fa, .material-icons');
                        if(oldIcon){
                            try{ oldIcon.classList.add('lampa-custom-hidden-old-icon'); }catch(e){}
                        }

                        // если уже есть наш значок — пропускаем
                        if(!container.querySelector('.lampa-custom-settings-icon')){
                            const span = document.createElement('span');
                            span.className = 'lampa-custom-settings-icon';
                            span.innerHTML = entry.svg;
                            // вставляем прежде всего (чтобы было слева)
                            try{
                                container.insertBefore(span, container.firstChild);
                            }catch(e){
                                container.appendChild(span);
                            }
                        }

                        if(DEBUG) container.classList.add('lampa-custom-debug');
                        if(container.dataset) container.dataset.lampaCustomIconHandled = '1';
                        replaced++;
                        break;
                    }
                }
                if(replaced && DEBUG) break;
            }
        }
        return replaced;
    }

    function tryReplaceByIndexFallback(){
        createStyles();
        // На случай, если подписи отличаются — пытаемся заменить по порядку элементов в блоке "settings"
        const listSelectors = [
            '[class*="settings"] li', '[class*="settings"] div', '.settings-item', '.settings__item', '.settings-list li', '.settings-list div'
        ];
        let list = [];
        for(const sel of listSelectors){
            const found = Array.from(document.querySelectorAll(sel));
            if(found.length) {
                list = found;
                break;
            }
        }
        if(!list.length){
            // более универсальная попытка: взять ближайший контейнер, который содержит много пунктов
            const blocks = Array.from(document.querySelectorAll('div, section, ul')).filter(b => {
                try{
                    const children = b.children || [];
                    return children && children.length >= 3 && Array.from(children).some(ch => isShortText(ch.innerText));
                }catch(e){ return false; }
            });
            if(blocks.length) list = Array.from(blocks[0].children).slice(0, 12);
        }

        if(!list.length) return 0;

        let replaced = 0;
        for(let i=0;i<Math.min(list.length, icons.length); i++){
            const c = list[i];
            if(!c) continue;
            if(c.dataset && c.dataset.lampaCustomIconHandled) continue;
            let oldIcon = c.querySelector('[class*="icon"], [class*="ico"], i, svg, img, .fa, .material-icons');
            if(oldIcon) try{ oldIcon.classList.add('lampa-custom-hidden-old-icon'); }catch(e){}
            if(!c.querySelector('.lampa-custom-settings-icon')){
                const span = document.createElement('span');
                span.className = 'lampa-custom-settings-icon';
                span.innerHTML = icons[i].svg;
                try{
                    c.insertBefore(span, c.firstChild);
                }catch(e){
                    c.appendChild(span);
                }
            }
            if(DEBUG) c.classList.add('lampa-custom-debug');
            if(c.dataset) c.dataset.lampaCustomIconHandled = '1';
            replaced++;
        }
        return replaced;
    }

    function runOnce(){
        try{
            let r = tryReplaceByLabels();
            if(!r) r = tryReplaceByIndexFallback();
            if(DEBUG) console.log('[lampa-custom-icons] replaced:', r, 'tries:', tries);
            return r;
        }catch(e){
            if(DEBUG) console.error('[lampa-custom-icons] error:', e);
            return 0;
        }finally{
            tries++;
        }
    }

    // Наблюдатель за DOM добавлениями — когда Lampa динамически отрисует меню, мы поймаем момент
    let observer;
    try{
        observer = new MutationObserver((mutations)=>{
            for(const m of mutations){
                if(m.addedNodes && m.addedNodes.length){
                    // пытаемся быстро заменить
                    runOnce();
                    break;
                }
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }catch(e){
        if(DEBUG) console.error('[lampa-custom-icons] observer error', e);
    }

    // Начальные попытки (несколько итераций, т.к. меню может отрисовываться с задержками)
    const intervalId = setInterval(()=>{
        const replaced = runOnce();
        if(replaced || tries >= MAX_TRIES) {
            clearInterval(intervalId);
            // оставляем наблюдение активным — при дальнейшем открытии настроек скрипт сработает и снова
            if(DEBUG) console.log('[lampa-custom-icons] finished. tries=' + tries);
        }
    }, 800);

    // Экспорт для ручного запуска (в консоли): window.LampaCustomIcons.run()
    window.LampaCustomIcons = {
        run: runOnce
    };

    // Иногда Lampa использует собственный lifecycle event "settings open" — подписываемся, если доступно
    try{
        if(window.Lampa && Lampa.Listener && Lampa.Listener.follow){
            Lampa.Listener.follow('settings', function(e){
                if(e && e.type === 'open') setTimeout(runOnce, 250);
            });
        }
    }catch(e){
        // ignore
    }

})();
