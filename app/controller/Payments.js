/**
 * Контролллер Платежей
 * @author ALexey Bondarenko <alexeybondarenko@me.com>
 * @constructor
 */

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
        self.phoneNumber(null);
    }

    var cardsStore = new App().stores.cards;

    /**
     * Array of users cards
     * @type {array}
     */

    self.cards = ko.observableArray(cardsStore.data());
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
    }
    /**
     * Verify code and open success or fail page
     * @function
     */
    self.verifyPayment = function() {
        console.log("Verifying payments");
        $.mobile.changePage("#paymentsSuccess");
    }
    /**
     * Resending sms with verify code.
     * @function
     */
    self.resendSms = function() {
        console.log("Resending message");
        self.showResendMsg(true);
        self.resendActive(false);
        setTimeout(function(){ self.resendActive(true); self.showResendMsg(false); }, 1*60*1000); //after 1 min ago
    }
    /**
     * Is active resend sms button on Payments Verify page
     * @type number
     */
    self.resendActive = ko.observable(true);

    /**
     * Code digit #1
     * @type number
     */
    self.digit1 = ko.observable(1);
    /**
     * Code digit #2
     * @type number
     */
    self.digit2 = ko.observable(2);
    /**
     * Code digit #3
     * @type number
     */
    self.digit3 = ko.observable(3);
    /**
     * Code digit #4
     * @type number
     */
    self.digit4 = ko.observable(4);
    /**
     * Reset digits of code on verify page.
     * It's useful when you open verify page and you don't know the values, what had setten before.
     * @function
     */
    self.resetDigits = function() {
        self.digit1(null);
        self.digit2(null);
        self.digit3(null);
        self.digit4(null);
    }
    /**
     * Event on code input fields. When you press key, function verify value.
     * If value is digit - set value to field and focus on next input field. Not an number - don't set value.
     * @param data
     * @param event
     */
    self.inputChainHandler= function(data, event) {

        var newValue = String.fromCharCode(event.charCode);
        var inp = $(event.currentTarget);
        var codeReg = new RegExp(/^[0-9]{1}$/i);
        if(codeReg.test(newValue)) {
            inp.val(newValue);
            console.log(inp.parent().parent().next().find('input').focus());
        }
    }

}

