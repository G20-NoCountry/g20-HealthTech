import { createApi } from './utils/create-api.util';

//<IMPORTS>
import UserEndpoint from './endpoints/users.endpoint';
import AuthEndpoint from './endpoints/auth.endpoint';
import AppointmentsEndpoint from './endpoints/appointments.endpoint';
import MedicalRecordsEndpoint from './endpoints/medical-records.endpoint';

class ManagementApi {
  //<ENDPOINTS>
  public readonly users: UserEndpoint;
  public readonly auth: AuthEndpoint;
  public readonly appointments: AppointmentsEndpoint;
  public readonly medicalRecords: MedicalRecordsEndpoint;

  constructor() {
    const _api = {
      public: createApi('public'),
      user: createApi('user'),
    };

    this.users = new UserEndpoint(_api);
    this.auth = new AuthEndpoint(_api);
    this.appointments = new AppointmentsEndpoint(_api);
    this.medicalRecords = new MedicalRecordsEndpoint(_api);
  }
}

export const api = new ManagementApi();
