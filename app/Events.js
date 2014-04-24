$( document ).on( "pageinit", "#payments", function() {
    // Swipe to remove list item
    $( document ).on( "swipeleft swiperight", "#list li", function( event ) {
        var listitem = $( this ),
        // These are the classnames used for the CSS transition
            dir = event.type === "swipeleft" ? "left" : "right",
        // Check if the browser supports the transform (3D) CSS transition
            transition = $.support.cssTransform3d ? dir : false;
        listitem.find(".delete").trigger("click");
    });
});

$(document).on("pagebeforechange", function( e , data ) {
    console.log("pagebeforechange");
    var page = data.toPage[0].id;
    if (page == undefined) return;
    var result = new Login().getAccess(page);
    console.log(result);
    if(!result) { console.log("def"); e.preventDefault(); }
});

$(document).on( "pagebeforecreate", "div[data-role='page']", function() {

    console.log("pagebeforecreate");
    var id = this.id;
    var controller;

    switch(id) {
        case 'dashboard':
            controller = new Dashboard();
            break;
        case 'cardDetails':
        case 'cardSettings':
            controller = new App().cardDetails();
            break;
        case 'cards':
            controller = new Cards();
            break;
        case 'payments':
        case 'paymentsMobile':
        case 'paymentsAccount':
        case 'paymentsCards':
            controller = new App().payments(id);
            break;
        case 'paymentsUtilities':
            controller = new PaymentsUtilities();
            break;
        case 'paymentsUtilitiesGrid':
            controller = new PaymentsUtilitiesGrid();
            break;
        case 'paymentsVerify':
        case 'paymentsSuccess':
            controller = new App().paymentsVerify();
            break;
        case 'locationsList':
            controller = new Locations();
            break;
        case 'locations':
            controller = new App().locationsMap();
            break;
        case 'contacts':
            controller = new Contacts();
            break;
        case 'login':
            controller = new Login();
            break;
        case 'settings':
            controller = new Settings();
            break;
        case 'currencyExchange':
            controller = new CurrencyExchange();
            break;
        case 'news':
        case 'newsPage':
            controller = new NewsController();
            break;
        default :
            controller = new Controller();
            break;
    }

    ko.applyBindings(controller, this);
});

$(document).on( "pagebeforehide", "div[data-role='page']", function( event , data ) {
    console.log("pagebeforehide");
});

$(document).on('pagebeforeshow',"div[data-role='page']", function(e, data) {

    console.log("pagebeforeshow");
    var pageId = this.id;
    var prevPage = data.prevPage.attr('id');

    var title = $(this).attr('data-title') || '';
    new App().title(title);

    switch(pageId) {
        case 'paymentsMobile':
        case 'paymentsAccount':
        case 'paymentsCards': {
            if (prevPage != 'paymentsVerify') { //Back from verify to payment page. Save data
                new Payments().reset();
            }
        }
            break;
    }
});
$("div[data-role='page']").live('pageshow', function() {

    console.log("pageshow");
    var pageId = this.id;
    new App().id(pageId);

    var $navbar = $("#mainNavBar");
    var $navpanel = $("#sidemenu");


    pageId = ['payments', 'paymentsMobile', 'paymentsCards','paymentsAccount','paymentsVerify','paymentsSuccess'].indexOf(pageId) > -1 ? 'payments': pageId;
    pageId = ['cards', 'cardDetails','cardSettings'].indexOf(pageId) > -1 ? 'cards': pageId;
    pageId = ['locations', 'locationsList'].indexOf(pageId) > -1 ? 'locations': pageId;
    $.each([$navbar, $navpanel],function(index, value) {

        value.find(".ui-btn-active").removeClass('ui-btn-active');
        value.find("a[href='#"+pageId+"']").addClass('ui-btn-active');
    });


});