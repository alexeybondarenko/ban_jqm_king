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

    self.type = null;
    self.url = null;

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
     * @type {ko..observable(bool)}
     */
    self.paymentIsTemplate = ko.observable(false);

    self.paymentTemplateDelete = function (template) {

        var conf = confirm(self.language().templateDeleteCaption);
        if (!conf) return false;
        self.paymentTemplates.remove(template);
    };
    /**
     * Save current payment as template
     * @method addToTemplate
     * @returns {boolean}
     */
    self.addToTemplate = function () {

        var title = prompt(self.language().enterTemplatesName);
        if (title == '') return false;
        /**
         * Collect state property of the payment
         * @type {Array}
         */
        var fields = self.templateFields();
        // Save only ID of the obj with unique id. It is useful for memory saving
        var objIDProps = ['paymentCard','receiveCard', 'selectedCity', 'selectedCompany'],
            i = objIDProps.length;
        while(i--) {
            (function(obj, propName){
                var haveIDProp = (obj[propName] instanceof Array) ? obj[propName][0] : obj[propName];
                if (haveIDProp != undefined && haveIDProp != null && haveIDProp.id != undefined && haveIDProp.id != null) {
                    obj[propName+"ID"] = +haveIDProp['id'];
                    delete obj[propName];
                }
            })(fields, objIDProps[i]);
        }
        var pay = {
            title: title,
            url: self.url,
            type: self.type,
            fields: self.templateFields()
        };
        /**
         * Pushing new template to store
         */
        console.log("Add new template ", pay);
        new PaymentsStore().data.push(pay);
        self.paymentIsTemplate(true);
        return true;
    };
    /**
     * Load saved template for payment
     * @param val - choosed tempate
     */
    self.payFromTemplate = function(val) {

        $.mobile.changePage(val.url);

        self.paymentIsTemplate(true);
        self.type = val.type;
        self.url = val.url;
//        new App().title(val.title);
        var controller = ko.dataFor($.mobile.activePage[0]);
        (controller.hasOwnProperty('loadFields')) ? controller.loadFields(val.fields): self.loadFields(val.fields);

    };
    /**
     * Loading saved in template fields into the fields on the payment screen
     * Default: values are loading in the field with the names seams with value's keys names
     * @param fields
     * @method loadFields
     */
    self.loadFields = function (fields) {

        console.log("Fields: ", fields);
        console.dir(self);
        // Relationships beetween IDField and Store
        var IDandStores = {
            paymentCardID: CardsStore,
            receiveCardID: CardsStore,
            selectedCityID: CitiesStore,
            selectedCompanyID: CompaniesStore
        };
        // Relationships between IDField and Field
        var IDandFields = {
            paymentCardID: 'paymentCard',
            receiveCardID: 'receiveCard',
            selectedCityID: 'selectedCity',
            selectedCompanyID: 'selectedCompany'
        };
        /**
         * Conversion ID field to object
         * paymentCardID -> paymentCard
         */
        var name;

        for (name in IDandStores) {
            if (fields[name] == undefined) continue;
            fields[IDandFields[name]] = new IDandStores[name]().getByID(name, fields);
        }
        console.log("After stores: ", fields);
        /**
         * By default, all fields are loading into the fields with the same name, as the keys
         */
        for (name in fields) {
            if (self[name] != undefined) {
                console.log(name, ":",fields[name]);
                if (typeof self[name] == 'function') {
//                    console.log("Set val ",name, fields[name]);
                    var obsProp = self[name];
                    obsProp(fields[name]);
                } else {
                    self[name] = fields[name];
                }
            }
        }
        self.paymentIsTemplate(true);

    };

    /**********************
     * Payment properties *
     **********************/

    /**
     * Amount of the payment
     * @type {number}
     * @property paymentAmount
     */
    self.paymentAmount = ko.observable(null);
    /**
     * Card - source of payment
     * @type {Card}
     *  @property paymentCard
     */
    self.paymentCard = ko.observable(null);
    /**
     * Card what will receive current transfer
     * @type {Card}
     * @property receiveCard
     */
    self.receiveCard = ko.observable(null);
    /**
     * Phone number field
     * @property phoneNumber
     */
    self.phoneNumber = ko.observable(null);
    /**
     * Card number to bill
     * @type number
     * @property cardNumber
     */
    self.cardNumber = ko.observable(null);
    /**
     * Selected city for current payment
     * @property selectedCity
     * @type {City}
     */
    self.selectedCity = ko.observable(null);
    /**
     * Selected company, that provides the services
     * @property selectedCompany
     * @type {Company}
     */
    self.selectedCompany = ko.observable(null);
    /**
     * Number of the personal account
     * @type {number}
     * @property personalAccount
     */
    self.personalAccount = ko.observable(null);
    /**
     * Name of the bill recipient
     * @type {text}
     * @property recipientName
     */
    self.recipientName = ko.observable(null);
    /**
     * Number of the bill recipient
     * @type {number}
     * @property recipientNumber
     */
    self.recipientNumber = ko.observable(null);
    /**
     * Is recipient account Opened in current Bank
     * @type {bool}
     * @property isRecipientAccountOpenedInBank
     */
    self.isRecipientAccountOpenedInBank = ko.observable(null);
    /**
     * MFO Bank of the bill recipient
     * @type {number}
     * @property recipientNumber
     */
    self.bankMFONumber = ko.observable(null);
    /**
     * Account Number of the bill recipient in the Bank
     * @type {number}
     * @property recepientAccountInBank
     */
    self.recepientAccountInBank = ko.observable(null);
    /**
     * Details of the payment
     * @type {text}
     * @property paymentDetails
     */
    self.paymentDetails = ko.observable(null);


    /****************
     * Verification *
     ****************/

    /**
     * Open verify page, if input data on Payments page is correct.
     * @function
     */
    self.openVerifyPage = function() {
        $.mobile.changePage("#paymentsVerify");
    };
    /**
     * Verify code and open success or fail page
     * @function
     */
    self.verifyPayment = function() {
        $.mobile.changePage("#paymentsSuccess");
    };

    /********************
     *  Code resending  *
     ********************/

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
     * Msg on payments screen. Don't forget to reset value, when you close or open payments page.
     * @type {string}
     */
    self.showResendMsg = ko.observable(false);

    /*******************
     * OTP code digits *
     *******************/

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

        console.info("Resetting payment controller");
        self.resetDigits();

        self.showResendMsg(false);
        self.resendActive(true);
        self.paymentIsTemplate(false);

        self.paymentAmount(null);
        self.paymentCard(null);
        self.receiveCard(null);
        self.phoneNumber(null);
        self.cardNumber(null);

        self.selectedCity(null);
        self.selectedCompany(null);
        self.personalAccount(null);
        self.recipientName(null);
        self.recipientNumber(null);

        self.isRecipientAccountOpenedInBank(false);
        self.bankMFONumber(null);
        self.recepientAccountInBank(null);
        self.paymentDetails(null);

    };
};

Payments.prototype = new Controller();

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

