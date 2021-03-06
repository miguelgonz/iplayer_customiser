var popupId = false;
function openPopup() {
    chrome.windows.create({
        'url': chrome.extension.getURL('popup.html'),
        'top': 0,
        'left': 0,
        'width': 330,
        'height': 580,
        //'type': 'detached_panel'
        'type': 'popup'
    }, function (popupWindow) {
        popupId = popupWindow.id;
    });
}
//Only have one window opened
chrome.browserAction.onClicked.addListener(function(tab) {
    if (popupId) {
        chrome.windows.get(popupId, {}, function (theWindow) {
            if (!theWindow) {
                openPopup();
            }else{
                //bring the window to the top
                chrome.windows.update(popupId, {
                    focused: true
                });
            }
        });
    }else{
        openPopup();
    }
});
