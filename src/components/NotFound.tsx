import { Container, Typography, Button, Stack } from '@mui/material';

export const NotFound = () => {
  return (
    <div className="flex items-center  h-full">
      <Container maxWidth="xs" className="bg-whi te border-quaternary rounded-lg p-12 flex justify-items-center">
        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: 'lightgray',
            fontSize: '9rem',
            fontWeight: 'bold'
          }}
        >
          404
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            color: 'darkgray'
          }}
        >
          Pagina no encontrada
        </Typography>

        <Stack spacing={2}>
          <Typography
            variant="body1"
            sx={{
              color: 'gray'
            }}
          >
            La página que buscas no existe o ha sido movida.
          </Typography>
          <Button
            href="/"
            variant="text"
            sx={{
              color: 'lightSlateGray'
            }}
          >
            Volver al inicio
          </Button>
        </Stack>
      </Container>
    </div>
  );
};
