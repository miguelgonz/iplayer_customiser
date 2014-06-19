
function loadStyles(cb) {
    chrome.storage.local.get({'styles':{}}, function(storedConfig) {
        cb(storedConfig.styles);
    });
}



//window.embeddedMedia.players[0].updateUiConfig({colour: '#FF0000', 'foreColour': '#00ffff'})

var styleMapping = [
    {
        selector: '.tools-section .link .item',
        dom: '#value-text-colour',
        property: 'background'
    },
    {
        selector: '.s-b .s-b-button, .s-b.iplayer span, #data .link, .availability-component, #synopsis p.medium-description, .carousel h2, .carousel .title, .carousel .subtitle',
        dom: '#value-text-colour',
        property: 'color'
    },
    {
        selector: '.carousel .subtitle',
        dom: '#value-text-secondary-colour',
        property: 'color'
    },
    {
        selector: '.discovery-container, .iplayer-gradient-front, .iplayer-gradient,.main',
        dom: '#value-bg-colour',
        property: 'background-color'
    },
    {
        selector: '.main',
        dom: '#value-bg-image',
        domAttr: 'image',
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

function saveStyles() {
    var styles = {}, i;
    for (i in styleMapping) {
        var style = styleMapping[i], value;
        if (typeof style.domAttr !== 'undefined') {
            value = $(style.dom)[0][style.domAttr];
        } else {
            value = $(style.dom).val();
        }
        styles[style.selector] = style.property + ': ' + value;
    }
    chrome.storage.local.set({'styles': styles});
}

$(function () {
    $('.message').hide();
    $('.colorpicker').colorpicker().on('changeColor', function () {
        saveStyles();
    });

    $('#value-bg-image').fileDrop(function(fileCollection){
        value = 'url(data:'+fileCollection[0].type+';base64,'+fileCollection[0].data+') center center';
        document.getElementById('value-bg-image').image = value;
        saveStyles();
    });

    $('#btn-update').click(function () {
        saveStyles();
    });
});
