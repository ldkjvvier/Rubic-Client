import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const DropzoneContainer = styled(Box)(({ theme }) => ({
  border: '.5px dashed gray',
  borderRadius: '8px',
  padding: theme.spacing(4),
  textAlign: 'center',
  cursor: 'pointer',
  height: '100%',
  '&:hover': {
    backgroundColor: '#1e1f23'
  },
  transition: 'background-color 0.3s'
}));

const DropzoneInput: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <DropzoneContainer {...getRootProps()}>
      <input {...getInputProps()} name="pdfFile" />
      {!selectedFile ? (
        <>
          <CloudUploadIcon sx={{ fontSize: 48, color: '#1976d2' }} />
          <Typography variant="h6" sx={{ mt: 2, color: 'white' }}>
            Arrastra y suelta un archivo aquí, o haz clic para seleccionar uno
          </Typography>
        </>
      ) : (
        <Box sx={{ mt: 2 }}>
          <Typography sx={{ color: 'white' }}>Archivo seleccionado: {selectedFile.name}</Typography>
        </Box>
      )}
    </DropzoneContainer>
  );
};

export default DropzoneInput;
