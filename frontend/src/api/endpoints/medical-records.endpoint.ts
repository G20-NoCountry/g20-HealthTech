import { printDebug } from "../../config/printLogs";
import type { ApiInstances } from "../interfaces/api.interface";
import type { MedicalRecordMockup } from "../interfaces/medical-record-mockup.interface";
import type { Res } from "../interfaces/response.interface";
import type { PatientUser } from "../models/user.interface";


class MedicalRecordsEndpoint {
    private _api: ApiInstances;

    constructor(api: ApiInstances) { this._api = api }


    async getByPatentId(patientId: number): Res<{ medical_record: MedicalRecordMockup, patient: PatientUser }> {
        const fetch = await this._api.user.get(`/medical_records/${patientId}`);

        printDebug("medical_records/getPatientMedicalRecord fetched", fetch.data);

        return fetch.data;
    }

}
export default MedicalRecordsEndpoint;