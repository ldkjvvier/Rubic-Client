import { PdfUrl } from '../components/PdfUrl';
import { PdfFile } from '../components/PdfFile';
import { Header } from '@/modules/shared';
export const Home = (): JSX.Element => {
  return (
    <div className="w-full">
      <Header />

      <PdfUrl />
      <br />
      <PdfFile />
      <br />
    </div>
  );
};
