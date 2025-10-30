import { api } from './api';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  rol: 'medico' | 'paciente';
  phone?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const AuthService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await api.post('/auth/login', { email, password });
    const data: AuthResponse = res.data;
    localStorage.setItem('token', data.token);
    return data;
  },

  async registerPatient(data: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    id_health_insurance: number;
    location: string;
  }): Promise<AuthResponse> {
    const res = await api.post('/auth/register/patient', data);
    const dataRes: AuthResponse = res.data;
    localStorage.setItem('token', dataRes.token);
    return dataRes;
  },

  async registerMedic(data: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    speciality: string;
    license_num: string;
    schedule_from: string;
    schedule_at: string;
  }): Promise<AuthResponse> {
    const res = await api.post('/auth/register/medic', data);
    const dataRes: AuthResponse = res.data;
    localStorage.setItem('token', dataRes.token);
    return dataRes;
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } catch {
      /* no-op */
    }
    localStorage.removeItem('token');
  },
};
