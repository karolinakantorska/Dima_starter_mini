

import { useCallback, useEffect, useMemo } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { useForm, Controller, } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NewProjectSchema } from 'src/utils/myUtils/formSchema';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import {
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
// routes

// @types
import {
  FormProvider,
  RHFTextField,
  RHFRadioGroup,
  RHFUploadMultiFile,
  RHFUploadSingleFile,
  RHFEditor,
} from '../hook-form';
import { objektAlterArray, ProjectType, regionenArray, ServicesArray, objektTypeArray } from 'src/utils/TS/interface';
import { RHFMultiCheckboxCom } from '../hook-form/RHFMultiCheckboxCom';

// utils
import { fData } from '../../utils/formatNumber';
// components

// ----------------------------------------------------------------------

const objektAlterArr = objektAlterArray.slice();
const OBJECT_ALTER = objektAlterArr.map((entry) => ({ label: entry, value: entry }))

const regionen = regionenArray.slice();
const REGION = regionen.map((entry) => ({ label: entry, value: entry }))

const services = ServicesArray.slice();

const objektTypes = objektTypeArray.slice();

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------
// make all properties optional

interface FormValuesProps extends Partial<ProjectType> {
  year_form: any;
  cooperation_company: string;
  cooperation_service: string;
}

type Props = {
  isEdit?: boolean;
  currentProject?: ProjectType
};

export default function ProjectNewEditForm({ isEdit, currentProject }: Props) {
  const { push } = useRouter();
  //console.log('currentProject', currentProject);
  //const { enqueueSnackbar } = useSnackbar();
  const timestamp = Date.now()

  const defaultValues = useMemo(
    () => ({
      //photo: currentProject?.photo || { url: '', title: '', alt: '' },
      photos: currentProject?.photos || [],
      photoAuthor: currentProject?.photoAuthor || '',
      title: currentProject?.title || '',
      description: currentProject?.description || '',
      year_form: currentProject && currentProject.year && new Date(`"${currentProject.year}-01-01"`) || new Date(),
      objektAlter: currentProject?.objektAlter || 'Newbau',
      objektType: currentProject?.objektType || [],
      services: currentProject?.services || [],
      timeStamp: currentProject?.year || timestamp,
      region: currentProject?.region || 'Andere Regionen',
      client: currentProject?.client || '',
      size: currentProject?.size || 999,
      architect: currentProject?.architect || '',
      cooperation_company: currentProject?.cooperation.company || '',
      cooperation_service: currentProject?.cooperation.service || '',
      location: currentProject?.client || '',
      //constructionVideo: currentProject?.constructionVideo || '',
      //video: currentProject?.video || '',

    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentProject]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewProjectSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  //console.log('values: ', values)
  useEffect(() => {
    if (isEdit && currentProject) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProject]);

  const onSubmit = async (data: any) => {

    // ID ?? EDIT
    const cooperation = {
      cooperation: {
        company: data.cooperation_company,
        service: data.cooperation_service
      }
    }
    const year = { year: data.year_form.getFullYear() }
    const newProject: any = { ...data }
    delete newProject.year_form;
    delete newProject.cooperation_company;
    delete newProject.cooperation_service;
    const projectToDB: ProjectType = {
      ...newProject, ...cooperation, ...year,
    }
    try {
      console.log('projectToDB 2 ', projectToDB)
      //await new Promise((resolve) => setTimeout(resolve, 500));
      //reset();
      //enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      //push(PATH_DASHBOARD.eCommerce.list);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDropPhoto = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          'photo',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const photos = values.photos || [];
      setValue('photos', [
        ...photos,
        ...acceptedFiles.map((file: Blob | MediaSource) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
    [setValue, values.photos]
  );

  const handleRemoveAll = () => {
    setValue('photos', []);
  };

  const handleRemove = (file: File | string) => {
    const filteredItems = values.photos?.filter((_file) => _file.url !== file);
    setValue('photos', filteredItems);
  };

  return (
    <>
      < Typography variant="h6" component="h2">{currentProject?.title ? currentProject.title : 'Neues Projekt Hinzugrifen'}</Typography>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
        <Grid container direction='row' spacing={3} sx={{ pt: 3 }}>
          <Grid item xs={12} md={8}  >
            <Stack spacing={3}>
              <Card sx={{ p: 3 }} >
                <RHFTextField name="title" label="Projekttitle" />
              </Card>

              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <div>
                    <LabelStyle>Titelfoto</LabelStyle>
                    <RHFUploadSingleFile
                      name='photo'
                      accept="image/*"
                      maxSize={3145728}
                      onDrop={handleDropPhoto}
                      helperText={
                        <Typography
                          variant="caption"
                          sx={{
                            mt: 2,
                            mx: 'auto',
                            display: 'block',
                            textAlign: 'center',
                            color: 'text.secondary',
                          }}
                        >
                          Allowed *.jpeg, *.jpg, *.png, *.gif
                          <br /> max size of {fData(3145728)}
                        </Typography>
                      }
                    />
                  </div>
                  <div>
                    <LabelStyle>Fotos</LabelStyle>
                    <RHFUploadMultiFile
                      showPreview
                      name="photos"
                      accept={{ multiple: ["image/*"] }}
                      maxSize={3145728}
                      onDrop={handleDrop}
                      onRemove={handleRemove}
                      onRemoveAll={handleRemoveAll}
                      onUpload={() => console.log('ON UPLOAD')}
                    />

                  </div>
                  <RHFTextField name="photoAuthor" label="Autor von Fotos" />
                </Stack>
              </Card>

              <Card sx={{ p: 3 }}>
                <div>
                  <LabelStyle>Bezeichnung</LabelStyle>
                  <RHFEditor simple name="description" />
                </div>
              </Card>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3} mt={2}>
                  <Controller
                    name="year_form"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <DatePicker
                        views={['year']}
                        label="Baujahr"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
                        )}
                      />
                    )}
                  />
                  <RHFTextField name="client" label="Klient" />
                  <RHFTextField name="architect" label="Architekt" />
                  <div>
                    <LabelStyle>Region</LabelStyle>
                    <RHFRadioGroup
                      name="region"
                      options={REGION}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </div>
                  <RHFTextField name="location" label="Ort" />
                  <LabelStyle>Zusamearbeit mit</LabelStyle>
                  <RHFTextField name="cooperation_company" label="Unternehmen" />
                  <RHFTextField name="cooperation_service" label="Leistungen" />
                </Stack>
              </Card>

              <Card sx={{ p: 3 }}>
                <Stack spacing={3} mt={2}>
                  <div>
                    <LabelStyle>Newbau / Sanierung / Wettbewerb</LabelStyle>
                    <RHFRadioGroup
                      name="objektAlter"
                      options={OBJECT_ALTER}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </div>
                  <RHFTextField
                    name="size"
                    label="Projectgrosse"
                    placeholder="999"
                    value={getValues('size') === 0 ? '' : getValues('size')}
                    onChange={(event) => setValue('size', Number(event.target.value))}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: <InputAdornment position="start">m2</InputAdornment>,
                      type: 'number',
                    }}
                  />
                  <Stack direction='row' spacing={6}>
                    <Stack >
                      <LabelStyle>Leistungen</LabelStyle>
                      <RHFMultiCheckboxCom options={services} name='services' />
                    </Stack>
                    <Stack >
                      <LabelStyle>Gebaudetype</LabelStyle>
                      <RHFMultiCheckboxCom options={objektTypes} name='objektType' />
                    </Stack>
                  </Stack>
                </Stack>
              </Card>
            </Stack>
          </Grid>
          <Grid item xs={12} md={12}>
            <LoadingButton
              sx={{ width: '100%' }}
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}>
              {!isEdit ? 'Create Project' : 'Save Changes'}
            </LoadingButton>
          </Grid>
        </Grid>
      </FormProvider >
    </>
  );
}
