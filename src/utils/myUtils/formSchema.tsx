import * as Yup from 'yup';

export const NewProjectSchema = Yup.object().shape({
    photos: Yup.array(),
    photoAuthor: Yup.string()
        .max(50, 'Projecttitle muss kurzer als 50 Buchstaben sein'),
    title: Yup.string().required('Projecttitle ist erforderlich')
        .min(2, 'Projecttitle muss länger als zwei Buchstaben sein')
        .max(100, 'Projecttitle muss kurzer als 100 Buchstaben sein'),
    description: Yup.string()
        .max(8000, 'Projecttitle muss kurzer als 8000 Buchstaben sein'),
    year_form: Yup.date().required('Bauyahr ist erforderlich'),
    client: Yup.string()
        .max(50, 'Projecttitle muss kurzer als 50 Buchstaben sein'),
    architect: Yup.string()
        .max(50, 'Projecttitle muss kurzer als 50 Buchstaben sein'),
    location: Yup.string()
        .max(50, 'Projecttitle muss kurzer als 50 Buchstaben sein'),
    size: Yup.number().moreThan(0, 'Projectgrosse soll mehr als 0m2 sein').lessThan(100000000, 'Projectgrosse soll weniger als 100 000 000m2 sein'),
    //service: Yup.array().min(1, 'Wahlen Sie bitte mindestens eine Option'),
    //objektType: Yup.array().min(1, 'Wahlen Sie bitte mindestens eine Option'),
});