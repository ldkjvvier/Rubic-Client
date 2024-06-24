import { Box } from '@mui/material';
import { usePdfByFile } from '../hooks/usePdfByFile';
import { Loading } from '@/components/loader/Loading';
import DropzoneInput from './Dropzone';

export const PdfFile = () => {
  const { data, error, isLoading, fetchPdf } = usePdfByFile();
  if (isLoading) return <Loading />;
  if (error) return <div>{error}</div>;

  const handleSubmitFile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get('pdfFile') as File;
    if (!file) return;
    const data = new FormData();
    data.append('pdfFile', file);
    fetchPdf(data);
  };

  return (
    <Box
      className="border border-tertiary rounded-sm px-4 py-4 
      bg-tertiary bg-opacity-10 text-white text-center"
    >
      <form action="submit" onSubmit={handleSubmitFile} className="text-white h-full">
        <DropzoneInput />
      </form>
    </Box>
  );
};
