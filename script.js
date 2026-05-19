'use strict'

const apps = [

        [
6463690, 'Маруся', 'https://sun9-56.userapi.com/Zbl1njzBDZ4v9shXbclysDxLjeG7KHgYFAlwMw/rb-hbmdVyxI.jpg', 'ВКонтакте для Android', 132]
    ],
    utypes = [
        [0, 'Уведомления', 'notify', 'только для iframe-приложений'],
        [1, 'Друзья', 'friends'],
        [2, 'Фотографии', 'photos'],
        [3, 'Аудиозаписи', 'audio', 'доступ к API аудиозаписей ограничен'],
        [4, 'Видеозаписи', 'video'],
        [6, 'Истории', 'stories'],
        [7, 'Wiki-страницы', 'pages'],
        [8, 'Добавление в меню слева', 'menu', 'только для iframe-приложений'],
        [9, 'Быстрая публикация на стенах', 'wallmenu', 'устаревший параметр'],
        [10, 'Статус', 'status'],
        [11, 'Заметки', 'notes'],
        [12, 'Сообщения', 'messages', 'доступ к API сообщений ограничен'],
        [13, 'Стена', 'wall'],
        [15, 'Рекламные кабинеты', 'ads'],
        [16, 'Доступ в любое время', 'offline'],
        [17, 'Документы', 'docs'],
        [18, 'Группы', 'groups'],
        [19, 'Ответы', 'notifications'],
        [20, 'Статистика', 'stats'],
        [22, 'Электронная почта', 'email'],
        [23, 'Кабинеты рекламной сети', 'adsweb'],
        [24, 'Рекламные акции', 'leads', 'только для рекламных партнёров'],
        [26, 'Кабинеты биржи рекламы', 'exchange'],
        [27, 'Товары', 'market'],
        [28, 'Номер телефона', 'phone', 'только для сервисов и доверенных iframe-приложений']
    ],
    gtypes = [
        [0, 'Истории', 'stories'],
        [2, 'Фотографии', 'photos'],
        [12, 'Сообщения', 'messages'],
        [13, 'Стена', 'wall'],
        [17, 'Документы', 'docs'],
        [18, 'Администрирование', 'manage'],
        [27, 'Товары', 'market']
    ];


apps.map(app => apps_block.insertAdjacentHTML('beforeend', '<div class="app"><button onclick="auth(' + app[0] + ')" class="btn">' + app[1] + '</button><span><img src="' + app[2] + '" class="p_icon"><div class="desc"><p>' + (app[3] ? app[3] : 'Описание отсутствует') + '</p><p>ID приложения: ' + app[0] + '</p>Иконка в записях:<div class="icon" style="background-position: 0 -' + app[4] + 'px;"></div></div></span></div>'));

apps_block.insertAdjacentHTML('beforeend', '<div class="app"><button class="btn" id="settings">Настройки &raquo;</button><span><div class="desc">Настройка прав, указание ID приложения, а также получение токена для группы</div></span></div>');

addPermissions(utypes, permissions);
addPermissions(gtypes, gpermissions);

settings.onclick = function() {
    showOptions(1);
};

close_button.onclick = function() {
    showOptions();
};

uncheck.onclick = function() {
    Array.prototype.slice.call(document.querySelectorAll('input[scope]')).map(check => check.checked = false);
};

submit.onclick = function() {
    if (token_type_user.checked) {
        var scope = document.querySelectorAll('#permissions > input:checked'),
            groups = 0;
    } else {
        var scope = document.querySelectorAll('#gpermissions > input:checked'),
            groups = 1;
    }
    let app = app_id.value;
    let group = group_id.value;
    if ((app && !groups) || (app && groups && group && scope.length)) {
        auth(app, Array.prototype.slice.call(scope).reduce((cc, sc) => cc + Math.pow(2, sc.getAttribute('scope')), 0), (groups ? group : ''));
        err_msg.style.display = 'none';
    } else {
        err_msg.style.display = 'block';
    }
};

document.onkeydown = function(e) {
    if (e.key == 'Escape') {
        showOptions();
    }
};


window.onclick = function(event) {
    if (event.target == myModal) {
        showOptions();
    }
};

window.EventTarget.prototype.addDelegatedListener = function(type, delegateSelector, listener) {
    this.addEventListener(type, function(event) {
        if (event.target && event.target.matches(delegateSelector)) {
            listener.call(event.target, event)
        }
    })
};

document.addDelegatedListener('change', 'input[type="radio"]', function(event) {
    if (token_type_user.checked) {
        permissions.style.display = offline_warning.style.display = 'block';
        gpermissions.style.display = group_block.style.display = 'none';
    } else {
        permissions.style.display = offline_warning.style.display = 'none';
        gpermissions.style.display = group_block.style.display = 'block';
    }
    err_msg.style.display = 'none';
})

function showOptions(d) {
    myModal.style.display = (d ? 'block' : 'none');
}

function addPermissions(arr, el) {
    arr.map(type => el.insertAdjacentHTML('beforeend', '<input type="checkbox" id="' + el.id + '_' + type[0] + '" class="pcheck" scope="' + type[0] + '" ' + (!type[3] ? 'checked' : '') + '><label for="' + el.id + '_' + type[0] + '" class="btn" title="' + type[2] + '' + (type[3] ? ' (' + type[3] + ')' : '') + '">' + type[1] + '</label>'));
}

function auth(app, scope = 1073737727, groups = false) {
    window.open('https://oauth.vk.ru/authorize?client_id=' + app + '&scope=' + scope + '&redirect_uri=https://oauth.vk.ru/blank.html&display=page&response_type=token' + (groups ? '&group_ids=' + groups.replace(/[^0-9\,]/gim, '') : '&revoke=1'));
}
