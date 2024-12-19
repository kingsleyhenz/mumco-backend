"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformTrim = exports.TransformToUpperCase = exports.TransformToLowerCase = exports.IsDependentOn = exports.IsPhoneNumber = exports.IsEmail = void 0;
/* eslint-disable @typescript-eslint/ban-types, func-names */
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const libphonenumber_js_1 = __importDefault(require("libphonenumber-js"));
function IsEmail(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isEmail',
            target: object.constructor,
            propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value) {
                    return (0, class_validator_1.isEmail)(value) && !value.includes('+');
                },
                defaultMessage() {
                    return 'Please enter a valid email address';
                },
            },
        });
    };
}
exports.IsEmail = IsEmail;
function IsPhoneNumber(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isPhoneNumber',
            target: object.constructor,
            propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value) {
                    this.defaultMessage = () => 'Please enter a valid phone number';
                    if (!(0, class_validator_1.isString)(value)) {
                        this.defaultMessage = () => 'Phone number is required';
                        return false;
                    }
                    const parsedPhoneNumber = (0, libphonenumber_js_1.default)(value);
                    if (!parsedPhoneNumber || !parsedPhoneNumber.isValid()) {
                        return false;
                    }
                    if (!parsedPhoneNumber.country) {
                        this.defaultMessage = () => 'Phone number should be in international format';
                        return false;
                    }
                    return true;
                },
            },
        });
    };
}
exports.IsPhoneNumber = IsPhoneNumber;
function IsDependentOn(property, basedOn, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isDependentOn',
            target: object.constructor,
            propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = args.object[relatedPropertyName];
                    return Boolean(relatedValue) && relatedValue === basedOn ? Boolean(value) : true;
                },
            },
        });
    };
}
exports.IsDependentOn = IsDependentOn;
const TransformToLowerCase = () => {
    return (0, class_transformer_1.Transform)(({ value }) => (value ? value.toLowerCase() : undefined));
};
exports.TransformToLowerCase = TransformToLowerCase;
const TransformToUpperCase = () => {
    return (0, class_transformer_1.Transform)(({ value }) => (value ? value.toUpperCase() : undefined));
};
exports.TransformToUpperCase = TransformToUpperCase;
const TransformTrim = () => {
    return (0, class_transformer_1.Transform)(({ value }) => (value ? value.trim() : undefined));
};
exports.TransformTrim = TransformTrim;
