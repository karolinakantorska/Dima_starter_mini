import { useState } from 'react';
import { getStorage, ref, getDownloadURL, uploadBytesResumable, updateMetadata, StorageError, deleteObject, UploadTask } from "firebase/storage";
//port { createMetadata, fileNameWithoutFileExtension } from './utils';
import { ImagesType } from '../TS/interface';

//TODO repair this
import { deleteImage } from './deletePhotoFromStorage';
import { createMetadata, fileNameWithoutFileExtension } from './photoUploadUtils';

export function useManyPhotosUpload(folderName: string,) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean | string>(false);
  const [images, setImages] = useState<ImagesType>([]);
  const [progress, setProgress] = useState(0);
  const storage = getStorage();

  function handleUpload(photos: FileList) {
    const promises: any[] = [];
    const photosArray = Array.from(photos);
    photosArray.map(photo => {
      setLoading(true)
      const storage = getStorage();
      const timestamp = Date.now();
      const title = fileNameWithoutFileExtension(photo.name);
      const metadata = createMetadata(title);
      const storageRef = ref(storage, `${folderName}/${photo.name}_${timestamp}`);
      const uploadTask = uploadBytesResumable(storageRef, photo, metadata);

      uploadTask.on('state_changed',
        (snapshot) => {
          setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
        },
        (error) => {
          setError(error.code);
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImages((image) => [...image, { url: downloadURL, title: title, alt: title }]);
          });
        }
      )
      promises.push(uploadTask);
    })

    Promise.all(promises)
      .then(() => setLoading(false))
      .catch((err) => {
        setLoading(false)
        console.log(err);
        setError(error);
      })
  }

  function changeImage(url: string, positionInArray: number, photo: File) {
    setLoading(true)
    let imagesArray = [...images];
    deleteImage(url);

    const timestamp = Date.now()
    const title = fileNameWithoutFileExtension(photo.name);
    const metadata = createMetadata(photo.name);
    const storageRef = ref(storage, `${folderName}/${photo.name}_${timestamp}`);
    const uploadTask = uploadBytesResumable(storageRef, photo, metadata);

    uploadTask.on('state_changed',
      (snapshot) => {
        setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
      },
      (error) => {
        setError(error.code);
        setLoading(false)
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          imagesArray.splice(positionInArray, 1, { url: downloadURL, title: title, alt: title, });
          setImages(imagesArray);
          setLoading(false)
        });
      }
    )
  }
  async function editMetadata(url: string, inputs: { title: string, alt: string }, positionInArray?: number) {
    let imagesArray = [...images];
    const newMetadata = {
      customMetadata: {
        'title': `${inputs.title}`,
        'alt': `${inputs.alt}`,
      }
    }
    setLoading(true);
    const storage = getStorage();
    const desertRef = ref(storage, url);
    await updateMetadata(desertRef, newMetadata)
      .then((metadata) => {
        if (positionInArray) {
          //console.log('metadata...', metadata)
          imagesArray.splice(positionInArray, 1, { url: url, title: inputs.title, alt: inputs.alt });
          setImages(imagesArray);
          setLoading(false);
        }
      }).catch((error) => {
        setError(error.code);
        setLoading(false)
      });

  }
  function resetImages() {
    setImages([])
  }
  return { handleUpload, changeImage, editMetadata, resetImages, loading, error, images, progress }
}
