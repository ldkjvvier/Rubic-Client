import { usePdfByFile } from '../hooks/usePdfByFile';
import { Loading } from '@/components/loader/Loading';
import { FormLayout } from './FormLayout';
import DropzoneInput from './Dropzone';

export const PdfFile = () => {
  const { error, isLoading, fetchPdf } = usePdfByFile();
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
    <FormLayout>
      <form action="submit" onSubmit={handleSubmitFile} className="text-white h-full">
        <DropzoneInput />
      </form>
    </FormLayout>
  );
};
