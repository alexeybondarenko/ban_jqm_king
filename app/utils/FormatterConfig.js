$(function() {

    $('.credit-input').formatter({
        'pattern': '{{9999}}-{{9999}}-{{9999}}-{{9999}}'
    });

    $('.phone-input').formatter({
        'pattern': '+38 ({{999}}) {{999}} {{99}} {{99}}',
        'persistent': true
    });

//    $('.code-input').formatter({
//        'pattern': '{{9}}',
//        'persistent': true
//    });
//    $('.money-input').formatter({
//        'pattern': '{{999}}',
//        'persistent': true
//    });

});