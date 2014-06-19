
function loadStyles(cb) {
    chrome.storage.local.get({'styles':{}}, function(storedConfig) {
        cb(storedConfig.styles);
    });
}

var styleMapping = [
    {
        selector: '.tools-section .link .item',
        dom: '#value-text-colour',
        property: 'background'
    },
    {
        selector: '.s-b .s-b-button, .s-b.iplayer span, #data .link, .availability-component, #synopsis p.medium-description',
        dom: '#value-text-colour',
        property: 'color'
    },
    {
        select: '.main',
        dom: '#value-bg-colour',
        property: 'background'
    }
];

function getValues() {

}

function flashMessage(msg) {
    $('.message').text(msg).fadeIn();
    setTimeout(function () {
        $('.message').fadeOut();
    }, 2000);
}

$(function () {
    $('.message').hide();
    $('.colorpicker').colorpicker();

    $('#btn-update').click(function () {
        var styles = {}, i;
        for (i in styleMapping) {
            var style = styleMapping[i];
            styles[style.selector] = style.property + ': ' +$(style.dom).val();
        }
        console.log(styles);
        chrome.storage.local.set({'styles': styles});
    });
});
