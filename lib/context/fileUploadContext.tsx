import { createContext, useContext } from 'react';
import { useFileUpload } from '../hooks/useFileUpload';

// type Context = (((data: File) => void) | { resultFile: string | ArrayBuffer; reset: () => void })[];

const UploadFileContext = createContext<Array<any>>(undefined);

export const UploadFileProvider = ({ children }: { children: React.ReactNode }) => {
  const [{ resultFile, reset }, setFile] = useFileUpload({ method: 'readAsDataURL' });
  const value = [{ resultFile, reset }, setFile];
  return <UploadFileContext.Provider value={value}>{children}</UploadFileContext.Provider>;
};

export const useGlobalFileUpload = () => {
  return useContext(UploadFileContext);
};
