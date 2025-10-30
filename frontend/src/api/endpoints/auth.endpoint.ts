import type { MedicUser, PatientUser, User } from '../models/user.interface';
import { printDebug } from '../../config/printLogs';
import type { Res } from '../interfaces/response.interface';
import type { ApiInstances } from '../interfaces/api.interface';

class AuthEndpoint {
  private _api: ApiInstances;

  constructor(api: ApiInstances) {
    this._api = api;
  }

  async login({ email, password }: Pick<User, 'email' | 'password'>): Res<PatientUser | MedicUser> {
    const fetch = await this._api.user.post('/auth/login', { email, password });
    printDebug('auth/login fetched', fetch.data);
    return fetch.data;
  }

  async patientRegister(data: PatientUser): Res<Partial<PatientUser>> {
    const fetch = await this._api.public.post('/auth/register/patient', data);
    printDebug('auth/register fetched', fetch.data);
    return fetch.data;
  }

  async medicRegister(data: MedicUser): Res<Partial<MedicUser>> {
    const fetch = await this._api.public.post('/auth/register/medic', data);
    printDebug('auth/register fetched', fetch.data);
    return fetch.data;
  }

  async logout(): Promise<void> {
    await this._api.user.post('/auth/logout');
    printDebug('auth/logout fetched');
  }
}
export default AuthEndpoint;
