import { Container } from '@mui/material';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center  h-full">
      <Container
        maxWidth="xs"
        className="bg-white border-quaternary rounded-lg text-black p-12 flex justify-items-center"
      >
        {children}
      </Container>
    </div>
  );
};
