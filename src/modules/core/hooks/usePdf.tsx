import { useState } from 'react';
import { PdfListData } from '../types/Pdf';
export const usePdf = () => {
  const [data, setData] = useState<PdfListData[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const fetchData = async (name: string, lastname: string) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/v1/api/pdf/list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: `${name} ${lastname}`
        })
      });
      const data = await response.json();
      if (data.statusCode !== 200) {
        setError('ERROR AL OBTENER LOS DATOS');
        setLoading(false);
      }
      console.log(data);
      setData(data.body.pdfList);
      setError('');
    } catch (error) {
      setError('Error fetching data');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchData
  };
};
