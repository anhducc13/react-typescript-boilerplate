import React, { useContext, useState } from 'react';
import { uploadImage } from 'services';

interface PostUploadState {
  uploading: boolean;
  error: boolean;
  onUploadImage: (file: any) => Promise<void>;
}

interface PostUploadContextProviderProps {
  children: React.ReactNode;
}

const initialValue: PostUploadState = {
  uploading: false,
  error: false,
  onUploadImage: () => Promise.resolve(),
};

export const PostUploadContext = React.createContext<PostUploadState>(
  initialValue
);

export const PostUploadContextProvider: React.FunctionComponent<PostUploadContextProviderProps> = ({
  children,
}: PostUploadContextProviderProps) => {
  const [uploading, setUploading] = useState<boolean>(initialValue.uploading);
  const [error, setError] = useState<boolean>(initialValue.error);

  const onUploadImage = (file: any) => {
    setUploading(true);
    return uploadImage(file)
      .then((res: any) => {
        console.log(res);
        setError(false);
        return Promise.resolve(res);
      })
      .catch((err: any) => {
        setError(true);
        return Promise.reject(err);
      })
      .finally(() => setUploading(false));
  };
  return (
    <PostUploadContext.Provider value={{ uploading, error, onUploadImage }}>
      {children}
    </PostUploadContext.Provider>
  );
};

export function usePostUpload(): PostUploadState {
  const context = useContext(PostUploadContext);
  if (!context) {
    throw new Error(
      'usePostUpload must be inside a PostUploadContextProvider with a state value'
    );
  }
  return context;
}
