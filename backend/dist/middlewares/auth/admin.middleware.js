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
exports.isAdmin = isAdmin;
function isAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        // En el nuevo esquema, solo 'medico' puede registrar otros médicos
        // Los administradores serían médicos con permisos especiales
        if (user.rol !== "medico") {
            return res.status(403).json({
                success: false,
                message: "No puede realizar esta acción",
            });
        }
        return next();
    });
}
