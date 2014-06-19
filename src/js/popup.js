
function loadStyles(cb) {
    chrome.storage.local.get({'styles':{}}, function(storedConfig) {
        cb(storedConfig.styles);
    });
}



//window.embeddedMedia.players[0].updateUiConfig({colour: '#FF0000', 'foreColour': '#00ffff'})

var styleMapping = [
    {
        selector: '.tools-section .link .item',
        dom: '#value-text-secondary-colour',
        property: 'background'
    },
    {
        selector: '.availability-component, #synopsis p.medium-description, .carousel h2, .carousel .title, .carousel .subtitle, #title h2',
        dom: '#value-text-colour',
        property: 'color'
    },
    {
        selector: '.s-b .s-b-button, .s-b.iplayer span, #data .link, .carousel .subtitle, #title h2 span',
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
        property: 'background',
        getter: function () {
            return $(this.dom)[0].image;
        }
    },
    {
        dom: '#value-lines-colour',
        selector: '.tools-section, #synopsis li',
        property: 'border-left-color'
    },
    {
        dom: '#value-lines-colour',
        selector: '#synopsis li',
        property: 'border-right-color'
    },
    {
        dom: '#value-font-size',
        selector: '#synopsis p',
        property: 'font-size',
        getter: function () {
            return $(this.dom).val() + "px";
        }
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

function loadStoredValues(cb) {
    chrome.storage.local.get({'styles':{}}, function (data) {
        for (i in styleMapping) {
            var style = styleMapping[i], value;
            var value = data.styles[style.selector];
            if (value) {
                value = value.replace(style.property+":", '').trim();
                $(style.dom).val(value);
            }
        }
        cb();
    });
}

function saveStyles() {
    var styles = {}, i;
    for (i in styleMapping) {
        var style = styleMapping[i], value;
        if (typeof style.getter === 'function') {
            value = style.getter();
        } else {
            value = $(style.dom).val();
        }
        styles[style.selector] = style.property + ': ' + value;
    }
    console.log(styles);
    chrome.storage.local.set({'styles': styles});
}

function resetStyles() {
    chrome.storage.local.set({'styles': {}});
    window.location = window.location;
}

$(function () {
    $('.message').hide();

    loadStoredValues(function () {
        console.log('dfds');
        $('.colorpicker').colorpicker({
            format: 'hex'
        }).on('changeColor', function () {
            saveStyles();
        });
    });

    $('#value-bg-image').fileDrop(
        {
            overClass: 'dropping',
            onFileRead: function(fileCollection) {
                value = 'url(data:'+fileCollection[0].type+';base64,'+fileCollection[0].data+') top center repeat-x';
                document.getElementById('value-bg-image').image = value;
                saveStyles();
            }
    });
    $('#value-bg-image-reset').click(function () {
        document.getElementById('value-bg-image').image = '';
        saveStyles();
    });

    var updateRange = function () {
        $('#' + $(this).attr('rel')).html($(this).val());
        saveStyles();
    };
    $('input[type=range]').on('change', updateRange).each(updateRange);

    $('#btn-reset').click(function () {
        resetStyles();
    });
});
