$(document).bind("mobileinit", function () {

//    $.support.cors = true;
//    $.mobile.touchOverflowEnabled = true;
//    $.mobile.allowCrossDomainPages = true;
//    $.mobile.loadingMessage = "Loading...";
//    $.mobile.pageLoadErrorMessage = "Error Loading Data";
//    $.mobile.page.prototype.options.backBtnTheme = "b";
//    $.mobile.page.prototype.options.backBtnText = "Back";
//    $.mobile.defaultPageTransition = 'slide';
//    $.mobile.loadingMessageTextVisible = true;
//    $.mobile.pushStateEnabled = false;

    $.extend($.mobile, {
        defaultPageTransition: 'fade'
    });
});

$(function(){
    $( "[data-role='header']:not(.secondToolbar), [data-role='footer']:not(.secondToolbar)").toolbar();
    $( "[data-role='panel']" ).panel();

    $("#sidemenu ul").listview();
    $("#sidemenu").trigger("create");

//    $(document).on("swiperight","#sidemenu",function(){
//        $(this).panel("open");
//    });

//    $("[data-role=\"page\"]").live("pageaftershow", function(data, target, event) {
//
//        var actPageid = $(this).id;
//        console.log("page after show");
//        var nvbr = $("#mainNavBar[data-role=\'navbar\']");
//        nvbr.find("[href='#"+actPageid+"']").addClass('ui-btn-active');
//    })
});