import { usePdfByUrl } from '../hooks/usePdfByUrl';
import { Loading } from '@/components/loader/Loading';
import { PdfCard } from '../components/PdfCard';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, MenuItem } from '@mui/material';
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
  const { data, error, isLoading, fetchPdf } = usePdfByUrl();
  const { user } = useAuth();
  const handleSubmitUrl = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const url = formData.get('pdf-url') as string;
    const comuna = formData.get('Comuna') as string;
    const encodedPdfUrl = encodeURIComponent(url);
    fetchPdf(encodedPdfUrl, comuna, user);
  };
  if (isLoading)
    return (
      <FormLayout>
        <Loading />
      </FormLayout>
    );

  return (
    <FormLayout>
      {data?.comuna && <PdfCard data={data} />}
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
            defaultValue={'maipu'}
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

          <Button
            variant="contained"
            endIcon={<SendIcon />}
            sx={{
              color: 'white',
              backgroundColor: 'var(--color-secondary)'
            }}
            type="submit"
          >
            Enviar
          </Button>
        </Box>
      </form>
    </FormLayout>
  );
};
