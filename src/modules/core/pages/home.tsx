import { Header } from '@/modules/shared';
import { PdfList } from '../components/PdfList';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { useEffect } from 'react';
import { usePdf } from '../hooks/usePdf';
export const Home = (): JSX.Element => {
  const { user } = useAuth();
  const { data, loading, error, fetchData } = usePdf();
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
        {data && <PdfList data={data} />}
        {error && <div>Error: {error}</div>}
      </div>
    </div>
  );
};
