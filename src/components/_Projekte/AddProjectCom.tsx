import React, { SyntheticEvent, useState, ChangeEvent, useEffect } from "react";
import { useRouter } from 'next/router'
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LoadingButton from '@mui/lab/LoadingButton';
// Types
import {
  objektAlterArray, objektTypeArray, ServicesArray, ProjectType, ImageType
} from "../../utils/TS/interface";
//Components
import InputCom from "../_Reusable/InputCom";
import ChecklistCom from "../_Reusable/ChecklistCom";
import DatePickerCom from "../_Reusable/DatePickerCom";
import ImageInputCom from "../_Reusable/ImageInputCom";
import MultipleImagesInputCom from "../_Reusable/MultipleImagesInputCom";
import ImagesInputCom from "../_Reusable/ImagesInputCom";
import { SnackbarCom } from "../_Reusable/Snackbar";
//utils
import { useForm } from "src/utils/myUtils/useForm";
import { useManyPhotosUpload } from "src/utils/apis/uploadManyPhotos";
import { useDeleteImage } from "src/utils/apis/deletePhotoFromStorage";
import { useAddProjestToFirestore } from "src/utils/apis/addToFirestore";
import { useOnePhotoUpload } from "src/utils/apis/uploadPhoto";
import { _mockProjekts } from "src/_mock/referenzen/referenzen";

export default function AddProjectCom() {
  useForm
  const [reset, setReset] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);
  const [savedProject, setSavedProject] = useState(false);
  const [hasMount, setHasMount] = useState(false);
  const router = useRouter();
  const objectAlter = objektAlterArray.slice(0, -1);
  const objektType = objektTypeArray.slice(0, -1);
  const services = ServicesArray.slice(0, -1);
  const timestamp = Date.now()
  const { uploadImage, editMetadataOne, resetImage, loading: loadingOnePhoto, error: errorOnePhoto, images: image, progress: progressOneImage } =
    useOnePhotoUpload("projects");
  const { handleUpload, changeImage, editMetadata, resetImages, loading, error, images, progress } = useManyPhotosUpload("projects")
  const { deleteImage, loading: loadingDelete, error: errorDelete } = useDeleteImage();
  const { inputs, handleInputChange, resetInputs, handleArray, handleDate, errorForm, veryfyInput } = useForm({});
  const { addProject, edit, loading: loadingAddProject, error: ErrorAddProject, savedProjectId } = useAddProjestToFirestore();
  // Addind Project from mock
  /*
  const addMockstoDB = () => {
    _mockProjekts.map((project, i) => addProject("projects", project))
  }
*/
  useEffect(() => {
    setHasMount(true);

  }, [])
  useEffect(() => {
    if (hasMount) {
      setOpenAlert(true);
      setSavedProject(true);
    }
  }, [savedProjectId]);
  useEffect(() => {
    if (hasMount) {
      setOpenAlertError(true);
    }
  }, [ErrorAddProject])

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      setOpenAlert(false);
    }
    setOpenAlert(false);
  };
  //TODO disable by loading
  //TODO project title required




  async function addOrEdit(project: ProjectType) {
    if (savedProject) {
      edit("projects", savedProjectId, project)
    } else {
      addProject("projects", project)
    }
  }
  async function add(project: ProjectType) {
    try { addProject("projects", project) }
    finally {
      resetInputs();
      resetImage();
      resetImages();
      setSavedProject(false);
    }
  }
  function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    //console.log(e)
    e.preventDefault();
    if (inputs.title) {
      const project = {
        ...inputs,
        photo: image[0] ? image[0] : [],
        photos: images,
        timeStamp: timestamp,
      }
      if (reset) {
        add(project);
        e.target.reset();
      } else {
        addOrEdit(project)
      }
    } else {

    }
  }
  async function handleChangeMainPhoto(e: ChangeEvent<HTMLInputElement>) {
    //console.log('inputs.photo: ' + inputs.photo)
    if (image.length > 0) {
      //console.log('image[0].url: ' + image[0].url)
      await deleteImage(image[0].url);
    }
    uploadImage(e.target.files![0]);
  }
  function handleAddPhotos(e: ChangeEvent<HTMLInputElement>): void {
    handleUpload(e.target.files!)
  }
  function handleCancel() {
    deleteImage(image[0].url);
    images.map((image) => deleteImage(image.url));
    router.push('/projekte')
  }
  return (
    <>
      <SnackbarCom
        open={openAlert}
        handleClose={handleClose}
        text="Reference erfolgreich gespeichert!!"
        duration={5000}
        severity="success"
      />
      <SnackbarCom
        open={openAlertError}
        handleClose={handleClose}
        text={(typeof ErrorAddProject === 'string') ? `Database Error: ${ErrorAddProject}` : 'Database Error'}
        duration={5000}
        severity="error"
      />
      <Grid container direction="column" spacing={8} component="form" onSubmit={handleSubmit}>
        <Grid item >
          {!savedProject && <Typography variant="h6" component="h1">{'Bitte geben sie neue Projektreferenz:'}</Typography>}
          {savedProject && < Typography variant="h6" component="h1">{inputs.title}</Typography>}
        </Grid>
        <Grid item>
          <TextField
            name="title"
            onBlur={() => veryfyInput('title', inputs.title)}
            required
            error
            id="Projekttitel"
            onChange={handleInputChange}
            autoFocus
            margin="dense"
            label="Projekttitel"
            helperText={'Referencetitle benotigt mindestens drei Buchstaben'}
            type="text"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={2} justifyContent="space-between" >
            <Grid item>
              <Stack spacing={3}>
                <DatePickerCom name="year" handleDate={handleDate} />
                <InputCom
                  handleChange={handleInputChange}
                  name="objektAlter"
                  text="Zustand"
                  items={objectAlter}
                />
                <InputCom
                  handleChange={handleInputChange}
                  name="objektType"
                  text="Gebaude Type"
                  items={objektType}
                />
              </Stack>
            </Grid>
            <Grid item>
              <ImageInputCom
                handleChangePhoto={handleChangeMainPhoto}
                editMetadataOne={editMetadataOne}
                image={image[0]}
                loading={loadingOnePhoto ? loadingOnePhoto : loadingDelete}
                error={errorOnePhoto ? errorOnePhoto : errorDelete}
                progress={progressOneImage}
              />
            </Grid>
            <Grid item>
              <ChecklistCom
                handleChange={handleArray}
                name="services"
                text="Leistungen"
                items={services}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <TextField
            name="description"
            id="Projektdescription"
            onChange={handleInputChange}
            autoFocus
            margin="dense"
            label="Projektbeschriftung"
            type="text"
            multiline
            minRows={10}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <MultipleImagesInputCom
            handleAddPhotos={handleAddPhotos}
            loading={loading}
            error={error}
            progress={progress}
          />
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={2}>
            {images && images.map((image: ImageType, index: number) => (
              <Grid item>
                <ImagesInputCom
                  image={image}
                  index={index}
                  changeImage={changeImage}
                  editMetadata={editMetadata}
                  loading={loading}
                  error={error}
                  progress={progress} />
              </Grid>
            ))
            }
          </Grid >
        </Grid>
        <Grid item>
          <Stack spacing={3}>

            <LoadingButton
              loading={loadingAddProject}
              loadingPosition="center"
              type='submit'
              variant="contained"
              onClick={() => setReset(false)}
            >
              speichern und weiter bearbeiten
            </LoadingButton>
            <LoadingButton
              loading={loadingAddProject}
              loadingPosition="center"
              type='submit'
              variant="contained"
              onClick={() => setReset(true)}
            >
              speichern und neue anfangen
            </LoadingButton>
            <Button
              variant="text"
              onClick={handleCancel}
              disabled={loadingAddProject && loading && loadingOnePhoto && loadingDelete}
            >abbrechen
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>

  );
}

