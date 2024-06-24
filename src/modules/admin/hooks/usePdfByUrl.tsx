import { PdfData } from '@/modules/admin/types/pdf';
import { useState } from 'react';

interface User {
  id: string;
  name: string;
}

export const usePdfByUrl = () => {
  const [data, setData] = useState<PdfData>();
  const [error, setError] = useState(String);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPdf = async (url: string, comuna: string, user: User) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/v1/api/pdf/transform`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: user.name,
          url: 'https://api.vipa.io/pdf/eyJpdiI6IlR0UW0yd2xUbzZLMzdCNzRENkdXaGc9PSIsInZhbHVlIjoiS3lDdmFsZkh3V21BT3N5SFovSWh4dz09IiwibWFjIjoiZDZjNGI4YTIwMGY4ZjUzM2M5ZTAwMmUxNDdkOTFiMTEyYTY1OWQzZDZjMmM4NGQ2NzNlZjJlNWMyM2Y2OWViMyIsInRhZyI6IiJ9',
          comuna: comuna,
          userId: user.id
        })
      });
      const data = await response.json();
      if (data.statusCode !== 200) {
        setError(data.error.message);
      }

      setData(data.body);
      setError('');
    } catch (error) {
      setError('Error fetching data');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, fetchPdf };
};
