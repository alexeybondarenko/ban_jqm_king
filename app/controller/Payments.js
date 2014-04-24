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

        self.language = ko.observable(new Language().language());

        self.type = null;

        var cardsStore = new CardsStore();

        /**
         * Array of users cards
         * @type {ko.observableArray}
         */
        self.cards = cardsStore.data;

        var paymentsStore = new PaymentsStore();
        /**
         * Array of payment templates
         * @type {ko.observableArray}
         */
        self.paymentTemplates = paymentsStore.data;

        /**
         * Is current payment template or not
         * @type {*}
         */
        self.paymentIsTemplate = ko.observable(false);

        self.paymentTemplateDelete = function(template) {

//        console.log(template, index);
            var conf = confirm("Are you sure to delete template?");

            if (!conf) return false;
            self.paymentTemplates.remove(template);

        };

        /**
         * Save current payment as template
         * @returns {boolean}
         */

        self.addToTemplate = function () {

            /**
             * Deleting payment from templates if button was clicked in second time
             */
            if(self.paymentIsTemplate()) {

                self.paymentIsTemplate(false);
                return PaymentsStore().data.pop(); // Delete last saved template

            }

            var title = prompt('Введите название шаблона');
            if (title == '') return false;

            /**
             * Collect state property of the payment
             * @type {}
             */
            var pay = {
                id: new PaymentsStore().data().length,
                title: title,
                paymentAmount:  self.paymentAmount() || null,
                paymentCardID:  (self.paymentCard() != undefined && self.paymentCard()[0] != null) ? self.paymentCard()[0].id : null,
                receiveCardID:  (self.receiveCard() != undefined && self.receiveCard()[0] != null) ? self.receiveCard()[0].id : null,
                phoneNumber:    self.phoneNumber() || null,
                cardNumber:     self.cardNumber() || null,
                type:           self.type,
                url:            self.type
            };

            /**
             * Pushing new template to store
             */
            new PaymentsStore().data.push(pay);

            /**
             * Toggle paymentIsTemplate flag to payment state
             */
            self.paymentIsTemplate(true);
        };

        /**
         * Load saved template for payment
         * @param val - choosed tempate
         */
        self.payFromTemplate = function(val) {

            $.mobile.changePage("#"+val.url);
            self.paymentIsTemplate(true);

            self.paymentAmount(val.paymentAmount);
            /**
             * Searching payment card with ID
             */
            var paymentCard = (val.paymentCardID != null) ? new CardsStore().data().filter(function(paymentCard) {
                return paymentCard.id == val.paymentCardID;
            }): null;
            self.paymentCard(paymentCard);

            /**
             * Searching receive card with ID
             */
            var receiveCard = (val.receiveCardID != null) ? new CardsStore().data().filter(function(receiveCard) {
                return receiveCard.id == val.receiveCardID;
            }): null;
            self.receiveCard(receiveCard);

            self.phoneNumber(val.phoneNumber);
            self.cardNumber(val.cardNumber);
            self.type = val.type;

        };
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

            /* TODO: Add fields verification before page opened */

            $.mobile.changePage("#paymentsVerify");
        };
        /**
         * Verify code and open success or fail page
         * @function
         */
        self.verifyPayment = function() {
            $.mobile.changePage("#paymentsSuccess");
        };
        /**
         * Resending sms with verify code.
         * @function
         */
        self.resendSms = function() {
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
            self.digit1(null);
            self.digit2(null);
            self.digit3(null);
            self.digit4(null);
        };

        /**
         * Reset all controllers properties
         * @function
         */
        self.reset = function() {
            self.resetDigits();
            self.paymentCard(null);
            self.receiveCard(null);
            self.showResendMsg(false);
            self.resendActive(true);
            self.phoneNumber("");
            self.cardNumber(null);
            self.paymentAmount(null);
            self.paymentIsTemplate(false);
        };
    };
    $(function() {

        $(".code-input").on('keydown', function(event) {

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

