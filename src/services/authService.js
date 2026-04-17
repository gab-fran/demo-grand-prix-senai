import api from './api';
import { mockUserById } from '../data/mockData';

export const authService = {
  async login(payload) {
    try {
      const { data } = await api.post('/auth/login', payload);
      return data;
    } catch {
      const user = mockUserById[payload.identifier?.toLowerCase()];
      if (!user) {
        throw new Error('Credenciais inválidas. Verifique matrícula e token.');
      }
      return { token: 'mock-jwt-token', user };
    }
  },
};
