/**
 * Store счетов и карт пользователя
 * Паттерн: Singleton Repository
 **/

var Payment;

Payment = function (title, cardID, amount) {

	this.title = title;
	this.cardID = cardID;
	this.amount = amount;

};

var PaymentMobile;

PaymentMobile = function (title, cardID, amount, phoneNumber) {

    this.title = title;
    this.cardID = cardID;
    this.amount = amount;
    this.phoneNumber = phoneNumber;
    this.url = "paymentsMobile";

};

var PaymentsStore;

PaymentsStore = function () {

    /**
     * Singleton pattern part
     */
    if (arguments.callee._singletonInstance)
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

};

function readPayment(value) {
    return new Payment (value.title, value.type, value.cardID, value.amount);
}

PaymentsStore.prototype = new Store(null, null, 'paymentsTemplates', readPayment);
PaymentsStore.prototype.sortBy = 'title';