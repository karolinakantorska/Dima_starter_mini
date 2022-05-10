import { useState } from 'react';
import { ImagesType, ImageType } from '../TS/interface';

import { getStorage, ref, getDownloadURL, uploadBytesResumable, updateMetadata, StorageError, deleteObject, UploadTask, uploadBytes } from "firebase/storage";
import { createMetadata, fileNameWithoutFileExtension } from './photoUploadUtils';

export function useOnePhotoUpload(folderName: string) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<boolean | string>(false);
  const [images, setImages] = useState<ImagesType>([]);

  async function uploadImage(photo: File) {
    setLoading(true);
    const storage = getStorage();
    const timestamp = Date.now();
    const title = fileNameWithoutFileExtension(photo.name);
    const metadata = createMetadata(title);
    const storageRef = ref(storage, `${folderName}/${photo.name}_${timestamp}`);
    const uploadTask = uploadBytesResumable(storageRef, photo, metadata);

    return uploadTask.on('state_changed',
      (snapshot) => {
        setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
      },
      (error) => {
        setError(error.code);
        setLoading(false);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImages([]);
          const newImage: ImageType = { url: downloadURL, title: title, alt: title, author: '' }
          setImages((image) => [...image, newImage]);
          setLoading(false);
        });
      }
    )
  }

  async function editMetadataOne(url: string, inputs: { title: string, alt: string },) {
    const newMetadata = {
      customMetadata: {
        'title': `${inputs.title}`,
        'alt': `${inputs.alt}`,
      }
    }
    setLoading(true);
    const storage = getStorage();
    const desertRef = ref(storage, url);
    updateMetadata(desertRef, newMetadata)
      .then((metadata) => {
        if (metadata.customMetadata) {
          setImages([]);
          const newImage: ImageType = { url: url, title: inputs.title, alt: inputs.alt, author: '' }
          setImages((image) => [...image, newImage]);
          setLoading(false);
        }
      }).catch((error) => {
        setError(error.code);
        setLoading(false);
      });

  }
  function resetImage() {
    setImages([]);
  }
  return { uploadImage, editMetadataOne, resetImage, loading, error, images, progress }
}
