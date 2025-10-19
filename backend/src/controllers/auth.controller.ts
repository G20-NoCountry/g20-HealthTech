import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { RegisterPatientDto } from "../dto/user/registerPatient.dto";
import { RegisterMedicDto } from "../dto/user/registerMedic.dto";

export class AuthController {

    private userService: UserService;

    constructor() {
        this.userService = new UserService;
    }

    public login = async (request: Request, response: Response) => {
        try {
            return response.status(200).json({
                success: true,
                message: 'Inicio de sesión exitoso!',
                data: null,
            });
        } catch (error: any) {
            return response.status(500).json({
                success: false,
                message: "Error al iniciar sesión!",
                data: null,
            });
        }
    }

    public registerPatient = async (request: Request, response: Response) => {
        try {
            const body = request.body as RegisterPatientDto;
            const user = await this.userService.registerUser(body);

            if (!user) {
                throw new Error("No se registro el usuario");
            }

            return response.status(201).json({
                success: true,
                message: 'Registro exitoso!',
                data: user,
            });
        } catch (error: any) {
            return response.status(500).json({
                success: false,
                message: "Ocurrió un error al registrar!",
                data: null,
            });
        }
    }
    
    public registerMedic = async (request: Request, response: Response) => {
        try {
            const body = request.body as RegisterMedicDto;
            const user = await this.userService.registerUser(body);

            if (!user) {
                throw new Error("No se registro el usuario");
            }

            return response.status(201).json({
                success: true,
                message: 'Registro exitoso!',
                data: user,
            });
        } catch (error: any) {
            return response.status(500).json({
                success: false,
                message: "Ocurrió un error al registrar!",
                data: null,
            });
        }
    }

    public user = async (request: Request, response: Response) => {
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
        } catch (error: any) {
            return response.status(500).json({
                success: false,
                message: "Error al cerrar sesión!",
                data: null,
            });
        }
    }

}
