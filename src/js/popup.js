
function loadStyles(cb) {
    chrome.storage.local.get({'styles':{}}, function(storedConfig) {
        cb(storedConfig.styles);
    });
}


var getUiConfig = function () {
    return {
        'foreColour': $('#value-text-colour').val(),
        'colour': $('#value-bg-colour').val()
    };
};


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

function getStyles() {
    var styles = {}, i;
    for (i in styleMapping) {
        var style = styleMapping[i], value;
        if (typeof style.getter === 'function') {
            value = style.getter();
        } else {
            value = $(style.getter).val();
        }
        css = '';
        var properties = style.property.split("|");
        for (i in properties) {
            css += properties[i] + ': ' + value + " !important; ";
        }
        styles[style.selector] = css;
    }
    console.log(styles);
    return styles;
}

function saveStyles() {
    chrome.storage.local.set(
        {
            'styles': getStyles(),
            'playerUiConfig': getUiConfig()
        }
    );
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

    $('#btn-export').click(function () {
        $('#export .content').text(JSON.stringify(getStyles()));
        $('#export').show();
    });
    $('#export .close').click(function () {
        $('#export').hide();
    });

    $('#btn-reset').click(function () {
        resetStyles();
    });
});
