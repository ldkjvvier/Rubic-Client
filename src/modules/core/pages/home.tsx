import { Header } from '@/modules/shared';
import { TableGrid } from '@/modules/shared/components/TableGrid';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { useEffect } from 'react';
import { usePdf } from '../hooks/usePdf';
import { Link } from '@mui/material';
import { PdfListData } from '../types/Pdf';
export const Home = (): JSX.Element => {
  const { user } = useAuth();
  const { data, loading, error, fetchData } = usePdf();

  const DataColumns = [
    {
      field: 'view',
      headerName: 'Ver',
      width: 100,
      renderCell: (params: { value: string }): JSX.Element => (
        <Link href={`http://localhost:5000/v1/api/pdf/view/${params.value}`} target="_blank" rel="noreferrer">
          Ver
        </Link>
      )
    },
    { field: 'patent', headerName: 'Patente', width: 150 },
    { field: 'owner', headerName: 'Propietario', width: 150 },
    { field: 'filename', headerName: 'Nombre de archivo', width: 200 },
    { field: 'createdAt', headerName: 'Fecha de creación', width: 200 },
    { field: 'id', headerName: 'ID', width: 90 }
  ];

  useEffect(() => {
    fetchData(user.name, user.lastname);
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <Header />
      <div className="container mx-auto p-4">
        {data && (
          <TableGrid
            rows={
              data.map((pdf: PdfListData) => ({
                id: pdf._id,
                patent: pdf.patent,
                owner: pdf.owner,
                filename: pdf.filename,
                createdAt: pdf.createdAt.split('T')[0],
                view: pdf._id
              })) as []
            }
            columns={DataColumns as []}
            textPlaceholder=""
          />
        )}
        {error && <div>Error: {error}</div>}
      </div>
    </div>
  );
};
