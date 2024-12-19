"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessages = void 0;
// eslint-disable-next-line import/prefer-default-export
var ErrorMessages;
(function (ErrorMessages) {
    ErrorMessages["LOGIN_CREDENTIALS_INVALID"] = "email or password is not correct";
    ErrorMessages["CONTACT_SUPPORT"] = "contact support";
    ErrorMessages["ITEM_NOT_FOUND"] = "%k not found";
    ErrorMessages["ITEM_EXISTS"] = "%k already exists";
    ErrorMessages["NOT_AUTHENTICATED"] = "not authenticated";
    ErrorMessages["NOT_AUTHORIZED"] = "not authorized";
    ErrorMessages["CANT_REGISTER_COURSE"] = "you cannot register for this course";
    ErrorMessages["CANT_GET_STUDENT_LEVEL"] = "cannot determine student's level";
    ErrorMessages["NO_CURRENT_SESSION"] = "current session not set. please set current session";
    ErrorMessages["INVALID_FORMAT_CONTENT"] = "invalid file format or content";
    ErrorMessages["EMAIL_VERIFICATION_LINK_EXPIRED"] = "email verification link expired";
    ErrorMessages["UNABLE_TO_GEN_SIGNED_URL"] = "unable to generate signed url";
    ErrorMessages["INVALID_S3_KEY"] = "invalid s3 key";
})(ErrorMessages = exports.ErrorMessages || (exports.ErrorMessages = {}));
