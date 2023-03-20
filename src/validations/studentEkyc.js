import * as yup from 'yup';


export const studentEkycScheme = yup.object().shape({
    // firstName: yup.string().required('Vui lòng nhập trường này!'),
    // lastName: yup.string().required('Vui lòng nhập trường này!'),
    // dateOfBirth: yup
    //     .date()
    //     .nullable()
    //     .default(undefined)
    //     .transform((curr, orig) => (orig === '' ? null : curr))
    //     // .max(new Date(), 'Ngày sinh không hợp lệ!')
    //     // .typeError('Ngày sinh không hợp lệ!')
    //     .required('Vui lòng nhập trường này!'),
});