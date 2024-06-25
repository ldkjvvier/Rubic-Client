import { Box } from '@mui/material';
export const FormLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <Box
      className="border border-tertiary rounded-sm px-4 py-6 
      bg-tertiary bg-opacity-10 text-white text-center "
    >
      {children}
    </Box>
  );
};
