import { Request, Response } from "express";
import { validationResult } from "express-validator";

export class AuthController {

    public login = async (request: Request, response: Response) => {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                console.log(errors.array());
                
                return response.status(400).json({
                    errors: errors.array()
                });
            }

            return response.status(200).json({
                success: true,
                message: 'Inicio de sesión exitoso!',
                data: {},
            });
        } catch (error: any) {
            return response.status(500).json({
                success: false,
                message: "Error al iniciar sesión!",
                data: null,
            });
        }
    }

    public register = async (request: Request, response: Response) => {
        try {
            const dto = new Object();

            return response.status(200).json({
                success: true,
                message: 'Login exitoso!',
                data: {
                    user: request.user,
                },
            });
        } catch (error: any) {
            console.log(error);
            return response.status(500).json({
                success: false,
                message: "Error al iniciar sesión!",
                data: null,
            });
        }
    }

    public user = async (request: Request, response: Response) => {
        try {
            if (!request.user) {
                throw new Error();
            }
            return response.status(200).json({
                success: true,
                message: 'Usuario encontrado!',
                data: {
                    user: request.user,
                },
            });
        } catch (error: any) {
            console.log(error);
            return response.status(500).json({
                success: false,
                message: "Error al iniciar sesión!",
                data: null,
            });
        }
    }

    public logout = async (request: Request, response: Response) => {
        try {
            request.logout(err => {
                // if (err) return next(err);
                request.session.destroy(err => {
                    if (err) {
                        return response.status(200).json({
                            success: true,
                            message: "Error al cerrar sesión!",
                        });
                    }
                    response.clearCookie('connect.sid');
                    return response.status(204).json({
                        success: true,
                        message: 'Sesión eliminada correctamente',
                        data: null,
                    });
                });
            });
        } catch (error: any) {
            return response.status(500).json({
                success: false,
                message: "Error al cerrar sesión!",
                data: null,
            });
        }
    }

}
