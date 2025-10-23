import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {

    private userService: UserService;

    constructor() {
        this.userService = new UserService;
    }

    public getPatient = async (request: Request, response: Response) => {
        try {
            const id = parseInt(request.params.id);
            const patient = await this.userService.getPatient(id);
            if (!patient) {
                return response.status(404).json({
                    success: false,
                    message: 'No hubo coincidencias',
                });
            }
            return response.status(200).json({
                success: true,
                message: 'Obtenido con exito!',
                data: patient,
            });
        } catch (error: any) {
            return response.status(500).json({
                success: false,
                message: "Hubo un error al obtener el paciente",
                data: null,
            });
        }
    }

    public getMedic = async (request: Request, response: Response) => {
        try {
            const id = parseInt(request.params.id);
            const medic = await this.userService.getMedic(id);
            if (!medic) {
                return response.status(404).json({
                    success: false,
                    message: "No hubo coincidencias",
                });
            }
            return response.status(200).json({
                success: true,
                message: 'Obtenido con exito!',
                data: medic,
            });
        } catch (error: any) {
            return response.status(500).json({
                success: false,
                message: "",
                data: null,
            });
        }
    }

    public updateMedic = async (request: Request, response: Response) => {
        try {
            return response.status(200).json({
                success: true,
                message: '',
                data: null,
            });
        } catch (error: any) {
            return response.status(500).json({
                success: false,
                message: "",
                data: null,
            });
        }
    }

    public updatePatient = async (request: Request, response: Response) => {
        try {
            return response.status(200).json({
                success: true,
                message: '',
                data: null,
            });
        } catch (error: any) {
            return response.status(500).json({
                success: false,
                message: "",
                data: null,
            });
        }
    }

}
