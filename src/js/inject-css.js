
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
        injectStyles(request.data);
    }
    sendResponse(true);
  }
);

