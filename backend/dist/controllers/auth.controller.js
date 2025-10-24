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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const user_service_1 = require("../services/user.service");
class AuthController {
    constructor() {
        this.login = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                return response.status(200).json({
                    success: true,
                    message: 'Inicio de sesión exitoso!',
                    data: null,
                });
            }
            catch (error) {
                return response.status(500).json({
                    success: false,
                    message: "Error al iniciar sesión!",
                    data: null,
                });
            }
        });
        this.registerPatient = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = request.body;
                const user = yield this.userService.registerUser(body);
                if (!user) {
                    throw new Error("No se registro el usuario");
                }
                return response.status(201).json({
                    success: true,
                    message: 'Registro exitoso!',
                    data: user,
                });
            }
            catch (error) {
                return response.status(500).json({
                    success: false,
                    message: "Ocurrió un error al registrar!",
                    data: null,
                });
            }
        });
        this.registerMedic = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = request.body;
                const user = yield this.userService.registerUser(body);
                if (!user) {
                    throw new Error("No se registro el usuario");
                }
                return response.status(201).json({
                    success: true,
                    message: 'Registro exitoso!',
                    data: user,
                });
            }
            catch (error) {
                return response.status(500).json({
                    success: false,
                    message: "Ocurrió un error al registrar!",
                    data: null,
                });
            }
        });
        this.user = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = request.user;
                if (!user) {
                    throw new Error();
                }
                return response.status(200).json({
                    success: true,
                    message: 'Usuario encontrado!',
                    data: {
                        user: user,
                    },
                });
            }
            catch (error) {
                console.log(error);
                return response.status(500).json({
                    success: false,
                    message: "Error al iniciar sesión!",
                    data: null,
                });
            }
        });
        this.logout = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                request.logout(err => {
                    request.session.destroy(err => {
                        if (err) {
                            return response.status(500).json({
                                success: true,
                                message: "Error al cerrar sesión!",
                            });
                        }
                        response.clearCookie('connect.sid');
                        return response.status(204).json({
                            success: true,
                            message: 'Cierre de sesión exitoso',
                            data: null,
                        });
                    });
                });
            }
            catch (error) {
                return response.status(500).json({
                    success: false,
                    message: "Error al cerrar sesión!",
                    data: null,
                });
            }
        });
        this.userService = new user_service_1.UserService;
    }
}
exports.AuthController = AuthController;
