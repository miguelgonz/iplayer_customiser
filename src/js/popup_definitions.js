var styleMapping = [
    {
        getter: '#value-lines-colour',
        selector: '#strike, #data-outer, #carousel-outer-outer, #tvip-nav',
        property: 'border-top-color|border-bottom-color'
    },
    {
        getter: '#value-lines-colour',
        selector: '#strike, .tools-section, .iplayer-gradient-front, .iplayer-gradient, #synopsis li',
        property: 'border-left-color|border-right-color'
    },
    {
        selector: '.tools-section .link .item',
        getter: '#value-text-secondary-colour',
        property: 'background'
    },
    {
        selector: '.availability-component, #synopsis p.medium-description, .carousel h2, .carousel .title, .carousel .subtitle, #title h2, .the-lang, .the-loc, .tvip-footer li a, .related-link .title',
        getter: '#value-text-colour',
        property: 'color'
    },
    {
        selector: '.s-b .s-b-button, .s-b.iplayer span, #data .link, .carousel .subtitle, #title h2 span, .change-loc-link, .change-lang-link',
        getter: '#value-text-secondary-colour',
        property: 'color'
    },
    {
        selector: '.discovery-container, .iplayer-gradient-front, .iplayer-gradient,.main, #tviplayer',
        getter: '#value-bg-colour',
        property: 'background-color|background'
    },
    {
        selector: '.main',
        property: 'background',
        getter: function () {
            return $('#value-bg-image')[0].image;
        }
    },
    {
        selector: '#synopsis p',
        property: 'font-size',
        getter: function () {
            return $('#value-font-size').val() + "px";
        }
    }
];
