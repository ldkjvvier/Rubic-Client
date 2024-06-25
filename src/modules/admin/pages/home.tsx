import { Header } from '@/modules/shared';
import { PdfUrl } from '../components/PdfUrl';
import { PdfFile } from '../components/PdfFile';
import { TableGrid } from '@/modules/shared/components/TableGrid';
export const Home = () => {
  return (
    <>
      <Header />

      <div className="flex flex-col justify-center align-middle px-4 md:px-32 ">
        <h1 className="my-16">Sube tu archivo PDF</h1>
        <div className="grid md:grid-cols-2 w-full pb-3 gap-3">
          <PdfUrl />
          <PdfFile />
        </div>
        <TableGrid
          rows={[
            { id: 1, Nombre: 'John', Apellido: 'Doe' },
            { id: 2, Nombre: 'Jane', Apellido: 'Doe' },
            { id: 3, Nombre: 'John', Apellido: 'Smith' }
          ]}
          columns={[{ field: 'id' }, { field: 'Nombre' }, { field: 'Apellido' }]}
        />
      </div>
    </>
  );
};
