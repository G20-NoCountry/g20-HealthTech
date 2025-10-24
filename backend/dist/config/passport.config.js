"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportConfig = void 0;
const passport_local_1 = require("passport-local");
const bcrypt_1 = require("bcrypt");
const passport_1 = __importDefault(require("passport"));
const models_1 = require("../models");
exports.passportConfig = passport_1.default;
exports.passportConfig.use(new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password",
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.User.findOne({ where: { email: email } });
        if (!user) {
            return done(null, false, { message: "Usuario no encontrado" });
        }
        const isValid = (0, bcrypt_1.compareSync)(password, user.toJSON().password);
        if (!isValid) {
            return done(null, false, { message: "Contraseña incorrecta" });
        }
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
})));
exports.passportConfig.serializeUser((user, done) => {
    done(null, user.id);
});
exports.passportConfig.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.User.findOne({ where: { id: id } });
        done(null, user);
    }
    catch (err) {
        done(err);
    }
}));
