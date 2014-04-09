/**
 * Контролллер Платежей
 * @author ALexey Bondarenko <alexeybondarenko@me.com>
 * @constructor
 */

//ko.bindingHandlers.valueAsCardnumber = {
//    init: function(element, valueAccessor) {
//        var observable = valueAccessor(),
//            formatted = ko.computed({
//                read: function (key) {
//                    var str= (+observable()).toString().substr(0,15);
//
//                    return str.substr(0,3)+' '+str.substr(4,7)+' '+str.substr(8,11)+' '+str.substr(12,15);
//                },
//                write: function (value) {
//                    value = parseFloat(value.replace(/[^\.\d]/g, ""));
//                    observable(isNaN(value) ? null : value); // Write to underlying storage
//                },
//                disposeWhenNodeIsRemoved: element
//            });
//
//        //apply the actual value binding with our new computed
//        ko.applyBindingsToNode(element, { value: formatted });
//    }
//};
//ko.bindingHandlers.valueAsCurrency = {
//    init: function(element, valueAccessor) {
//        var observable = valueAccessor(),
//            formatted = ko.computed({
//                read: function (key) {
//                    return (+observable()).toFixed(2);
//                },
//                write: function (value) {
//                    value = parseFloat(value.replace(/[^\.\d]/g, ""));
//                    observable(isNaN(value) ? null : value); // Write to underlying storage
//                },
//                disposeWhenNodeIsRemoved: element
//            });
//
//        //apply the actual value binding with our new computed
//        ko.applyBindingsToNode(element, { value: formatted });
//    }
//};


var Payments = function() {

    /**
     * Singleton pattern part
     */
    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    var self = this;

    self.language = ko.observable(Language().language());
    /**
     * Reset all controllers properties
     * @function
     */
    self.reset = function() {
        console.log("reset");

        self.resetDigits();
        self.paymentCard(null);
        self.receiveCard(null);
        self.showResendMsg(false);
        self.resendActive(true);
        self.phoneNumber("");
        self.cardNumber(null);
        self.paymentAmount(null);
    };

    var cardsStore = new App().stores.cards;

    /**
     * Array of users cards
     * @type {array}
     */

    self.cards = ko.observableArray(cardsStore.data());
    self.paymentAmount = ko.observable();
    /**
     * Card - source of payment
     * @type {Card}
     */
    self.paymentCard = ko.observable();
    /**
     * Card what will receive current transfer
     * @type {Card}
     */
    self.receiveCard = ko.observable();
    /**
     * Phone number to bill
     * @type number
     */
    self.phoneNumber = ko.observable();
    self.phoneNumber.subscribe(function(newVal){
//        newVal +=1;
//        alert(newVal);
    });
    /**
     * Card number to bill
     * @type number
     */
    self.cardNumber = ko.observable();
    /**
     * Msg on payments screen. Don't forget to reset value, when you close or open payments page.
     * @type {string}
     */
    self.showResendMsg = ko.observable(false);
    /**
     * Open verify page, if input data on Payments page is correct.
     * @function
     */
    self.openVerifyPage = function() {
        console.log("Open verify page");
        $.mobile.changePage("#paymentsVerify");
    };
    /**
     * Verify code and open success or fail page
     * @function
     */
    self.verifyPayment = function() {
        console.log("Verifying payments");
        $.mobile.changePage("#paymentsSuccess");
    };
    /**
     * Resending sms with verify code.
     * @function
     */
    self.resendSms = function() {
        console.log("Resending message");
        self.showResendMsg(true);
        self.resendActive(false);
        setTimeout(function(){ self.resendActive(true); self.showResendMsg(false); }, 1*60*1000); //after 1 min ago
    };
    /**
     * Is active resend sms button on Payments Verify page
     * @type number
     */
    self.resendActive = ko.observable(true);

    /**
     * Code digit #1
     * @type number
     */
    self.digit1 = ko.observable("");
    /**
     * Code digit #2
     * @type number
     */
    self.digit2 = ko.observable("");
    /**
     * Code digit #3
     * @type number
     */
    self.digit3 = ko.observable("");
    /**
     * Code digit #4
     * @type number
     */
    self.digit4 = ko.observable("");
    /**
     * Reset digits of code on verify page.
     * It's useful when you open verify page and you don't know the values, what had setten before.
     * @function
     */
    self.resetDigits = function() {
        console.log('reset digits');
        self.digit1(null);
        self.digit2(null);
        self.digit3(null);
        self.digit4(null);
    };
    /**
     * Event on code input fields. When you press key, function verify value.
     * If value is digit - set value to field and focus on next input field. Not an number - don't set value.
     * @param data
     * @param event
     */
    self.inputChainHandler= function(data, event) {
////        var newValue = String.fromCharCode(event.charCode);
////        var inp = $(event.currentTarget);
////        var codeReg = new RegExp(/^[0-9]{1}$/i);
////        if(codeReg.test(newValue)) {
////            inp.val(newValue);
////            console.log(inp.parent().parent().next().find('input').focus());
////        }
    };


};

$(function() {

//    $('.money-input').on('click',function() {
////       alert('123');
//       $(this).val('');
//    });
    $(".code-input").on('keydown', function(event) {
//        alert('keydown');
        event.preventDefault();
        var codeInputs = $(".code-input");
        var self = this;

        var $inp = $(this);
        var idx = $(codeInputs).index(self);

        var keyCode = event.keyCode;
        if(keyCode == 8) { //Backspace
            if($(this).val()) {
                $(this).val('');

            } else if (idx-1>=0) {
                codeInputs.eq(idx-1).focus();
            }
        } else if (keyCode >=47 && keyCode <= 57 && !$(this).val().length) {
            $(this).val(String.fromCharCode(keyCode));
            codeInputs.eq(idx+1).focus();
        }
    });
});