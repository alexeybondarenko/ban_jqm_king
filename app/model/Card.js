/**
 * Модель данных Card - пластиковая карта банка
 * @author Alexey Bondarenko <alexeybondarenko@me.com>
 * @version 0.1
 * @constructor
 * @this {Card}
 * @param {number}  id           Идентификатор карты
 * @param {number}  owner_id     Идентификатор владельца карты
 * @param {string}  created_at   Дата оформления карты
 *
 * @param {number}  number       Номер карты 16-цифр. Используем string, потому то в int
 * @param {string}  title        Название карты
 * @param {float}   amount       Сумма остатка на карте
 * @param {string}  currency     Валюта
 * @param {string}  type         Тип карты: credit (кредитная) или debit (дебетовая)
 * @param {array}   transactions Последние транзакции карты
 **/

var Card = function(id, owner_id, created_at, title, number, amount, currency, type, transactions) {

    /**
     * Идентификатор карты
     * @type number
     **/
    this.id = id || 0;
    /**
     * Идентификатор владельца карты
     * @type number
     **/
    this.owner_id = owner_id || 0;
    /**
     * Дата оформления карты
     * @type date
     **/
    this.created_at = new Date(created_at || 0) ;
    /**
     * Название карты
     * @type string
     **/
    this.title = title || 'Тестовая карта, но с очень большим - пребольшим названием';
    /**
     * 16-разрядный номер карты
     * @type number
     */
    this.number = number || '1234567812345678';
    /**
     * Маскированны номер карты
     * @function
     * @type string
     */
    this.maskedNumber = ko.computed(function(){
        var num = this.number.toString();
        return num.substr(0,4)+'****'+num.substr(-4);
    },this);
    /**
     * Последние 4 цифры карты
     * @function
     * @type string
     */
    this.lastNumberDigits = ko.computed(function() {
        var num = this.number.toString();
        return num.substr(-4);
    }, this);
    /**
     * Сумма средств на карте
     * @type float
     */
    this.amount = amount || 999.99;
    /**
     * Вылюта карты
     * @type string
     */
    this.currency = currency || 'UAH';
    /**
     * Символ валюты
     * @function
     * @type string
     */
    this.currencySymbol = ko.computed(function(){

        var codesSymbol = {
            ALL : 'Lek', //Albania Lek
            AFN : '؋', //Afghanistan Afghani
            ARS : '$', //Argentina Peso
            AWG : 'ƒ', //Aruba Guilder
            AUD : '$', //Australia Dollar
            AZN : 'ман', //Azerbaijan New Manat
            BSD : '$', //Bahamas Dollar
            BBD : '$', //Barbados Dollar
            BYR : 'p.', //Belarus Ruble
            BZD : 'BZ$', //Belize Dollar
            BMD : '$', //Bermuda Dollar
            BOB : '$b', //Bolivia Boliviano
            BAM : 'KM', //Bosnia and Herzegovina Convertible Marka
            BWP : 'P', //Botswana Pula
            BGN : 'лв', //Bulgaria Lev
            BRL : 'R$', //Brazil Real
            BND : '$', //Brunei Darussalam Dollar
            KHR : '៛', //Cambodia Riel
            CAD : '$', //Canada Dollar
            KYD : '$', //Cayman Islands Dollar
            CLP : '$', //Chile Peso
            CNY : '¥', //China Yuan Renminbi
            COP : '$', //Colombia Peso
            CRC : '₡', //Costa Rica Colon
            HRK : 'kn', //Croatia Kuna
            CUP : '₱', //Cuba Peso
            CZK : 'Kč', //Czech Republic Koruna
            DKK : 'kr', //Denmark Krone
            DOP : 'RD$', //Dominican Republic Peso
            XCD : '$', //East Caribbean Dollar
            EGP : '£', //Egypt Pound
            SVC : '$', //El Salvador Colon
            EEK : 'kr', //Estonia Kroon
            EUR : '€', //Euro Member Countries
            FKP : '£', //Falkland Islands (Malvinas) Pound
            FJD : '$', //Fiji Dollar
            GHC : '¢', //Ghana Cedis
            GIP : '£', //Gibraltar Pound
            GTQ : 'Q', //Guatemala Quetzal
            GGP : '£', //Guernsey Pound
            GYD : '$', //Guyana Dollar
            HNL : 'L', //Honduras Lempira
            HKD : '$', //Hong Kong Dollar
            HUF : 'Ft', //Hungary Forint
            ISK : 'kr', //Iceland Krona
            INR : '', //India Rupee
            IDR : 'Rp', //Indonesia Rupiah
            IRR : '﷼', //Iran Rial
            IMP : '£', //Isle of Man Pound
            ILS : '₪', //Israel Shekel
            JMD : 'J$', //Jamaica Dollar
            JPY : '¥', //Japan Yen
            JEP : '£', //Jersey Pound
            KZT : 'лв', //Kazakhstan Tenge
            KPW : '₩', //Korea (North) Won
            KRW : '₩', //Korea (South) Won
            KGS : 'лв', //Kyrgyzstan Som
            LAK : '₭', //Laos Kip
            LVL : 'Ls', //Latvia Lat
            LBP : '£', //Lebanon Pound
            LRD : '$', //Liberia Dollar
            LTL : 'Lt', //Lithuania Litas
            MKD : 'ден', //Macedonia Denar
            MYR : 'RM', //Malaysia Ringgit
            MUR : '₨', //Mauritius Rupee
            MXN : '$', //Mexico Peso
            MNT : '₮', //Mongolia Tughrik
            MZN : 'MT', //Mozambique Metical
            NAD : '$', //Namibia Dollar
            NPR : '₨', //Nepal Rupee
            ANG : 'ƒ', //Netherlands Antilles Guilder
            NZD : '$', //New Zealand Dollar
            NIO : 'C$', //Nicaragua Cordoba
            NGN : '₦', //Nigeria Naira
            KPW : '₩', //Korea (North) Won
            NOK : 'kr', //Norway Krone
            OMR : '﷼', //Oman Rial
            PKR : '₨', //Pakistan Rupee
            PAB : 'B/.', //Panama Balboa
            PYG : 'Gs', //Paraguay Guarani
            PEN : 'S/.', //Peru Nuevo Sol
            PHP : '₱', //Philippines Peso
            PLN : 'zł', //Poland Zloty
            QAR : '﷼', //Qatar Riyal
            RON : 'lei', //Romania New Leu
            RUB : 'руб', //Russia Ruble
            SHP : '£', //Saint Helena Pound
            SAR : '﷼', //Saudi Arabia Riyal
            RSD : 'Дин.', //Serbia Dinar
            SCR : '₨', //Seychelles Rupee
            SGD : '$', //Singapore Dollar
            SBD : '$', //Solomon Islands Dollar
            SOS : 'S', //Somalia Shilling
            ZAR : 'R', //South Africa Rand
            KRW : '₩', //Korea (South) Won
            LKR : '₨', //Sri Lanka Rupee
            SEK : 'kr', //Sweden Krona
            CHF : 'CHF', //Switzerland Franc
            SRD : '$', //Suriname Dollar
            SYP : '£', //Syria Pound
            TWD : 'NT$', //Taiwan New Dollar
            THB : '฿', //Thailand Baht
            TTD : 'TT$', //Trinidad and Tobago Dollar
            TRY : '', //Turkey Lira
            TRL : '₤', //Turkey Lira
            TVD : '$', //Tuvalu Dollar
            UAH : '₴', //Ukraine Hryvna
            GBP : '£', //United Kingdom Pound
            USD : '$', //United States Dollar
            UYU : '$U', //Uruguay Peso
            UZS : 'лв', //Uzbekistan Som
            VEF : 'Bs', //Venezuela Bolivar
            VND : '₫', //Viet Nam Dong
            YER : '﷼', //Yemen Rial
            ZWD : 'Z$' //Zimbabwe Dollar //Zimbabwe Dollar
        };
        return codesSymbol[this.currency];
    },this);
    /**
     * Тип карты: кредитная или дебетовая.
     * @type string
     */
    this.type = (type == 'credit' || type == 'debit') ? type : undefined;
    /**
     * Card type in formated form
     * @type {*}
     */
    this.typeTitle = ko.computed(function() {

        switch (this.type) {
            case 'credit':
                return Language().language().creditCard;
                break;
            case 'debit':
                return Language().language().debitCard;
                break;
        }
    },this);
    /**
     * Последние транзакции по карте
     * @type array {Transaction}
     */

    var resAr = [];

    if(transactions) {
        $.each(transactions, function(index, value) {
            resAr[index] = readTransaction(value);
        });
    }

    this.transactions = ko.observableArray(resAr|| []);

    this.info = ko.computed(function() {
        return title+ ' '+ amount+' '+this.currencySymbol();
    },this);
}