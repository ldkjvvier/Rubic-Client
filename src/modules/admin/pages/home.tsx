import { Header } from '@/modules/shared';
import { PdfUrl } from '../components/PdfUrl';
import { PdfFile } from '../components/PdfFile';
import { AutoHeightOverlayNoSnap } from '../components/Uploaded';
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
        <AutoHeightOverlayNoSnap />
      </div>
    </>
  );
};
