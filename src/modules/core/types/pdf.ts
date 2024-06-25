export interface PdfListData {
  createdAt: string;
  fileId: string;
  filename: string;
  owner: string;
  uploader: string;
  _id: string;
  patent: string;
}

export interface PdfListProps {
  data: PdfListData[];
}
