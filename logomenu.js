(function () {
    'use strict';

    // Масив готових іконок (тут можна замінити посилання на свої)
    var iconImages = [
        "https://i.imgur.com/8wHZQvR.png", // logo1
        "https://i.imgur.com/TL8mA6M.png", // logo2
        "https://i.imgur.com/4LmVwVj.png", // logo3
        "https://i.imgur.com/SeN6j0A.png", // logo4
        "https://i.imgur.com/5vZ8lcb.png", // logo5
        "https://i.imgur.com/hg0Xr7f.png", // logo6
        "https://i.imgur.com/3m7JcxK.png", // logo7
        "https://i.imgur.com/7lE6Zp0.png", // logo8
        "https://i.imgur.com/vy5RT3E.png", // logo9
        "https://i.imgur.com/8mKDn0p.png"  // logo10
    ];

    // Стили
    var style = document.createElement('style');
    style.type = 'text/css';
    style.id = 'dynamic-style';
    style.textContent = `
        .menu__logos-icon {
            max-width: 50%;
            height: auto;
            flex-shrink: 0;
            margin-bottom: 1em;
            margin-left: 2em;
        }
        .icon-item {
            padding: 5px;
            border-radius: 10px;
            transition: all 0.2s ease-in-out;
        }
        .icon-item img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        .icon-item.focused {
            outline: 3px solid red;
            box-shadow: 0 0 15px red;
            transform: scale(1.1);
        }
        .head__action img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
        }
        .modal__body img {
            max-width: 100%;
            height: auto;
        }
    `;
    document.head.appendChild(style);

    function addStyleIcon() {
        var savedImage = Lampa && Lampa.Storage && Lampa.Storage.get('selectedImage', iconImages[0]);

        var iconContainer = $(
            `<div class="head__action selector open--icons" data-action="apply-style">
                <img class="style-icon" src="${savedImage}" style="max-width: 30px; height: auto;">
            </div>`
        );

        var headActionsContainer = $(".head__actions");
        if (headActionsContainer.length) {
            headActionsContainer.append(iconContainer);
        } else {
            console.warn("Контейнер head__actions не найден, повторная попытка...");
            setTimeout(addStyleIcon, 500);
            return;
        }

        iconContainer.on("hover:enter", function () {
            openStyleModal(iconContainer.find('.style-icon'));
        });

        restoreSavedImage();
    }

    function openStyleModal(iconElement) {
        var html = $('<div class="modal__body" style="padding: 20px; position: relative; border-radius: 10px;"></div>');

        var modalTitle = $('<div style="font-size: 1.4em; font-weight: bold; color: white; margin-bottom: 20px; text-align: center;">' +
            '<span style="margin-right: 10px;">🎨</span>' +
            '<div style="font-size: 1.7em; font-weight: 400; color: lightgray;">Выберите логотип</div>' +
            '</div>');

        var iconGrid = $('<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; margin-top: 20px;"></div>');

        iconImages.forEach(function (icon) {
            var iconItem = $('<div class="icon-item selector" tabindex="0">' +
                '<img src="' + icon + '" style="max-width: 35px; height: auto;">' +
                '</div>');

            iconItem.on('hover:focus', function () {
                $('.icon-item').removeClass('focused');
                iconItem.addClass('focused');
            });

            iconItem.on('hover:enter', function () {
                applyImage(icon);
                iconElement.attr('src', icon);
                Lampa.Modal.close();
                Lampa.Controller.toggle('content');
            });

            iconGrid.append(iconItem);
        });

        html.append(modalTitle);
        html.append(iconGrid);

        Lampa.Modal.open({
            title: '',
            html: html,
            size: 'middle',
            position: 'center',
            onBack: function () {
                Lampa.Modal.close();
                Lampa.Controller.toggle('content');
            }
        });
    }

    function applyImage(imgSrc) {
        if (Lampa && Lampa.Storage) {
            Lampa.Storage.set('selectedImage', imgSrc);
        }

        var oldLogo = document.querySelector('.menu__logos-icon');
        if (oldLogo) {
            oldLogo.remove();
        }

        var menuContainer = document.querySelector('.menu');
        if (menuContainer) {
            var logoImg = document.createElement('img');
            logoImg.src = imgSrc;
            logoImg.alt = 'Логотип';
            logoImg.classList.add('menu__logos-icon');
            menuContainer.prepend(logoImg);
        }
    }

    function restoreSavedImage() {
        var savedImage = Lampa && Lampa.Storage && Lampa.Storage.get('selectedImage', null);
        if (savedImage) {
            applyImage(savedImage);
        }
    }

    if (window.appready) {
        addStyleIcon();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') {
                addStyleIcon();
            }
        });
    }
})();
