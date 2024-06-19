import { authApi } from './api';
import { AuthResponse, LoginData } from '../types/user';
import { AxiosResponse, AxiosError } from 'axios';
interface ErrorResponse {
  body: {
    statusCode: number;
    message: string;
  };
}

// LOGIN
export const loginService = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const response: AxiosResponse<AuthResponse> = await authApi.post('/auth/login', {
      email: data.email,
      password: data.password
    });
    console.log('LOGIN SUCCESS', data);
    return response.data;
  } catch (error) {
    if ((error as AxiosError).isAxiosError) {
      console.log(error);
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response) {
        // El servidor respondió con un código de estado diferente de 2xx
        console.error('LOGIN ERROR: Response error', axiosError.response.data);
        throw new Error(`${axiosError.response.data.body.message || axiosError.response.statusText}`);
      } else if (axiosError.request) {
        // La petición fue hecha pero no se recibió respuesta
        console.error('LOGIN ERROR: No response received', axiosError.request);
        throw new Error('Error en el login: No se recibió respuesta del servidor');
      } else {
        // Algo sucedió al configurar la petición
        console.error('LOGIN ERROR: Request setup error', axiosError.message);
        throw new Error(`Error en el login: ${axiosError.message}`);
      }
    } else {
      // Error fuera de Axios
      console.error('LOGIN ERROR: Unexpected error', error);
      throw new Error('Error inesperado en el login');
    }
  }
};
