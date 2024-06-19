import { Container } from '@mui/material';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex justify-items-center">
      <Container maxWidth="sm" className=" bg-white rounded-lg text-black p-12 flex justify-items-center h-96">
        {children}
      </Container>
    </div>
  );
};
