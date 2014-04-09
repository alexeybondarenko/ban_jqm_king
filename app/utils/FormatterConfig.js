$(function() {

//
    $('.credit-input').formatter({
        'pattern': '{{9999}} {{9999}} {{9999}} {{9999}}',
        'persistent': true
    });
//
    $('.phone-input').formatter({
        'pattern': '+38 ({{999}}) {{999}} {{99}} {{99}}',
        'persistent': true
    });

//    $('.code-input').formatter({
//        'pattern': '{{9}}',
//        'persistent': true
//    });
//    $('.money-input').formatter({
//        'pattern': '{{9999999999999999999999999999999}}.{{99}}',
//        'persistent': false
//    });


});
