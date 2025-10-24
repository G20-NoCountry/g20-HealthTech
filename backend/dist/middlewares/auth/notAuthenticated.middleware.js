"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotAuthenticated = isNotAuthenticated;
function isNotAuthenticated(req, res, next) {
    if (req.isUnauthenticated()) {
        return next();
    }
    return res.status(409).json({
        success: false,
        message: 'Ya existe una sesión activa',
    });
}
