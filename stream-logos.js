(function () {
    'use strict';

    // 🔗 Замініть "user/repo" на ваш GitHub репозиторій
    var baseUrl = "https://raw.githubusercontent.com/tox-coder/tox-coder.github.io/main/icons/";

    var iconImages = [
        baseUrl + "logo1.png",
        baseUrl + "logo2.png",
        baseUrl + "logo3.png",
        baseUrl + "logo4.png",
        baseUrl + "logo5.png",
        baseUrl + "logo6.png",
        baseUrl + "logo7.png",
        baseUrl + "logo8.png",
        baseUrl + "logo9.png",
        baseUrl + "logo10.png",
        baseUrl + "logo11.png",
        baseUrl + "logo12.png",
        baseUrl + "logo13.png",
        baseUrl + "logo14.png",
        baseUrl + "logo15.png",
        baseUrl + "logo16.png",
        baseUrl + "logo17.png"
    ];

    var style = document.createElement('style');
    style.type = 'text/css';
    style.id = 'dynamic-style';
    style.textContent = `
        .menu__logos-icon { max-width: 50%; height: auto; flex-shrink: 0; margin-bottom: 1em; margin-left: 2em; }
        .icon-item { padding: 5px; border-radius: 10px; transition: all 0.2s ease-in-out; }
        .icon-item img { max-width: 100%; height: auto; border-radius: 8px; cursor: pointer; transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out; }
        .icon-item.focused { outline: 3px solid red; box-shadow: 0 0 15px red; transform: scale(1.1); }
        .head__action img { max-width: 100%; height: auto; border-radius: 8px; }
        .modal__body img { max-width: 100%; height: auto; }
    `;
    document.head.appendChild(style);

    function addStyleIcon() {
        var savedImage = Lampa && Lampa.Storage && Lampa.Storage.get('selectedImage', iconImages[0]);
        var iconContainer = $(`<div class="head__action selector open--icons" data-action="apply-style">
                <img class="style-icon" src="${savedImage}" style="max-width: 30px; height: auto;">
            </div>`);
        var headActionsContainer = $(".head__actions");
        if (headActionsContainer.length) headActionsContainer.append(iconContainer);
        else { setTimeout(addStyleIcon, 500); return; }
        iconContainer.on("hover:enter", function () { openStyleModal(iconContainer.find('.style-icon')); });
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
            iconItem.on('hover:focus', function () { $('.icon-item').removeClass('focused'); iconItem.addClass('focused'); });
            iconItem.on('hover:enter', function () {
                applyImage(icon); iconElement.attr('src', icon);
                Lampa.Modal.close(); Lampa.Controller.toggle('content');
            });
            iconGrid.append(iconItem);
        });
        html.append(modalTitle); html.append(iconGrid);
        Lampa.Modal.open({ title: '', html: html, size: 'middle', position: 'center',
            onBack: function () { Lampa.Modal.close(); Lampa.Controller.toggle('content'); } });
    }

    function applyImage(imgSrc) {
        if (Lampa && Lampa.Storage) Lampa.Storage.set('selectedImage', imgSrc);
        var oldLogo = document.querySelector('.menu__logos-icon'); if (oldLogo) oldLogo.remove();
        var menuContainer = document.querySelector('.menu');
        if (menuContainer) { var logoImg = document.createElement('img'); logoImg.src = imgSrc;
            logoImg.alt = 'Логотип'; logoImg.classList.add('menu__logos-icon'); menuContainer.prepend(logoImg); }
    }

    function restoreSavedImage() {
        var savedImage = Lampa && Lampa.Storage && Lampa.Storage.get('selectedImage', null);
        if (savedImage) applyImage(savedImage);
    }

    if (window.appready) addStyleIcon();
    else Lampa.Listener.follow('app', function (e) { if (e.type === 'ready') addStyleIcon(); });
})();
