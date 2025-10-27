import { printDebug } from "../../config/printLogs";
import type { ApiInstances } from "../interfaces/api.interface";
import type { Res } from "../interfaces/response.interface";
import type { Appointment } from "../models/appointment.interface";


export type DateQueries = {
    start_date?: string; //2025-12-15T11:59:00.000Z
    end_date?: string; //2025-12-15T10:00:00.000Z
}


class AppointmentsEndpoint {
    private _api: ApiInstances;

    constructor(api: ApiInstances) { this._api = api }


    //% =============== Medic endpoints ===============

    async searchAppointmentsAsMedic({ end_date, start_date }: DateQueries): Res<Appointment[]> {
        const fetch = await this._api.user.get(`/medic/appointments`,
            { params: { end_date, start_date } }
        );

        printDebug("appointments/searchAppointmentsAsMedic fetched", fetch.data);

        return fetch.data;
    }

    async createAppointmentAsMedic(data: Appointment): Res<Appointment> {
        const fetch = await this._api.user.post(`/medic/appointments`, data);

        printDebug("appointments/createAppointmentAsMedic fetched", fetch.data);

        return fetch.data;
    }

    async getMedicAppointmentById(id: number): Res<Appointment[]> {
        const fetch = await this._api.user.get(`/medic/appointments/${id}`);

        printDebug("appointments/getMedicAppointmentById fetched", fetch.data);

        return fetch.data;
    }


    async updateMedicAppointment(data: Partial<Appointment>): Res<Appointment> {
        const fetch = await this._api.user.patch(`/medic/appointments`, data);

        printDebug("appointments/updateMedicAppointment fetched", fetch.data);

        return fetch.data;
    }

    async deleteMedicAppointment(id: number): Res<null> {
        const fetch = await this._api.user.delete(`/medic/appointments/${id}`);

        printDebug("appointments/deleteMedicAppointment fetched", fetch.data);

        return fetch.data;
    }

    //% =============== Patient endpoints ===============

    async searchPatientAppointments({ end_date, start_date }: DateQueries = {}): Res<Appointment[]> {
        const fetch = await this._api.user.get(`/paciente/appointments`,
            { params: { end_date, start_date } }
        );

        printDebug("appointments/searchPatientAppointments fetched", fetch.data);

        return fetch.data;
    }

    async createAppointmentAsPatient(data: Appointment): Res<Appointment> {
        const fetch = await this._api.user.post(`/paciente/appointments`, data);

        printDebug("appointments/createAppointmentAsPatient fetched", fetch.data);

        return fetch.data;
    }

    async getPatientAppointmentById(id: number): Res<Appointment> {
        const fetch = await this._api.user.get(`/paciente/appointments/${id}`);

        printDebug("appointments/getPatientAppointmentById fetched", fetch.data);

        return fetch.data;
    }

    async updatePatientAppointment(data: Partial<Appointment>): Res<Appointment> {
        const fetch = await this._api.user.patch(`/paciente/appointments`, data);

        printDebug("appointments/updatePatientAppointment fetched", fetch.data);

        return fetch.data;
    }

    async deletePatientAppointment(id: number): Res<null> {
        const fetch = await this._api.user.delete(`/paciente/appointments/${id}`);

        printDebug("appointments/deletePatientAppointment fetched", fetch.data);

        return fetch.data;
    }


}
export default AppointmentsEndpoint;