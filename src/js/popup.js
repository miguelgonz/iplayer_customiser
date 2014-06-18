var bg = chrome.extension.getBackgroundPage(), styles;

function loadStyles() {
    chrome.storage.local.get({'styles':{}}, function(storedConfig) {
        styles = storedConfig.styles;
    });
}

function randomColour () {
    return "#" + Math.random().toString(16).substr(2,6);
}

function loadStyles(cb) {
    chrome.storage.local.get({'styles':{}}, function(storedConfig) {
        cb(storedConfig.styles);
    });
}

function flashMessage(msg) {
    $('.message').text(msg).fadeIn();
    setTimeout(function () {
        $('.message').fadeOut();
    }, 2000);
}

$(function () {
    $('.message').hide();

    $('#btn-update').click(function () {
        var styles = {
            'body':'background:'+randomColour(),
            '#synopsis p.medium-description': {
                'font-size': '20px',
            'color': randomColour(),
            }
        };
        chrome.storage.local.set({'styles': styles});
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id,
                {
                    'action': 'updateStyles',
                    'data': styles
                },
                function (success) {
                    if (success) {
                        flashMessage('styles updated');
                    }
                }
            );
        });
    });
});
