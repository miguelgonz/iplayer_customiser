function randomColour () {
    return "#" + Math.random().toString(16).substr(2,6);
}

function _updateConfig() {
    chrome.storage.local.set({'styles':
        {
            'body':'background:'+randomColour(),
            '#synopsis p.medium-description': {
                'font-size': '20px',
                'color': randomColour(),
            }
        }
    });
}

function init() {
    setInterval( _updateConfig, 1000);
}

init();
