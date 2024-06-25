import { usePdfByUrl } from '../hooks/usePdfByUrl';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import { MenuItem } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { FormLayout } from './FormLayout';
import { useAuth } from '@/modules/auth/hooks/useAuth';
const COMUNAS = [
  { value: 'maipu', label: 'Maipú' },
  { value: 'la florida', label: 'La Florida' },
  { value: 'santiago', label: 'Santiago' },
  { value: 'providencia', label: 'Providencia' },
  { value: 'las condes', label: 'Las Condes' },
  { value: 'la reina', label: 'La Reina' },
  { value: 'nunona', label: 'Ñuñoa' },
  { value: 'vitacura', label: 'Vitacura' },
  { value: 'lo barnechea', label: 'Lo Barnechea' },
  { value: 'penanolen', label: 'Peñalolén' },
  { value: 'la granja', label: 'La Granja' },
  { value: 'san bernardo', label: 'San Bernardo' },
  { value: 'la pintana', label: 'La Pintana' },
  { value: 'la cisterna', label: 'La Cisterna' },
  { value: 'san ramon', label: 'San Ramón' },
  { value: 'san jose de maipo', label: 'San José De Maipo' }
];

export const PdfUrl = (): JSX.Element => {
  const { error, isLoading, fetchPdf } = usePdfByUrl();
  const { user } = useAuth();
  const handleSubmitUrl = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const url = formData.get('pdf-url') as string;
    const comuna = formData.get('Comuna') as string;
    const encodedPdfUrl = encodeURIComponent(url);
    if (!comuna) {
      return;
    }
    fetchPdf(encodedPdfUrl, comuna, user);
  };

  return (
    <FormLayout>
      {error && <p>{error}</p>}
      <form action="submit" onSubmit={handleSubmitUrl} className="text-white">
        <TextField
          label="URL del pdf"
          fullWidth
          name="pdf-url"
          margin="normal"
          className="text-white"
          required
          sx={{
            color: 'white',
            borderColor: 'white',
            '& label': { color: 'white' },
            '& .MuiInputBase-root': {
              color: 'white',
              borderColor: 'white !important'
            }
          }}
        />

        <Box className="flex gap-3 my-4">
          <TextField
            label="Comuna"
            fullWidth
            name="Comuna"
            defaultValue={''}
            select
            className="border-red-300"
            sx={{
              color: 'white',
              borderColor: 'white',
              '& label': { color: 'white' },
              textAlign: 'left',
              '& .MuiInputBase-root': {
                color: 'white',
                borderColor: 'white !important'
              },

              '& .MuiSelect-icon': {
                color: 'white'
              },
              '& .Mui-focused': {
                color: 'white',
                backgroundColor: 'var(--color-secondary) !important',
                borderColor: 'white !important'
              }
            }}
            required
          >
            <MenuItem value="" disabled>
              Selecciona una comuna
            </MenuItem>
            {COMUNAS.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{
                  margin: '0',
                  color: 'white !important',
                  backgroundColor: 'var(--color-secondary)',
                  '&.Mui-selected': {
                    color: 'white',
                    backgroundColor: 'var(--color-secondary)'
                  },
                  '&.Mui-selected:hover': {
                    color: 'white',
                    backgroundColor: 'black'
                  },
                  '&:hover': {
                    color: 'white',
                    backgroundColor: 'black'
                  },
                  '&.MuiMenu-list': {
                    backgroundColor: 'wheat !important'
                  }
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <LoadingButton
            variant="contained"
            endIcon={<SendIcon />}
            sx={{
              color: 'white',
              backgroundColor: 'var(--color-secondary)',
              '&:hover': {
                backgroundColor: 'var(--color-secondary)',
                color: 'white'
              },
              '&:active': {
                backgroundColor: 'var(--color-secondary)',
                color: 'white'
              },
              '&.Mui-disabled': {
                backgroundColor: 'var(--color-secondary)',
                color: 'white'
              }
            }}
            type="submit"
            loading={isLoading}
            loadingPosition="end"
          >
            <span>Enviar</span>
          </LoadingButton>
        </Box>
      </form>
    </FormLayout>
  );
};
