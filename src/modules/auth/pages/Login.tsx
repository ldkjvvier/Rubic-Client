import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IconButton, TextField } from '@mui/material';
import { Login as LoginIcon, VisibilityOff, Visibility, Person as PersonIcon } from '@mui/icons-material';
import { AuthLayout } from '../components/AuthLayout';
import { useAuth } from '../hooks/useAuth';

export const Login = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const { signin, error } = useAuth();

  const onSubmit = handleSubmit((data) => {
    const credentials = {
      email: data.email,
      password: data.password
    };
    signin(credentials);
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthLayout>
      <div>
        <LoginIcon className="text-indigo-600" sx={{ fontSize: 40 }} />
        <h1 className="text-3xl font-semibold mt-4">Welcome</h1>
        <p className="text-gray-500 mt-2">Ingresa tus credenciales para iniciar sesión</p>
      </div>
      <form action="submit" onSubmit={onSubmit} className="flex flex-col w-full text-left mt-8  min-w-96">
        <div className="flex flex-col gap-8">
          <TextField
            type="email"
            id="email"
            label="Email"
            {...register('email', {
              required: 'Correo electrónico es requerido'
            })}
            placeholder="example@gmail.com"
            autoComplete="email"
            InputProps={{
              endAdornment: (
                <IconButton aria-label="toggle password visibility" edge="end" disabled>
                  <PersonIcon className="text-[24px] text-gray-400" />
                </IconButton>
              )
            }}
          />

          <TextField
            id="password"
            label="Password"
            {...register('password', {
              required: 'Contraseña es requerida'
            })}
            placeholder="Escribe tu contraseña"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                  {showPassword ? (
                    <Visibility className="text-[24px] text-gray-400" />
                  ) : (
                    <VisibilityOff className="text-[24px] text-gray-400" />
                  )}
                </IconButton>
              )
            }}
          />
        </div>
        <div className="text-sm text-right mt-2">
          <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Olvidaste tu contraseña?
          </a>
        </div>
        {errors.email && <p className="text-red-500 text-sm mt-2">Correo electrónico es requerido</p>}
        <button
          type="submit"
          className="mt-24 rounded-lg p-3 bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300 ease-in-out"
        >
          Iniciar Sesión
        </button>

        <p className="text-red-500 mt-4 text-center">{error || ''}</p>
      </form>
    </AuthLayout>
  );
};

export const LabelLayout = ({ text, children }: { text: string; children: React.ReactNode }) => {
  return (
    <label htmlFor={text} className="flex flex-col">
      <span>{text}</span>
      {children}
    </label>
  );
};
