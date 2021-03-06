"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var credit_card_1 = require("../shared/credit-card");
describe('Shared: Credit Card', function () {
    beforeEach(function () {
    });
    it('should return a card object by number', function () {
        var number = '4111111111111111';
        expect(credit_card_1.CreditCard.cardFromNumber(number)).toEqual({
            type: 'visa',
            patterns: [4],
            format: /(\d{1,4})/g,
            length: [13, 16],
            cvvLength: [3],
            luhn: true
        });
    });
    it('should restrict numeric', function () {
        var valid = {
            which: 49 // key press 1
        };
        var metaKey = {
            metaKey: true
        };
        var invalid = {
            which: 32
        };
        expect(credit_card_1.CreditCard.restrictNumeric(valid)).toBe(true);
        expect(credit_card_1.CreditCard.restrictNumeric(metaKey)).toBe(true);
        expect(credit_card_1.CreditCard.restrictNumeric(invalid)).toBe(false);
    });
    it('should determine text selected', function () {
        var target = {
            selectionStart: 1,
            selectionEnd: 2
        };
        expect(credit_card_1.CreditCard.hasTextSelected(target)).toBe(true);
        target.selectionStart = null;
        expect(credit_card_1.CreditCard.hasTextSelected(target)).toBe(false);
        target.selectionStart = 1;
        target.selectionEnd = 1;
        expect(credit_card_1.CreditCard.hasTextSelected(target)).toBe(false);
    });
    it('should return card type', function () {
        expect(credit_card_1.CreditCard.cardType(false)).toBe(false);
        var num = '4111111111111111';
        expect(credit_card_1.CreditCard.cardType(num)).toBe('visa');
    });
    it('should format a card number', function () {
        var number = '4111111111111111';
        expect(credit_card_1.CreditCard.formatCardNumber(number)).toBe('4111 1111 1111 1111');
    });
    it('should return a safe value', function () {
        var value = '';
        var target = {
            selectionStart: 1,
            selectionEnd: 2
        };
        expect(credit_card_1.CreditCard.safeVal(value, target)).toBe(false);
        var element = document.createElement('input');
        document.body.appendChild(element);
        element.focus();
        target = element;
        target.selectionStart = 1;
        target.value = '4111111111111111';
        expect(credit_card_1.CreditCard.safeVal(target.value, target)).toBe(16);
    });
    it('should restrict card number', function () {
        var key = 49;
        var target = {
            selectionStart: null,
            value: '411111111111111'
        };
        expect(credit_card_1.CreditCard.isCardNumber(key, target)).toBe(true);
        target.value = '41111111111111111';
        expect(credit_card_1.CreditCard.isCardNumber(key, target)).toBe(false);
    });
    it('should restrict expiry', function () {
        var key = 1;
        var target = {
            selectionStart: null,
            value: '12 / 12'
        };
        expect(credit_card_1.CreditCard.restrictExpiry(key, target)).toBe(false);
        key = 49;
        expect(credit_card_1.CreditCard.restrictExpiry(key, target)).toBe(false);
        target.value = '12 / 1234';
        expect(credit_card_1.CreditCard.restrictExpiry(key, target)).toBe(true);
    });
    it('should replace full width characters', function () {
        expect(credit_card_1.CreditCard.replaceFullWidthChars(null)).toBe('');
        var str = '０１２３４５６７８９';
        expect(credit_card_1.CreditCard.replaceFullWidthChars(str)).toBe('0123456789');
    });
    it('should format expiration date', function () {
        expect(credit_card_1.CreditCard.formatExpiry('1234')).toBe('12 / 34');
        expect(credit_card_1.CreditCard.formatExpiry('123456')).toBe('12 / 3456');
    });
    it('should restrict CVV', function () {
        var key = 1;
        var target = {
            selectionStart: null,
            value: '123'
        };
        expect(credit_card_1.CreditCard.restrictCvc(key, target)).toBe(false);
        key = 49;
        expect(credit_card_1.CreditCard.restrictCvc(key, target)).toBe(true);
        target.value = '1234';
        expect(credit_card_1.CreditCard.restrictCvc(key, target)).toBe(false);
    });
    it('should check for luhn value', function () {
        expect(credit_card_1.CreditCard.luhnCheck('4111111111111111')).toBe(true);
        expect(credit_card_1.CreditCard.luhnCheck('4511111111111111')).toBe(false);
    });
});
//# sourceMappingURL=credit-card.spec.js.map