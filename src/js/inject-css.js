
function injectStyles(styles) {
    var INJECTED_ID = 'iplayer-custom-style';
    var style = document.getElementById(INJECTED_ID);
    if (!style) {
        style = document.createElement('style');
        style.id = 'iplayer-custom-style';
        document.body.appendChild(style);
    }
    var css = '', selector, property;
    for(selector in styles) {
        if (typeof styles[selector] === "string") {
            css += selector + "{" + styles[selector] + " !important}";
        } else if (typeof styles[selector] === "object") {
            css += selector + "{";
            for (property in styles[selector]) {
                css += property + ": " + styles[selector][property] + " !important;";
            }
            css += "}";
        }
    }
    style.innerHTML = css;
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === 'updateStyles') {
        loadStyles();
    }
    sendResponse(true);
  }
);

function loadStyles() {
    chrome.storage.local.get({'styles':{}}, function (data) {
        console.log(data.styles);
        injectStyles(data.styles);
    });
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
    //Only listen to style changes
    if (typeof changes.styles !== "undefined") {
        loadStyles();
    }
});

loadStyles();
