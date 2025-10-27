import { printDebug } from "../../config/printLogs";
import type { ApiInstances } from "../interfaces/api.interface";
import type { Res } from "../interfaces/response.interface";
import type { MedicUser, PatientUser } from "../models/user.interface";
import type { MedicListItem } from "../models/medic-list-item.interface";


class UsersEndpoint {
    private _api: ApiInstances;

    constructor(api: ApiInstances) { this._api = api }

    async getCurrentUser(): Res<{ user: PatientUser | MedicUser }> {
        const fetch = await this._api.user.get(`/auth/user`);

        printDebug("users/getById fetched", fetch.data);

        return fetch.data;
    }

    async getMedicsSummary(): Res<MedicListItem[]> {
        const fetch = await this._api.user.get(`/medics/summary`);

        printDebug("users/listMedics fetched", fetch.data);

        return fetch.data;
    }

    async getPatientById(id: number): Res<PatientUser> {
        const fetch = await this._api.user.get(`/patients/${id}`);

        printDebug("users/getPatientById fetched", fetch.data);

        return fetch.data;
    }

    async updatePatientUser(data: Partial<PatientUser>): Res<PatientUser> {
        const fetch = await this._api.user.patch(`/patients`, data);

        printDebug("users/updatePatientUser fetched", fetch.data);

        return fetch.data;
    }

    async getMedicById(id: number): Res<MedicUser> {
        const fetch = await this._api.user.get(`/medics/${id}`);

        printDebug("users/getMedicById fetched", fetch.data);

        return fetch.data;
    }

    async updateMedicUser(data: Partial<MedicUser>): Res<MedicUser> {
        const fetch = await this._api.user.patch(`/medics`, data);

        printDebug("users/updateMedicUser fetched", fetch.data);

        return fetch.data;
    }

}
export default UsersEndpoint;