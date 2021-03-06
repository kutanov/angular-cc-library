"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var forms_1 = require("@angular/forms");
var credit_card_1 = require("./shared/credit-card");
var CreditCardValidator = (function () {
    function CreditCardValidator() {
    }
    CreditCardValidator.validateCCNumber = function (control) {
        if (forms_1.Validators.required(control) !== undefined && forms_1.Validators.required(control) !== null) {
            return { 'ccNumber': false };
        }
        var num = control.value.toString().replace(/\s+|-/g, '');
        if (!/^\d+$/.test(num)) {
            return { 'ccNumber': false };
        }
        var card = credit_card_1.CreditCard.cardFromNumber(num);
        if (!card) {
            return { 'ccNumber': false };
        }
        if (card.length.includes(num.length) && (card.luhn === false || credit_card_1.CreditCard.luhnCheck(num))) {
            return null;
        }
        return { 'ccNumber': false };
    };
    CreditCardValidator.validateExpDate = function (control) {
        if (forms_1.Validators.required(control) !== undefined && forms_1.Validators.required(control) !== null) {
            return { 'expDate': false };
        }
        if (typeof control.value !== 'undefined' && control.value.length >= 7) {
            var _a = control.value.split(/[\s\/]+/, 2), month = _a[0], year = _a[1], prefix = void 0;
            if ((year != null ? year.length : void 0) === 2 && /^\d+$/.test(year)) {
                prefix = new Date().getFullYear();
                prefix = prefix.toString().slice(0, 2);
                year = prefix + year;
            }
            month = parseInt(month, 10).toString();
            year = parseInt(year, 10).toString();
            if (/^\d+$/.test(month) && /^\d+$/.test(year) && (month >= 1 && month <= 12)) {
                var currentTime = void 0, expiry = void 0;
                expiry = new Date(year, month);
                currentTime = new Date();
                expiry.setMonth(expiry.getMonth() - 1);
                expiry.setMonth(expiry.getMonth() + 1, 1);
                if (expiry > currentTime) {
                    return null;
                }
            }
        }
        return { 'expDate': false };
    };
    return CreditCardValidator;
}());
exports.CreditCardValidator = CreditCardValidator;
//# sourceMappingURL=credit-card.validator.js.map